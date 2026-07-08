#!/usr/bin/env node
// Regenerate skills/zapier-sdk/references/cli-commands.md from `zapier-sdk --help`
// output. Runs the CLI twice (default + --experimental), enumerates every command
// from the root help's grouped listing, then captures each command's own --help
// verbatim. See .github/scripts/README.md.

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const OUT_PATH = join(REPO_ROOT, "skills/zapier-sdk/references/cli-commands.md");

const sh = (args) =>
  execFileSync("npx", ["--no-install", "zapier-sdk", ...args], {
    cwd: REPO_ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

const CLI_VERSION = sh(["--version"]).trim();

const rootHelp = sh(["--help"]);
const expHelp = sh(["--experimental", "--help"]);

const parseCommandsSection = (help) => {
  const idx = help.indexOf("Commands:");
  if (idx === -1) return {};
  const lines = help.slice(idx).split("\n").slice(1);
  const byCategory = {};
  let current = null;
  for (const raw of lines) {
    if (!raw.trim()) continue;
    const categoryMatch = raw.match(/^ {2}([A-Z][A-Za-z ]+):\s*$/);
    if (categoryMatch) {
      current = categoryMatch[1].trim();
      byCategory[current] ??= [];
      continue;
    }
    const commandMatch = raw.match(/^ {4}(\S+)(?: (.*))?$/);
    if (commandMatch && current) {
      const [, name, signatureTail = ""] = commandMatch;
      byCategory[current].push({ name, signature: `${name} ${signatureTail}`.trim() });
    }
  }
  return byCategory;
};

const parseGlobalOptions = (help) => {
  const start = help.indexOf("Options:");
  const end = help.indexOf("Commands:");
  if (start === -1 || end === -1) return "";
  return help.slice(start, end).trim();
};

const defaultByCategory = parseCommandsSection(rootHelp);
const experimentalByCategory = parseCommandsSection(expHelp);
const globalOptions = parseGlobalOptions(rootHelp);

const defaultNames = new Set();
for (const cmds of Object.values(defaultByCategory))
  for (const c of cmds) defaultNames.add(c.name);

const merged = {};
for (const [cat, cmds] of Object.entries(defaultByCategory))
  merged[cat] = cmds.map((c) => ({ ...c, experimental: false }));
for (const [cat, cmds] of Object.entries(experimentalByCategory)) {
  merged[cat] ??= [];
  for (const c of cmds) {
    if (!defaultNames.has(c.name)) merged[cat].push({ ...c, experimental: true });
  }
}

for (const cat of Object.keys(merged)) {
  merged[cat].sort((a, b) => a.name.localeCompare(b.name));
}

const CATEGORY_ORDER = [
  "Accounts",
  "Apps",
  "Connections",
  "Actions",
  "Triggers",
  "Tables",
  "HTTP Requests",
  "Code Workflows",
  "Client Credentials",
  "Utilities",
  "Other",
];
const orderedCategories = [
  ...CATEGORY_ORDER.filter((c) => c in merged),
  ...Object.keys(merged).filter((c) => !CATEGORY_ORDER.includes(c)),
];

const commandHelp = {};
for (const cat of orderedCategories) {
  for (const cmd of merged[cat]) {
    if (cmd.name === "help") continue;
    const args = [];
    if (cmd.experimental) args.push("--experimental");
    args.push(cmd.name, "--help");
    commandHelp[cmd.name] = sh(args).trimEnd();
  }
}

const totalCommands = orderedCategories.reduce(
  (n, c) => n + merged[c].filter((cmd) => cmd.name !== "help").length,
  0,
);

const lines = [];
lines.push("<!--");
lines.push("  GENERATED FILE — do not edit by hand.");
lines.push("  Source:      .github/scripts/generate-cli-reference.mjs");
lines.push(`  CLI version: ${CLI_VERSION}`);
lines.push("  Regenerate:  npm run generate:cli-reference");
lines.push("-->");
lines.push("");
lines.push("# CLI command reference");
lines.push("");
lines.push(
  `Zapier SDK CLI **v${CLI_VERSION}** — ${totalCommands} commands across ${orderedCategories.length} categories. Regenerated verbatim from \`zapier-sdk --help\` output.`,
);
lines.push("");
lines.push(
  "Detailed schemas and examples: https://docs.zapier.com/sdk/cli-reference. Happy-path walkthrough: [`cli.md`](./cli.md).",
);
lines.push("");
lines.push("## Command inventory");
lines.push("");
for (const cat of orderedCategories) {
  const cmds = merged[cat].filter((c) => c.name !== "help");
  if (!cmds.length) continue;
  lines.push(`### ${cat}`);
  lines.push("");
  for (const cmd of cmds) {
    const flag = cmd.experimental ? " _(experimental)_" : "";
    lines.push(`- \`${cmd.signature}\`${flag}`);
  }
  lines.push("");
}

lines.push("## Global options");
lines.push("");
lines.push("```");
lines.push(globalOptions);
lines.push("```");
lines.push("");

lines.push("## Commands");
lines.push("");
for (const cat of orderedCategories) {
  const cmds = merged[cat].filter((c) => c.name !== "help");
  if (!cmds.length) continue;
  lines.push(`### ${cat}`);
  lines.push("");
  for (const cmd of cmds) {
    const flag = cmd.experimental ? " _(requires `--experimental`)_" : "";
    lines.push(`#### \`${cmd.name}\`${flag}`);
    lines.push("");
    lines.push("```");
    lines.push(commandHelp[cmd.name]);
    lines.push("```");
    lines.push("");
  }
}

writeFileSync(OUT_PATH, lines.join("\n"));
console.log(
  `Wrote ${OUT_PATH} (CLI v${CLI_VERSION}, ${totalCommands} commands, ${orderedCategories.length} categories).`,
);
