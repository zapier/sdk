# GoogleDrive — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 14 · Read 4 · Search 4 · **Total:** 22 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app google-drive

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions google-drive
npx zapier-sdk list-actions google-drive --action-type write
npx zapier-sdk list-actions google-drive --action-type read
npx zapier-sdk list-actions google-drive --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action google-drive <action-type> <action-key>
npx zapier-sdk list-action-input-fields google-drive <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections google-drive
npx zapier-sdk create-connection google-drive   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices google-drive <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Upload a file to Google Drive.
npx zapier-sdk run-action google-drive write file --connection <connection-id> \
  --inputs '{"file":"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf","convert":false,"new_name":"Q2 Budget Report.pdf","new_extension":"pdf","idempotency_key":"upload-20240601-01"}'

# Retrieve a file or folder from Google Drive by its ID.
npx zapier-sdk run-action google-drive search file_or_folder_by_id --connection <connection-id> \
  --inputs '{"id":"1a2b3c4d5e6f7g8h9i0j"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`upload-file.ts`](./upload-file.ts) | Upload a file to Google Drive. |
| [`retrieve-file-or-folder-by-id.ts`](./retrieve-file-or-folder-by-id.ts) | Retrieve a file or folder from Google Drive by its ID. |
