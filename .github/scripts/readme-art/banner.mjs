/**
 * The README hero banner: a pixel-art key on a keyring of app-colored charms
 * — "Zapier handles the keys" — plus a pixel wordmark.
 *
 * Everything here is deterministic — the dot field comes from a seeded LCG —
 * so `--check` can byte-compare. Animation is SMIL (<animate>/
 * <animateMotion>), not CSS, because SMIL runs inside an <img> on both GitHub
 * and GitLab, and the static frame still looks right anywhere animation is
 * off: every animated element has a sensible resting state.
 */

import {
  APP_COLORS,
  GLYPH_H,
  PALETTE,
  fmt,
  lcg,
  pixelTextCells,
  pixelTextPath,
} from "./lib.mjs";

const W = 1200;
const H = 320;

/** The keyring the app charms hang on, centered on the key. */
const KEY = { cx: 185, cy: 160, cell: 10 };
const RING = { rx: 158, ry: 62, tiltDeg: -14 };

const WORDMARK_X = 430;
const WORDMARK_PS = 12;
const WORD_Y = 96;
const TAGLINE_Y = WORD_Y + GLYPH_H * WORDMARK_PS + 44;

/**
 * The key as a bitmap: bow with a hole on the left, shaft and two teeth on
 * the right. '#' cells get a 3-tone ramp (lit top, shadow bottom).
 */
const KEY_BITMAP = [
  "..####............",
  ".##..##...........",
  "##....##..........",
  "##....############",
  "##....############",
  "##....##....##..##",
  ".##..##.....##..##",
  "..####......##....",
];

function ringPoint(thetaRad) {
  const phi = (RING.tiltDeg * Math.PI) / 180;
  const ox = RING.rx * Math.cos(thetaRad);
  const oy = RING.ry * Math.sin(thetaRad);
  return {
    x: KEY.cx + ox * Math.cos(phi) - oy * Math.sin(phi),
    y: KEY.cy + ox * Math.sin(phi) + oy * Math.cos(phi),
  };
}

/**
 * The half of the ring that passes in front of the key, as a sampled path.
 * Sampling sidesteps rotated-elliptical-arc bookkeeping, and 4° steps are
 * indistinguishable from the true curve at this stroke width.
 */
function frontArc() {
  const step = (4 * Math.PI) / 180;
  let start = 0;
  for (let t = 0; t < 2 * Math.PI; t += step) {
    const before = ringPoint(t - step).y <= KEY.cy;
    const here = ringPoint(t).y > KEY.cy;
    if (before && here) {
      start = t;
      break;
    }
  }
  const points = [];
  for (let t = start; t <= start + 2 * Math.PI; t += step) {
    const p = ringPoint(t);
    if (points.length > 0 && p.y <= KEY.cy) break;
    points.push(`${points.length === 0 ? "M" : "L"}${fmt(p.x)} ${fmt(p.y)}`);
  }
  return points.join("");
}

/** The key bitmap as pixels with a lit/base/shadow ramp. */
function keyPixels() {
  const rows = KEY_BITMAP.length;
  const cols = KEY_BITMAP[0].length;
  const x0 = KEY.cx - (cols * KEY.cell) / 2;
  const y0 = KEY.cy - (rows * KEY.cell) / 2;
  const pixels = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (KEY_BITMAP[row][col] !== "#") continue;
      const color =
        row <= 1 ? PALETTE.orangeLit : row >= 6 ? PALETTE.orangeDeep : PALETTE.orange;
      pixels.push({ x: x0 + col * KEY.cell, y: y0 + row * KEY.cell, color });
    }
  }
  return pixels;
}

/** Group pixels by color: one <path> per color keeps the SVG small. */
function pixelPaths(pixels, cell) {
  const byColor = new Map();
  for (const p of pixels) {
    const d = byColor.get(p.color) ?? [];
    d.push(`M${fmt(p.x)} ${fmt(p.y)}h${cell}v${cell}h${-cell}Z`);
    byColor.set(p.color, d);
  }
  return [...byColor.entries()]
    .map(([color, ds]) => `<path fill="${color}" d="${ds.join("")}"/>`)
    .join("\n    ");
}

/** Sparse warm dot field — circuit-board texture, kept out of the wordmark. */
function dotField() {
  const rand = lcg(20260731);
  const parts = [];
  for (let i = 0; i < 140; i++) {
    const x = 14 + rand() * (W - 28);
    const y = 14 + rand() * (H - 28);
    const bright = rand();
    const size = rand() < 0.8 ? 2 : 3;
    if (x > WORDMARK_X - 24 && y > WORD_Y - 18 && y < TAGLINE_Y + 12) continue;
    const twinkles = i % 9 === 0;
    const dur = fmt(2.6 + rand() * 3);
    const begin = fmt(rand() * 4);
    parts.push(
      twinkles
        ? `<rect x="${fmt(x)}" y="${fmt(y)}" width="${size}" height="${size}" fill="${PALETTE.dotBright}" opacity="0.3">` +
            `<animate attributeName="opacity" values="0.15;0.8;0.15" dur="${dur}s" begin="${begin}s" repeatCount="indefinite"/></rect>`
        : `<rect x="${fmt(x)}" y="${fmt(y)}" width="${size}" height="${size}" fill="${bright < 0.3 ? "#3A2E24" : PALETTE.dotDim}"/>`,
    );
  }
  return parts.join("\n    ");
}

/** App-colored square charms threaded on the ring. */
function charms() {
  const rand = lcg(424242);
  const back = [];
  const front = [];
  const count = APP_COLORS.length;
  for (let i = 0; i < count; i++) {
    const theta = (i / count) * 2 * Math.PI + rand() * 0.4;
    const p = ringPoint(theta);
    const size = 8 + Math.floor(rand() * 3);
    const color = APP_COLORS[i % APP_COLORS.length];
    const stroke = color === "#26292C" ? ` stroke="${PALETTE.dim}" stroke-width="1"` : "";
    const rect =
      `<rect x="${fmt(p.x - size / 2)}" y="${fmt(p.y - size / 2)}" ` +
      `width="${size}" height="${size}" fill="${color}"${stroke}/>`;
    (p.y > KEY.cy ? front : back).push(rect);
  }
  return { back: back.join("\n    "), front: front.join("\n    ") };
}

export function buildBanner() {
  const arc = frontArc();
  const ch = charms();
  const glowR = RING.rx + 40;

  const word = "ZAPIER SDK";
  const shadow = pixelTextPath(word, WORDMARK_X + 5, WORD_Y + 5, WORDMARK_PS);
  const wordPath = pixelTextPath(word, WORDMARK_X, WORD_Y, WORDMARK_PS);
  const wordmarkWidth = pixelTextCells(word) * WORDMARK_PS;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Zapier SDK — let your agent connect to anything, Zapier handles the keys: a pixel-art key on a keyring of app-colored charms">
  <defs>
    <radialGradient id="glow">
      <stop offset="0%" stop-color="${PALETTE.orange}" stop-opacity="0.14"/>
      <stop offset="70%" stop-color="${PALETTE.orange}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${PALETTE.orange}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wordmark" x1="0" y1="${WORD_Y}" x2="0" y2="${WORD_Y + GLYPH_H * WORDMARK_PS}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${PALETTE.cream}"/>
      <stop offset="55%" stop-color="#FFB489"/>
      <stop offset="100%" stop-color="${PALETTE.orange}"/>
    </linearGradient>
  </defs>

  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="${PALETTE.bg}" stroke="${PALETTE.cardStroke}"/>

  <g>
    ${dotField()}
  </g>

  <circle cx="${KEY.cx}" cy="${KEY.cy}" r="${glowR}" fill="url(#glow)"/>

  <ellipse cx="${KEY.cx}" cy="${KEY.cy}" rx="${RING.rx}" ry="${RING.ry}"
    transform="rotate(${RING.tiltDeg} ${KEY.cx} ${KEY.cy})"
    fill="none" stroke="${PALETTE.faint}" stroke-dasharray="3 5"/>

  <g>
    ${ch.back}
  </g>

  <g shape-rendering="crispEdges">
    ${pixelPaths(keyPixels(), KEY.cell)}
  </g>

  <g>
    ${ch.front}
  </g>

  <g>
    <rect x="-3" y="-3" width="6" height="6" fill="${PALETTE.dotBright}" opacity="0">
      <animateMotion path="${arc}" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="8s" repeatCount="indefinite"/>
    </rect>
  </g>

  <g shape-rendering="crispEdges">
    <path fill="#000000" opacity="0.45" d="${shadow}"/>
    <path fill="url(#wordmark)" d="${wordPath}"/>
  </g>

  <text x="${WORDMARK_X + 2}" y="${TAGLINE_Y}" fill="${PALETTE.dim}"
    font-family="ui-monospace, 'SF Mono', Menlo, Consolas, monospace" font-size="12.5"
    letter-spacing="3" textLength="${wordmarkWidth - 4}" lengthAdjust="spacing">LET YOUR AGENT CONNECT TO ANYTHING · ZAPIER HANDLES THE KEYS</text>
</svg>
`;
}
