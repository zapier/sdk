# Pipedrive — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 24 · Read 18 · Search 22 · **Total:** 64 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app pipedrive

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions pipedrive
npx zapier-sdk list-actions pipedrive --action-type write
npx zapier-sdk list-actions pipedrive --action-type read
npx zapier-sdk list-actions pipedrive --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action pipedrive <action-type> <action-key>
npx zapier-sdk list-action-input-fields pipedrive <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections pipedrive
npx zapier-sdk create-connection pipedrive   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices pipedrive <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new sales lead with a title and optional details.
npx zapier-sdk run-action pipedrive write create_lead --connection <connection-id> \
  --inputs '{"title":"Acme Corp Expansion","note":"Potential deal for new office setup.","pinned_note":false,"expected_close_date":"2024-08-01","channel_id":"webform-123"}'

# Find tasks matching a search term.
npx zapier-sdk run-action pipedrive search search_task --connection <connection-id> \
  --inputs '{"term":"Follow up with Acme Corp","isExactMatch":false,"done":false}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-lead.ts`](./create-lead.ts) | Create a new sales lead with a title and optional details. |
| [`find-tasks.ts`](./find-tasks.ts) | Find tasks matching a search term. |
