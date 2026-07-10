# GoogleContacts — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 5 · Read 3 · Search 1 · **Total:** 9 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app google-contacts

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions google-contacts
npx zapier-sdk list-actions google-contacts --action-type write
npx zapier-sdk list-actions google-contacts --action-type read
npx zapier-sdk list-actions google-contacts --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action google-contacts <action-type> <action-key>
npx zapier-sdk list-action-input-fields google-contacts <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections google-contacts
npx zapier-sdk create-connection google-contacts   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices google-contacts <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new contact in Google Contacts.
npx zapier-sdk run-action google-contacts write contact --connection <connection-id> \
  --inputs '{"first_name":"Jessica","last_name":"Tanaka","email":"jessica.tanaka@email.com","email_type":"home","phone_type":"mobile","address_type":"home","event_type":"anniversary","url_type":"home","relationship_type":"spouse"}'

# Find a contact by name, email, or phone number.
npx zapier-sdk run-action google-contacts search contact --connection <connection-id> \
  --inputs '{"search_by":"jessica.tanaka@email.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-contact.ts`](./create-contact.ts) | Create a new contact in Google Contacts. |
| [`find-contact.ts`](./find-contact.ts) | Find a contact by name, email, or phone number. |
