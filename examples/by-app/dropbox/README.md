# DropBox — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 16 · Read 4 · Search 6 · **Total:** 26 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app dropbox

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions dropbox
npx zapier-sdk list-actions dropbox --action-type write
npx zapier-sdk list-actions dropbox --action-type read
npx zapier-sdk list-actions dropbox --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action dropbox <action-type> <action-key>
npx zapier-sdk list-action-input-fields dropbox <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections dropbox
npx zapier-sdk create-connection dropbox   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices dropbox <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Upload a file to Dropbox.
npx zapier-sdk run-action dropbox write file --connection <connection-id> \
  --inputs '{"directory":"/","file":"/Users/alex/Documents/ProjectProposal.pdf","overwrite":false,"new_name":"ProjectProposal_Final.pdf","new_extension":"pdf","include_sharing_link":true}'

# Search for files and folders using keywords.
npx zapier-sdk run-action dropbox search advanced_search --connection <connection-id> \
  --inputs '{"query":"Q2 financial report","path":"/Reports/2024","order_by":"relevance","file_status":"active","filename_only":false}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`upload-file.ts`](./upload-file.ts) | Upload a file to Dropbox. |
| [`advanced-search.ts`](./advanced-search.ts) | Search for files and folders using keywords. |
