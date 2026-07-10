# PandaDoc — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 4 · Read 4 · Search 3 · **Total:** 11 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app pandadoc

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions pandadoc
npx zapier-sdk list-actions pandadoc --action-type write
npx zapier-sdk list-actions pandadoc --action-type read
npx zapier-sdk list-actions pandadoc --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action pandadoc <action-type> <action-key>
npx zapier-sdk list-action-input-fields pandadoc <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections pandadoc
npx zapier-sdk create-connection pandadoc   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices pandadoc <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create and optionally send a PandaDoc document.
npx zapier-sdk run-action pandadoc write create_document --connection <connection-id> \
  --inputs '{"doc_name":"Sales Proposal Q2 2024","send":true,"message":"Please review and sign this proposal.","currency":"USD"}'

# Search for PandaDoc documents by query or status.
npx zapier-sdk run-action pandadoc search find_document --connection <connection-id> \
  --inputs '{"query":"Sales Proposal Q2 2024","status":"sent"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-document.ts`](./create-document.ts) | Create and optionally send a PandaDoc document. |
| [`find-document.ts`](./find-document.ts) | Search for PandaDoc documents by query or status. |
