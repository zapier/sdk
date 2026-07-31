# CI scripts

Three checks gate every PR via [`.github/workflows/validate.yml`](../workflows/validate.yml): the structural checks, the README-art check, and the live-catalog audit.

## `validate-corpus.mjs`

No-credentials structural checks. Gates every PR including forks.

- Every `by-domain/<slug>/<name>` entry is a symlink resolving under `by-pattern/` (domains are curation, never original code).
- Every `by-pattern/<shape>/<name>/` directory has `workflow.ts`, `package.json`, and `README.md`.
- Every workflow `package.json` parses and declares `@zapier/zapier-sdk` and `@zapier/zapier-durable`.

Run locally:

```bash
node .github/scripts/validate-corpus.mjs
```

## `audit.mjs`

Live-catalog integrity check for the corpus's core promise: action keys must be real. Walks every `by-pattern/*/*/workflow.ts` and every `by-app/*/*.ts`, extracts each `runAction({ appKey, actionType, actionKey, inputs })` via the TypeScript AST (resolving top-level `const *_APP_KEY = "..."` refs), and verifies against the live Zapier catalog:

- App key exists (`listActions` returns non-empty).
- Action exists with the exact `action_type` (write / search / read).
- Action isn't `is_hidden` (hidden actions aren't on the stable surface).
- For non-`zapier:dynamicProperties` schemas, every static input key present in the call literal exists in the schema.

Also asserts a count invariant: if a file contains more `runAction(` occurrences than triples the extractor pulled out, the audit fails and asks the author to match the corpus style or extend the extractor. Files that use the typed `sdk.apps.<x>.<type>.<action>()` form or first-class Tables methods pass through as 0 sites / 0 triples.

Requires credentials, so it can't gate fork PRs. Without `ZAPIER_CLIENT_ID` / `ZAPIER_CLIENT_SECRET` it exits 0 with `SKIP`.

Run locally:

```bash
# Auth once, then mint a credential pair.
npx zapier-sdk login
npx zapier-sdk create-client-credentials "local-audit" --json

# Run against the live catalog.
npm install --no-save @zapier/zapier-sdk typescript@5
ZAPIER_CLIENT_ID=... ZAPIER_CLIENT_SECRET=... node .github/scripts/audit.mjs
```

Rotate credentials with `list-client-credentials` / `delete-client-credentials`.

## `readme-art/render.mjs`

Regenerates the three SVGs under [`assets/readme/`](../../assets/readme) — the README banner, terminal demo, and architecture diagram. The SVGs are derived artifacts: the generators under [`readme-art/`](./readme-art) are the source, and the generators are deterministic (seeded PRNG only, no timestamps), so regenerating always produces byte-identical files. The demo transcript in [`readme-art/transcript.mjs`](./readme-art/transcript.mjs) is captured live CLI output, never typeset — its provenance header records the commands, date, and CLI version of the capture.

`--check` byte-compares a fresh render against the committed SVGs and fails on any drift, so a hand-edited artifact or a stale regeneration can't land. Gates every PR including forks (no credentials needed).

```bash
npm run generate:readme-art           # rewrite assets/readme/*.svg
npm run generate:readme-art:check     # what CI runs
```

## `generate-cli-reference.mjs`

Regenerates [`skills/zapier-sdk/references/cli-commands.md`](../../skills/zapier-sdk/references/cli-commands.md) — a compact inventory plus verbatim per-command `--help` output for every `zapier-sdk` CLI command. Ships alongside the hand-written happy-path guide at [`references/cli.md`](../../skills/zapier-sdk/references/cli.md) so skill readers see both the tour and the full surface.

Not on any CI job. Run manually when bumping the pinned `@zapier/zapier-sdk-cli` in [`package.json`](../../package.json) (Renovate will typically open the bump PR):

```bash
npm install
npm run generate:cli-reference
git add skills/zapier-sdk/references/cli-commands.md package.json
```

The generated file carries a `CLI version: X.Y.Z` header, so the checked-in copy always reflects the currently pinned version.

## Enabling on a fork or new repo

Store the credential pair as GitHub Actions secrets:

```bash
gh secret set ZAPIER_CLIENT_ID --repo <owner>/<repo>
gh secret set ZAPIER_CLIENT_SECRET --repo <owner>/<repo>
```
