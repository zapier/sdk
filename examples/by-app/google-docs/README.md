# GoogleDocs — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 10 · Read 3 · Search 4 · **Total:** 17 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app google-docs

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions google-docs
npx zapier-sdk list-actions google-docs --action-type write
npx zapier-sdk list-actions google-docs --action-type read
npx zapier-sdk list-actions google-docs --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action google-docs <action-type> <action-key>
npx zapier-sdk list-action-input-fields google-docs <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections google-docs
npx zapier-sdk create-connection google-docs   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices google-docs <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Append text to the end of a Google Doc.
npx zapier-sdk run-action google-docs write append --connection <connection-id> \
  --inputs '{"folder":"root","text":"Summary of Q2 financial results: Revenue growth exceeded 15%.","newline":true}'

# Find specific text within a Google Doc.
npx zapier-sdk run-action google-docs search find_text --connection <connection-id> \
  --inputs '{"searchText":"Q2 financial results","matchCase":false,"returnAllMatches":false}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`append-text-to-document.ts`](./append-text-to-document.ts) | Append text to the end of a Google Doc. |
| [`find-text-in-document.ts`](./find-text-in-document.ts) | Find specific text within a Google Doc. |
