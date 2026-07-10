# Monday — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 18 · Read 10 · Search 8 · **Total:** 36 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app monday

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions monday
npx zapier-sdk list-actions monday --action-type write
npx zapier-sdk list-actions monday --action-type read
npx zapier-sdk list-actions monday --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action monday <action-type> <action-key>
npx zapier-sdk list-action-input-fields monday <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections monday
npx zapier-sdk create-connection monday   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices monday <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new board for project management or tracking.
npx zapier-sdk run-action monday write create_board --connection <connection-id> \
  --inputs '{"board_name":"Marketing Campaign Q3","board_kind":"public"}'

# Monitor specific columns in a board for any changes.
npx zapier-sdk run-action monday read specific_columns_values_changed_in_board --connection <connection-id> \
  --inputs '{"column_ids":"status,date"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-board.ts`](./create-board.ts) | Create a new board for project management or tracking. |
| [`watch-specific-columns-changed.ts`](./watch-specific-columns-changed.ts) | Monitor specific columns in a board for any changes. |
