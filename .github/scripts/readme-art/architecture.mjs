/**
 * The README architecture diagram: how an action call reaches an app, top to
 * bottom — your code, the SDK surface, the Zapier platform that holds the
 * OAuth grants, and the app catalog underneath. Static SVG, same card and
 * palette as the banner and the terminal demo so the README reads as one
 * designed surface.
 *
 * Layout is all computed, nothing eyeballed: chip widths come from character
 * counts, and the rows are spaced off shared constants — so renaming a chip
 * cannot silently overlap its neighbor.
 */

import { PALETTE, escapeXml } from "./lib.mjs";

const W = 1200;
const H = 470;
const MONO = "ui-monospace, 'SF Mono', Menlo, Consolas, monospace";
const CW12 = 7.25; // monospace advance at font-size 12, for width estimates

function monoText(x, y, text, opts = {}) {
  const size = opts.size ?? 12;
  const anchor = opts.anchor ?? "middle";
  const spacing = opts.spacing === undefined ? "" : ` letter-spacing="${opts.spacing}"`;
  const weight = opts.weight === undefined ? "" : ` font-weight="${opts.weight}"`;
  return (
    `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${MONO}" ` +
    `font-size="${size}" fill="${opts.fill ?? PALETTE.dim}"${spacing}${weight} xml:space="preserve">${escapeXml(text)}</text>`
  );
}

function box(x, y, w, h, fill, stroke, dashed = false) {
  const dash = dashed ? ` stroke-dasharray="5 4"` : "";
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}"${dash}/>`;
}

function arrow(x, y1, y2) {
  return `<path d="M${x} ${y1}v${y2 - y1}" stroke="${PALETTE.faint}" stroke-width="1.5" marker-end="url(#arrow)"/>`;
}

export function buildArchitecture() {
  const parts = [];

  // ── callers ────────────────────────────────────────────────────────────
  const actors = ["your agent", "your backend", "npx zapier-sdk (CLI)"];
  const actorW = 268;
  const actorH = 44;
  const actorY = 74;
  const actorGap = 42;
  const actorsX0 = (W - (actors.length * actorW + (actors.length - 1) * actorGap)) / 2;
  actors.forEach((label, i) => {
    const x = actorsX0 + i * (actorW + actorGap);
    parts.push(
      box(x, actorY, actorW, actorH, "#14110B", "#57492E"),
      monoText(x + actorW / 2, actorY + 27, label, { fill: PALETTE.amber }),
      arrow(x + actorW / 2, actorY + actorH, actorY + actorH + 34),
    );
  });

  // ── the SDK surface ────────────────────────────────────────────────────
  const srvX = 200;
  const srvW = W - 2 * srvX;
  const srvY = actorY + actorH + 42;
  const srvH = 68;
  parts.push(
    box(srvX, srvY, srvW, srvH, "#171009", "#7A3A14"),
    monoText(W / 2, srvY + 27, "@zapier/zapier-sdk — createZapierSdk()", {
      size: 13.5,
      fill: "#FF8A50",
      weight: "600",
    }),
    monoText(W / 2, srvY + 49, "runAction · apps.<app>.<type>.<action> · fetch(url, { connection }) · listApps / listActions", {
      size: 11.5,
    }),
    arrow(W / 2, srvY + srvH, srvY + srvH + 40),
  );

  // Backing rect so the center arrow does not run through the label.
  const httpsLabel = "HTTPS — Zapier holds the OAuth grants; your code never sees a token";
  const httpsY = srvY + srvH + 26;
  const httpsLabelW = httpsLabel.length * 7 + 18;
  parts.push(
    `<rect x="${(W - httpsLabelW) / 2}" y="${httpsY - 12}" width="${httpsLabelW}" height="17" fill="${PALETTE.bg}"/>`,
    monoText(W / 2, httpsY, httpsLabel, { size: 11.5 }),
  );

  // ── the platform layer ─────────────────────────────────────────────────
  const platX = 200;
  const platW = W - 2 * platX;
  const platY = srvY + srvH + 56;
  const platH = 60;
  parts.push(
    box(platX, platY, platW, platH, "#0D1710", "#2EA043"),
    monoText(W / 2, platY + 26, "Zapier platform — connections + live action catalog", {
      size: 13.5,
      fill: PALETTE.green,
      weight: "600",
    }),
    monoText(W / 2, platY + 46, "OAuth connections · audit trail · action schemas resolved at runtime", {
      size: 11.5,
    }),
  );

  // ── app chips ──────────────────────────────────────────────────────────
  const chips = ["notion", "gmail", "google-sheets", "airtable", "… 9,000+ apps"];
  const chipH = 34;
  const chipPad = 22;
  const chipGap = 12;
  const chipY = platY + platH + 36;
  const chipWidths = chips.map((c) => Math.round(c.length * CW12) + chipPad);
  const anyApi = "any HTTP API — sdk.fetch";
  const anyW = Math.round(anyApi.length * CW12) + chipPad;
  const rowW = chipWidths.reduce((a, b) => a + b, 0) + (chips.length - 1) * chipGap + 26 + anyW;
  const rowX0 = (W - rowW) / 2;
  let cx = rowX0;
  chips.forEach((label, i) => {
    const w = chipWidths[i];
    parts.push(
      box(cx, chipY, w, chipH, "#181310", "#4A3B2E"),
      monoText(cx + w / 2, chipY + 22, label, { fill: "#CCC0B4" }),
    );
    cx += w + chipGap;
  });
  const anyX = rowX0 + rowW - anyW;
  parts.push(
    box(anyX, chipY, anyW, chipH, "none", "#8A6A1F", true),
    monoText(anyX + anyW / 2, chipY + 22, anyApi, { fill: PALETTE.amber }),
  );

  // ── how you get a connection ───────────────────────────────────────────
  const capY = chipY + chipH + 38;
  const cap1 = "$ npx zapier-sdk create-connection notion";
  const cap2 = "   # OAuth once in a browser — every run after that reuses the grant";
  const capW = (cap1.length + cap2.length) * CW12;
  const capX = (W - capW) / 2;
  parts.push(
    monoText(capX, capY, cap1, { anchor: "start", fill: PALETTE.green }),
    monoText(capX + cap1.length * CW12, capY, cap2, { anchor: "start" }),
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Architecture: your agent, your backend, and the zapier-sdk CLI call @zapier/zapier-sdk; the SDK talks HTTPS to the Zapier platform, which holds the OAuth connections and the live action catalog for notion, gmail, google-sheets, airtable, and 9,000+ more apps, with sdk.fetch as the escape hatch for any HTTP API">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill="${PALETTE.faint}"/>
    </marker>
  </defs>
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="${PALETTE.bg}" stroke="${PALETTE.cardStroke}"/>
  ${monoText(W / 2, 42, "HOW AN ACTION CALL REACHES AN APP", { size: 12, spacing: 4, fill: "#8A7A6C" })}
  ${parts.join("\n  ")}
</svg>
`;
}
