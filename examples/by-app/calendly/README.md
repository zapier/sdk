# Calendly — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 6 · Read 9 · Search 6 · **Total:** 21 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app calendly

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions calendly
npx zapier-sdk list-actions calendly --action-type write
npx zapier-sdk list-actions calendly --action-type read
npx zapier-sdk list-actions calendly --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action calendly <action-type> <action-key>
npx zapier-sdk list-action-input-fields calendly <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections calendly
npx zapier-sdk create-connection calendly   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices calendly <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new contact in Calendly with name and email.
npx zapier-sdk run-action calendly write create_contact --connection <connection-id> \
  --inputs '{"name":"Jordan Smith","emails_email":"jordan.smith@example.com","timezone":"America/New_York","job_title":"Head of Marketing","company":"Acme Corp","country":"United States","state":"NY"}'

# Find a contact in Calendly by unique identifier.
npx zapier-sdk run-action calendly search find_contact --connection <connection-id> \
  --inputs '{"uuid":"f47ac10b-58cc-4372-a567-0e02b2c3d479"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-contact.ts`](./create-contact.ts) | Create a new contact in Calendly with name and email. |
| [`find-contact.ts`](./find-contact.ts) | Find a contact in Calendly by unique identifier. |
