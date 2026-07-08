#!/usr/bin/env node
// Structural checks for the examples corpus. See .github/scripts/README.md.

import { readdirSync, statSync, readFileSync, lstatSync, readlinkSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
process.chdir(REPO_ROOT);

const REQUIRED_DEPS = ["@zapier/zapier-sdk", "@zapier/zapier-durable"];

const errors = [];
const fail = (msg) => errors.push(msg);

const isDir = (p) => existsSync(p) && statSync(p).isDirectory();

for (const domain of readdirSync("examples/by-domain")) {
  const domainDir = join("examples/by-domain", domain);
  if (!isDir(domainDir)) continue;
  for (const entry of readdirSync(domainDir)) {
    if (entry === "README.md" || entry.startsWith(".")) continue;
    const p = join(domainDir, entry);
    const lst = lstatSync(p);
    if (!lst.isSymbolicLink()) {
      fail(`${p}: expected symlink into by-pattern/, got ${lst.isDirectory() ? "directory" : "file"}`);
      continue;
    }
    const target = readlinkSync(p);
    const resolved = resolve(dirname(p), target);
    if (!existsSync(resolved)) {
      fail(`${p} -> ${target}: symlink target does not exist`);
      continue;
    }
    const relFromRoot = resolved.slice(REPO_ROOT.length + 1);
    if (!relFromRoot.startsWith("examples/by-pattern/")) {
      fail(`${p} -> ${target}: target must live under examples/by-pattern/, got ${relFromRoot}`);
    }
  }
}

let workflowCount = 0;
for (const shape of readdirSync("examples/by-pattern")) {
  const shapeDir = join("examples/by-pattern", shape);
  if (!isDir(shapeDir)) continue;
  for (const workflow of readdirSync(shapeDir)) {
    const wfDir = join(shapeDir, workflow);
    if (!isDir(wfDir)) continue;
    workflowCount++;

    for (const required of ["workflow.ts", "package.json", "README.md"]) {
      if (!existsSync(join(wfDir, required))) {
        fail(`${wfDir}: missing ${required}`);
      }
    }

    const pkgPath = join(wfDir, "package.json");
    if (!existsSync(pkgPath)) continue;
    let pkg;
    try {
      pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    } catch (e) {
      fail(`${pkgPath}: invalid JSON: ${e.message}`);
      continue;
    }
    const deps = pkg.dependencies ?? {};
    for (const dep of REQUIRED_DEPS) {
      if (!deps[dep]) fail(`${pkgPath}: missing dependency ${dep}`);
    }
  }
}

if (errors.length) {
  for (const e of errors) console.error(`FAIL ${e}`);
  console.error(`\n${errors.length} structural check(s) failed.`);
  process.exit(1);
}
console.log(`Structural checks passed. ${workflowCount} workflow(s) verified.`);
