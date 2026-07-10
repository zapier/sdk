# GoogleSheets — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 20 · Read 7 · Search 8 · **Total:** 35 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app google-sheets

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions google-sheets
npx zapier-sdk list-actions google-sheets --action-type write
npx zapier-sdk list-actions google-sheets --action-type read
npx zapier-sdk list-actions google-sheets --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action google-sheets <action-type> <action-key>
npx zapier-sdk list-action-input-fields google-sheets <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections google-sheets
npx zapier-sdk create-connection google-sheets   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices google-sheets <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new spreadsheet with a specific title.
npx zapier-sdk run-action google-sheets write create_spreadsheet --connection <connection-id> \
  --inputs '{"title":"Q2 Financial Report"}'

# Find spreadsheet rows matching a specific value.
npx zapier-sdk run-action google-sheets search find_many_rows --connection <connection-id> \
  --inputs '{"lookup_value":"Acme Corp","lookup_value_support":"contains","bottom_up":false,"row_count":10}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-spreadsheet.ts`](./create-spreadsheet.ts) | Create a new spreadsheet with a specific title. |
| [`lookup-spreadsheet-rows.ts`](./lookup-spreadsheet-rows.ts) | Find spreadsheet rows matching a specific value. |
