/**
 * Shared pieces for the README art generators: the palette, a seeded PRNG, the
 * pixel font, and the write/--check plumbing.
 *
 * The SVGs under assets/readme/ are DERIVED ARTIFACTS: these scripts are the
 * source, `npm run generate:readme-art` regenerates them, and
 * `npm run generate:readme-art -- --check` (run by CI) fails on a hand-edit.
 * Everything is deterministic — the only randomness is the seeded LCG below,
 * so regenerating produces byte-identical files.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

/**
 * One palette for all three images: a warm dark card built around Zapier
 * orange (#FF4F00) and off-white (#FFFDF9), the same pair as assets/logo.svg.
 * A self-contained dark card reads well on both light and dark page themes
 * without a prefers-color-scheme media query (renderers disagree about
 * honoring those inside an <img>).
 */
export const PALETTE = {
  bg: "#100D0B",
  cardStroke: "#2B211A",
  orange: "#FF4F00",
  orangeLit: "#FF9B66",
  orangeDeep: "#C23C00",
  cream: "#FFFDF9",
  text: "#EDE6DF",
  dim: "#9C8F84",
  faint: "#4E4238",
  dotDim: "#2A211A",
  dotBright: "#FFC29E",
  green: "#3FB950",
  amber: "#E3B341",
};

/** Brand-adjacent colors for the app "charms" — recognizable, not exact marks. */
export const APP_COLORS = [
  "#36C5F0", // aqua
  "#E01E5A", // pink
  "#ECB22E", // yellow
  "#0079BF", // blue
  "#EA4335", // red
  "#34A853", // green
  "#0061FF", // deep blue
  "#26292C", // near-black (gets a light stroke)
  "#FF7A59", // coral
  "#7B68EE", // violet
];

/** Deterministic LCG in [0, 1). Numerical Recipes constants, 32-bit state. */
export function lcg(seed) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/**
 * A 5x7 pixel font — only the letters the banner needs, so a typo in a glyph
 * nobody renders cannot hide. Asking for a missing letter throws.
 */
const GLYPHS = {
  A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
  D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."],
  E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
  I: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"],
  K: ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"],
  P: ["####.", "#...#", "#...#", "####.", "#....", "#....", "#...."],
  R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
  S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
  Z: ["#####", "....#", "...#.", "..#..", ".#...", "#....", "#####"],
  " ": [".....", ".....", ".....", ".....", ".....", ".....", "....."],
};

export const GLYPH_W = 5;
export const GLYPH_H = 7;

/** Width of a pixel-font string, in cells (1-cell gap between letters). */
export function pixelTextCells(text) {
  return text.length * (GLYPH_W + 1) - 1;
}

/**
 * Render a pixel-font string as one SVG path `d` (one square per lit cell),
 * origin at (x, y), cell size `ps`. One path per string keeps the file small
 * and lets a single gradient span the whole wordmark.
 */
export function pixelTextPath(text, x, y, ps) {
  const parts = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const glyph = GLYPHS[ch];
    if (glyph === undefined) throw new Error(`pixel font has no glyph for '${ch}'`);
    const gx = x + i * (GLYPH_W + 1) * ps;
    for (let row = 0; row < GLYPH_H; row++) {
      const bits = glyph[row];
      for (let col = 0; col < GLYPH_W; col++) {
        if (bits[col] !== "#") continue;
        parts.push(`M${gx + col * ps} ${y + row * ps}h${ps}v${ps}h${-ps}Z`);
      }
    }
  }
  return parts.join("");
}

export function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Fixed-point formatting so float math can never produce 15-digit coordinates. */
export function fmt(n) {
  return Number(n.toFixed(2)).toString();
}

/**
 * Write the artifact, or in --check mode compare against what is committed —
 * a hand-edited artifact or a stale regeneration fails CI the same way a
 * stale skills/zapier-sdk/references/cli-commands.md would be caught.
 */
export function writeOrCheck(path, content, check) {
  if (!check) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
    console.log(`wrote ${path}`);
    return;
  }
  let existing;
  try {
    existing = readFileSync(path, "utf8");
  } catch {
    throw new Error(`${path} is missing — run \`npm run generate:readme-art\``);
  }
  if (existing !== content) {
    throw new Error(
      `${path} does not match its generator — hand-edited, or the generator changed ` +
        `without regenerating. Run \`npm run generate:readme-art\`.`,
    );
  }
  console.log(`check ok ${path}`);
}
