# ZohoCRM — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 7 · Read 8 · Search 2 · **Total:** 17 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app zoho-crm

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions zoho-crm
npx zapier-sdk list-actions zoho-crm --action-type write
npx zapier-sdk list-actions zoho-crm --action-type read
npx zapier-sdk list-actions zoho-crm --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action zoho-crm <action-type> <action-key>
npx zapier-sdk list-action-input-fields zoho-crm <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections zoho-crm
npx zapier-sdk create-connection zoho-crm   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices zoho-crm <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Add an attachment file to a record in Zoho CRM.
npx zapier-sdk run-action zoho-crm write add_attachment --connection <connection-id> \
  --inputs '{"file_name":"Signed_Contract_2024.pdf","attachment_file":"/Users/alex/Documents/contract.pdf"}'

# Find a module entry by a specific value in Zoho CRM.
npx zapier-sdk run-action zoho-crm search search_module_entry --connection <connection-id> \
  --inputs '{"value":"john.doe@email.com","value_2":"Leads"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`add-attachment.ts`](./add-attachment.ts) | Add an attachment file to a record in Zoho CRM. |
| [`find-module-entry.ts`](./find-module-entry.ts) | Find a module entry by a specific value in Zoho CRM. |
