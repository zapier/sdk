# CI scripts

Two scripts gate every PR via [`.github/workflows/validate.yml`](../workflows/validate.yml).

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

## Enabling on a fork or new repo

Store the credential pair as GitHub Actions secrets:

```bash
gh secret set ZAPIER_CLIENT_ID --repo <owner>/<repo>
gh secret set ZAPIER_CLIENT_SECRET --repo <owner>/<repo>
```
