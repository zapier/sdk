# OneDrive — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 11 · Read 3 · Search 6 · **Total:** 20 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app onedrive

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions onedrive
npx zapier-sdk list-actions onedrive --action-type write
npx zapier-sdk list-actions onedrive --action-type read
npx zapier-sdk list-actions onedrive --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action onedrive <action-type> <action-key>
npx zapier-sdk list-action-input-fields onedrive <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections onedrive
npx zapier-sdk create-connection onedrive   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices onedrive <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Upload a file to OneDrive.
npx zapier-sdk run-action onedrive write file --connection <connection-id> \
  --inputs '{"file":"/Users/alex/Documents/marketing-plan.pdf","name":"Q2 Marketing Plan.pdf"}'

# Find a file in OneDrive by searching for its name or content.
npx zapier-sdk run-action onedrive search file --connection <connection-id> \
  --inputs '{"query":"Q2 Marketing Plan"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`upload-file.ts`](./upload-file.ts) | Upload a file to OneDrive. |
| [`find-file.ts`](./find-file.ts) | Find a file in OneDrive by searching for its name or content. |
