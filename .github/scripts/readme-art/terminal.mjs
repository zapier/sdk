/**
 * The README terminal demo: the Getting started beats replayed as an animated
 * SVG. Commands "type" (a widening clip over monospace text — same effect as
 * per-character reveal at a fraction of the elements), outputs fade in, and
 * the whole thing ends holding on the full transcript with a blinking cursor.
 *
 * Why an SVG and not a GIF: crisp at every DPI, ~10x smaller, and diffable —
 * a reviewer can read exactly what the demo claims the CLI said, and
 * `--check` pins it. The transcript itself lives in transcript.mjs with its
 * capture provenance; this file is only presentation.
 *
 * Alignment relies on textLength per segment rather than trusting the
 * viewer's monospace font metrics: every segment is pinned to
 * chars * CHAR_W, so colored spans line up in any font.
 */

import { PALETTE, escapeXml, fmt } from "./lib.mjs";
import { TRANSCRIPT } from "./transcript.mjs";

const W = 1200;
const PAD_X = 28;
const HEADER_H = 38;
const ROW_H = 20;
const FONT_SIZE = 14;
const CHAR_W = 8.45;
const TYPE_SPEED = 0.016; // seconds per character
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";

const COLORS = {
  plain: PALETTE.text,
  dim: "#8A7D71",
  green: PALETTE.green,
  accent: "#FF8A50",
  amber: PALETTE.amber,
  prompt: PALETTE.green,
};

function lineChars(line) {
  return line.segments.reduce((n, [text]) => n + text.length, 0);
}

function lineTspans(line) {
  let col = 0;
  const parts = [];
  for (const [text, color] of line.segments) {
    const x = PAD_X + col * CHAR_W;
    const len = text.length * CHAR_W;
    parts.push(
      `<tspan x="${fmt(x)}" textLength="${fmt(len)}" lengthAdjust="spacingAndGlyphs" ` +
        `fill="${COLORS[color]}">${escapeXml(text)}</tspan>`,
    );
    col += text.length;
  }
  return parts.join("");
}

export function buildTerminal() {
  const rows = TRANSCRIPT.length;
  const bodyTop = HEADER_H + 16;
  const H = bodyTop + (rows + 1) * ROW_H + 18;

  const body = [];
  let t = 0.5;
  let clipId = 0;
  let prevKind = null;

  TRANSCRIPT.forEach((line, i) => {
    const y = bodyTop + i * ROW_H + FONT_SIZE;
    if (line.kind === "blank") {
      t += 0.45;
      prevKind = "blank";
      return;
    }
    const text =
      `<text y="${fmt(y)}" font-family="${MONO}" font-size="${FONT_SIZE}" ` +
      `xml:space="preserve">${lineTspans(line)}</text>`;

    if (line.kind === "cmd") {
      // A fresh command block gets a beat of "operator thinking" first.
      if (prevKind !== "cmd") t += 0.4;
      const chars = lineChars(line);
      const dur = Math.max(0.15, chars * TYPE_SPEED);
      const width = chars * CHAR_W + 2;
      clipId += 1;
      body.push(
        `<clipPath id="type${clipId}"><rect x="${PAD_X - 1}" y="${fmt(y - FONT_SIZE - 3)}" width="0" height="${ROW_H + 4}">` +
          `<animate attributeName="width" from="0" to="${fmt(width)}" begin="${fmt(t)}s" dur="${fmt(dur)}s" fill="freeze"/>` +
          `</rect></clipPath>`,
        `<g clip-path="url(#type${clipId})">${text}</g>`,
      );
      t += dur + 0.08;
    } else {
      // Output: the CLI "answers" a beat after the command finishes.
      if (prevKind === "cmd") t += 0.3;
      const begin = line.continuation === true ? Math.max(0, t - 0.12) : t;
      body.push(
        `<g opacity="0"><animate attributeName="opacity" from="0" to="1" begin="${fmt(begin)}s" dur="0.18s" fill="freeze"/>${text}</g>`,
      );
      if (line.continuation !== true) t += 0.12;
    }
    prevKind = line.kind;
  });

  // Prompt + blinking cursor on the row after the transcript ends.
  const endY = bodyTop + rows * ROW_H + FONT_SIZE;
  const promptEnd =
    `<g opacity="0">` +
    `<animate attributeName="opacity" from="0" to="1" begin="${fmt(t + 0.5)}s" dur="0.15s" fill="freeze"/>` +
    `<text y="${fmt(endY)}" font-family="${MONO}" font-size="${FONT_SIZE}" xml:space="preserve">` +
    `<tspan x="${PAD_X}" fill="${COLORS.prompt}">$ </tspan></text>` +
    `<rect x="${fmt(PAD_X + 2 * CHAR_W)}" y="${fmt(endY - FONT_SIZE + 1)}" width="${fmt(CHAR_W)}" height="${FONT_SIZE + 3}" fill="${COLORS.plain}">` +
    `<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.5;1" dur="1.2s" begin="${fmt(t + 0.7)}s" repeatCount="indefinite"/>` +
    `</rect></g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Terminal demo: zapier-sdk discovers Notion's search actions from the live catalog, then run-action calls one through an existing OAuth connection and returns matching pages as JSON">
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="12" fill="${PALETTE.bg}" stroke="${PALETTE.cardStroke}"/>
  <path d="M1 ${HEADER_H}h${W - 2}" stroke="${PALETTE.cardStroke}"/>
  <circle cx="24" cy="${HEADER_H / 2}" r="6" fill="#FF5F57"/>
  <circle cx="46" cy="${HEADER_H / 2}" r="6" fill="#FEBC2E"/>
  <circle cx="68" cy="${HEADER_H / 2}" r="6" fill="#28C840"/>
  <text x="${W / 2}" y="${HEADER_H / 2 + 4.5}" text-anchor="middle" font-family="${MONO}" font-size="12.5"
    fill="${PALETTE.dim}">zapier-sdk — captured output, replayed</text>
  ${body.join("\n  ")}
  ${promptEnd}
</svg>
`;
}
