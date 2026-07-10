# Sendinbluev2 — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 10 · Read 15 · Search 0 · **Total:** 25 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app brevo

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions brevo
npx zapier-sdk list-actions brevo --action-type write
npx zapier-sdk list-actions brevo --action-type read
npx zapier-sdk list-actions brevo --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action brevo <action-type> <action-key>
npx zapier-sdk list-action-input-fields brevo <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections brevo
npx zapier-sdk create-connection brevo   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices brevo <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create or update a contact in your Brevo account.
npx zapier-sdk run-action brevo write contactAddorupdate --connection <connection-id> \
  --inputs '{"updateOnExisting":true,"emailBlacklisted":false,"smsBlacklisted":false,"listsUpdateType":"add","attribcategoryIsID":false,"contact_key_identification":{"email":"susan.chan@acmecorp.com"}}'

# Detect when a transactional email has been opened.
npx zapier-sdk run-action brevo read emailTsOpened --connection <connection-id> \
  --inputs '{"webhookdesc":"Track customer engagement for order confirmation emails.","getContactData":false}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-or-update-contact.ts`](./create-or-update-contact.ts) | Create or update a contact in your Brevo account. |
| [`transactional-email-opened.ts`](./transactional-email-opened.ts) | Detect when a transactional email has been opened. |
