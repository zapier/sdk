#!/usr/bin/env node
// Live-catalog audit for the examples corpus. See .github/scripts/README.md.

import fs from "node:fs";
import path from "node:path";
import * as ts from "typescript";

const clientId = process.env.ZAPIER_CLIENT_ID;
const clientSecret = process.env.ZAPIER_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  console.log("SKIP audit: ZAPIER_CLIENT_ID / ZAPIER_CLIENT_SECRET not set.");
  console.log("Set both as GitHub Actions secrets to run live catalog verification on every build.");
  process.exit(0);
}

const { createZapierSdk } = await import("@zapier/zapier-sdk");
const zapier = createZapierSdk({ credentials: { clientId, clientSecret } });

function extractCalls(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const sf = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);

  // Table of top-level `const NAME = "value"` for resolving identifier references.
  const constMap = {};
  const visitConsts = (node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer &&
      ts.isStringLiteral(node.initializer)
    ) {
      constMap[node.name.text] = node.initializer.text;
    }
    ts.forEachChild(node, visitConsts);
  };
  visitConsts(sf);

  let runActionSites = 0;
  const calls = [];
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "runAction"
    ) {
      runActionSites++;
      const [arg] = node.arguments;
      if (arg && ts.isObjectLiteralExpression(arg)) {
        const scalar = {};
        let inputs = null;
        for (const p of arg.properties) {
          if (!ts.isPropertyAssignment(p) || !p.name || !ts.isIdentifier(p.name)) continue;
          const key = p.name.text;
          if (key === "inputs" && ts.isObjectLiteralExpression(p.initializer)) {
            inputs = p.initializer.properties
              .filter((ip) => ts.isPropertyAssignment(ip) && ip.name && (ts.isIdentifier(ip.name) || ts.isStringLiteral(ip.name)))
              .map((ip) => (ts.isIdentifier(ip.name) ? ip.name.text : ip.name.text));
            continue;
          }
          if (ts.isStringLiteral(p.initializer)) {
            scalar[key] = p.initializer.text;
          } else if (ts.isIdentifier(p.initializer) && p.initializer.text in constMap) {
            scalar[key] = constMap[p.initializer.text];
          }
        }
        if (scalar.appKey && scalar.actionType && scalar.actionKey) {
          calls.push({
            file: filePath,
            app: scalar.appKey,
            type: scalar.actionType,
            action: scalar.actionKey,
            inputs: inputs ?? [],
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);

  return { calls, runActionSites };
}

const files = [];

const patternRoot = "examples/by-pattern";
for (const shape of fs.readdirSync(patternRoot)) {
  const shapeDir = path.join(patternRoot, shape);
  if (!fs.statSync(shapeDir).isDirectory()) continue;
  for (const wf of fs.readdirSync(shapeDir)) {
    const wfPath = path.join(shapeDir, wf, "workflow.ts");
    if (fs.existsSync(wfPath)) files.push(wfPath);
  }
}

const appRoot = "examples/by-app";
for (const app of fs.readdirSync(appRoot)) {
  const appDir = path.join(appRoot, app);
  if (!fs.statSync(appDir).isDirectory()) continue;
  for (const entry of fs.readdirSync(appDir)) {
    if (!entry.endsWith(".ts")) continue;
    files.push(path.join(appDir, entry));
  }
}

const allCalls = [];
const extractionFailures = [];
for (const f of files) {
  const { calls, runActionSites } = extractCalls(f);
  if (calls.length !== runActionSites) {
    extractionFailures.push(
      `${f}: found ${runActionSites} runAction call(s) but extracted only ${calls.length}. Refactor the file to match the corpus style (literal or top-level-const scalars for appKey/actionType/actionKey), or extend .github/scripts/audit.mjs to handle the new shape.`,
    );
  }
  allCalls.push(...calls);
}

if (extractionFailures.length) {
  console.error("Extraction invariant failed. The regex/AST extractor missed at least one call site:\n");
  extractionFailures.forEach((f) => console.error("  " + f));
  process.exit(1);
}

const uniqueApps = [...new Set(allCalls.map((c) => c.app))];
const uniqueTriples = [...new Map(allCalls.map((c) => [`${c.app}.${c.type}.${c.action}`, c])).values()];

const actionsByApp = {};
for (const app of uniqueApps) {
  actionsByApp[app] = [];
  for await (const a of zapier.listActions({ app }).items()) {
    actionsByApp[app].push({ key: a.key, action_type: a.action_type, is_hidden: a.is_hidden });
  }
}

const failures = [];

for (const t of uniqueTriples) {
  const list = actionsByApp[t.app];
  if (!list?.length) {
    failures.push(`APP_EMPTY_OR_MISSING ${t.app} (used in ${path.basename(path.dirname(t.file))})`);
    continue;
  }
  const match = list.find((a) => a.key === t.action && a.action_type === t.type);
  if (!match) {
    const wrongType = list.find((a) => a.key === t.action);
    if (wrongType) {
      failures.push(`ACTION_TYPE_WRONG ${t.app}.${t.type}.${t.action} — actually "${wrongType.action_type}"`);
    } else {
      failures.push(`ACTION_MISSING ${t.app}.${t.type}.${t.action}`);
    }
  } else if (match.is_hidden) {
    failures.push(`ACTION_HIDDEN ${t.app}.${t.type}.${t.action} — hidden actions are not on the stable surface`);
  }
}

for (const c of allCalls) {
  if (!c.inputs.length) continue;
  const list = actionsByApp[c.app];
  if (!list?.length) continue;
  const match = list.find((a) => a.key === c.action && a.action_type === c.type);
  if (!match) continue;
  const { data: schema } = await zapier.getActionInputFieldsSchema({
    app: c.app,
    actionType: c.type,
    action: c.action,
  });
  if (schema?.["zapier:dynamicProperties"]) continue;
  const props = schema?.properties ?? {};
  for (const inp of c.inputs) {
    if (!(inp in props)) {
      const rel = path.relative(".", c.file);
      failures.push(
        `INPUT_MISSING ${rel}: ${c.app}.${c.type}.${c.action}.${inp} — real static props: ${Object.keys(props).join(", ") || "(none)"}`,
      );
    }
  }
}

console.log(
  `Audited ${files.length} file(s): ${allCalls.length} runAction call site(s), ${uniqueTriples.length} unique triple(s) across ${uniqueApps.length} app(s).`,
);
if (failures.length === 0) {
  console.log("All clear. No hallucinated app keys, action keys, action types, hidden actions, or static input names.");
} else {
  console.log(`\n${failures.length} issue(s):\n`);
  failures.forEach((f) => console.log("  " + f));
  process.exit(1);
}
