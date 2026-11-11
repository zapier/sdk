# CI scripts

[`.github/workflows/validate.yml`](../workflows/validate.yml) runs on every PR: the README-art check below, and a smoke test that the published CLI and SDK install and load.

## `readme-art/render.mjs`

Regenerates the three SVGs under [`assets/readme/`](../../assets/readme) — the README banner, terminal demo, and architecture diagram. The SVGs are derived artifacts: the generators under [`readme-art/`](./readme-art) are the source, and the generators are deterministic (seeded PRNG only, no timestamps), so regenerating always produces byte-identical files. The demo transcript in [`readme-art/transcript.mjs`](./readme-art/transcript.mjs) is captured live CLI output, never typeset — its provenance header records the commands, date, and CLI version of the capture.

`--check` byte-compares a fresh render against the committed SVGs and fails on any drift, so a hand-edited artifact or a stale regeneration can't land. Gates every PR including forks (no credentials needed).

```bash
npm run generate:readme-art           # rewrite assets/readme/*.svg
npm run generate:readme-art:check     # what CI runs
```
