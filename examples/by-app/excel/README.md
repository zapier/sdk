# Excel — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 11 · Read 4 · Search 5 · **Total:** 20 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app excel

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions excel
npx zapier-sdk list-actions excel --action-type write
npx zapier-sdk list-actions excel --action-type read
npx zapier-sdk list-actions excel --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action excel <action-type> <action-key>
npx zapier-sdk list-action-input-fields excel <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections excel
npx zapier-sdk create-connection excel   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices excel <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Add a new row to an Excel worksheet.
npx zapier-sdk run-action excel write add_row --connection <connection-id> \
  --inputs '{"storage_source":"OneDrive","folder_id":"root"}'

# Find a row in an Excel worksheet by a specific value.
npx zapier-sdk run-action excel search find_row --connection <connection-id> \
  --inputs '{"storage_source":"OneDrive","folder_id":"root","lookup_value":"Acme Corp"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`add-row.ts`](./add-row.ts) | Add a new row to an Excel worksheet. |
| [`find-row.ts`](./find-row.ts) | Find a row in an Excel worksheet by a specific value. |
