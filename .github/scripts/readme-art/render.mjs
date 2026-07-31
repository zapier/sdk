/**
 * Entry point for the README art pipeline. Renders every SVG under
 * assets/readme/; `--check` byte-compares against what is committed instead,
 * so a hand-edited artifact or a stale regeneration fails CI.
 */

import { buildArchitecture } from "./architecture.mjs";
import { buildBanner } from "./banner.mjs";
import { buildTerminal } from "./terminal.mjs";
import { writeOrCheck } from "./lib.mjs";

const ARTIFACTS = [
  ["assets/readme/banner.svg", buildBanner],
  ["assets/readme/demo.svg", buildTerminal],
  ["assets/readme/architecture.svg", buildArchitecture],
];

const check = process.argv.includes("--check");
for (const [path, build] of ARTIFACTS) {
  writeOrCheck(path, build(), check);
}
