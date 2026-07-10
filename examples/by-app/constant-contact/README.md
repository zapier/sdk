# ConstantContact — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 5 · Read 4 · Search 1 · **Total:** 10 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app constant-contact

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions constant-contact
npx zapier-sdk list-actions constant-contact --action-type write
npx zapier-sdk list-actions constant-contact --action-type read
npx zapier-sdk list-actions constant-contact --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action constant-contact <action-type> <action-key>
npx zapier-sdk list-action-input-fields constant-contact <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections constant-contact
npx zapier-sdk create-connection constant-contact   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices constant-contact <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new contact in Constant Contact.
npx zapier-sdk run-action constant-contact write contact --connection <connection-id> \
  --inputs '{"create_source":"Sign-up Form","email":"jane.doe@example.com","first_name":"Jane","last_name":"Doe","job_title":"Marketing Manager","company_name":"Acme Corp","sms_consent_type":"Explicit","address_kind":"home"}'

# Find an existing contact by email or create a new one if none exists.
npx zapier-sdk run-action constant-contact search find_contact --connection <connection-id> \
  --inputs '{"email":"jane.doe@example.com","status":"active"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-contact.ts`](./create-contact.ts) | Create a new contact in Constant Contact. |
| [`find-or-create-contact.ts`](./find-or-create-contact.ts) | Find an existing contact by email or create a new one if none exists. |
