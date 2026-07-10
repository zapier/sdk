# HubSpot — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 43 · Read 27 · Search 14 · **Total:** 84 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app hubspot

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions hubspot
npx zapier-sdk list-actions hubspot --action-type write
npx zapier-sdk list-actions hubspot --action-type read
npx zapier-sdk list-actions hubspot --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action hubspot <action-type> <action-key>
npx zapier-sdk list-action-input-fields hubspot <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections hubspot
npx zapier-sdk create-connection hubspot   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices hubspot <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Update a contact's email subscription preferences.
npx zapier-sdk run-action hubspot write add_contact_to_subscription --connection <connection-id> \
  --inputs '{"subscription_type_ids":["123"],"legal_basis_explanation":"Customer opted in via website form."}'

# Retrieve owner details using their email address.
npx zapier-sdk run-action hubspot search find_owner_by_email --connection <connection-id> \
  --inputs '{"owner_email":"jane.doe@acme.com","search_archived":false}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`update-contact-subscription-preferences.ts`](./update-contact-subscription-preferences.ts) | Update a contact's email subscription preferences. |
| [`get-owner-by-email.ts`](./get-owner-by-email.ts) | Retrieve owner details using their email address. |
