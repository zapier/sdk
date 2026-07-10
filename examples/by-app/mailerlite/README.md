# MailerLite — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 8 · Read 13 · Search 2 · **Total:** 23 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app mailerlite

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions mailerlite
npx zapier-sdk list-actions mailerlite --action-type write
npx zapier-sdk list-actions mailerlite --action-type read
npx zapier-sdk list-actions mailerlite --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action mailerlite <action-type> <action-key>
npx zapier-sdk list-action-input-fields mailerlite <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections mailerlite
npx zapier-sdk create-connection mailerlite   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices mailerlite <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Add or update a subscriber by email.
npx zapier-sdk run-action mailerlite write create_update_subscriber --connection <connection-id> \
  --inputs '{"email":"jane.doe@example.com","resubscribe":false}'

# Find a subscriber by email or name.
npx zapier-sdk run-action mailerlite search find_subscriber --connection <connection-id> \
  --inputs '{"email_or_name":"jane.doe@example.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-update-subscriber.ts`](./create-update-subscriber.ts) | Add or update a subscriber by email. |
| [`find-subscriber.ts`](./find-subscriber.ts) | Find a subscriber by email or name. |
