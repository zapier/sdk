# Airtable — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 9 · Read 2 · Search 8 · **Total:** 19 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app airtable

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions airtable
npx zapier-sdk list-actions airtable --action-type write
npx zapier-sdk list-actions airtable --action-type read
npx zapier-sdk list-actions airtable --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action airtable <action-type> <action-key>
npx zapier-sdk list-action-input-fields airtable <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections airtable
npx zapier-sdk create-connection airtable   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices airtable <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new Airtable base in a specific workspace.
npx zapier-sdk run-action airtable write create_base --connection <connection-id> \
  --inputs '{"baseName":"Project Tracker","workspaceId":"wspc12345","tableCount":2}'

# Find a table in Airtable matching a keyword.
npx zapier-sdk run-action airtable search findTable --connection <connection-id> \
  --inputs '{"keyword":"Tasks","searchField":"name"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-base.ts`](./create-base.ts) | Create a new Airtable base in a specific workspace. |
| [`find-table.ts`](./find-table.ts) | Find a table in Airtable matching a keyword. |
