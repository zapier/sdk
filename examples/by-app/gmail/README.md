# GoogleMail — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 11 · Read 8 · Search 2 · **Total:** 21 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app gmail

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions gmail
npx zapier-sdk list-actions gmail --action-type write
npx zapier-sdk list-actions gmail --action-type read
npx zapier-sdk list-actions gmail --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action gmail <action-type> <action-key>
npx zapier-sdk list-action-input-fields gmail <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections gmail
npx zapier-sdk create-connection gmail   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices gmail <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send an email to one or more recipients.
npx zapier-sdk run-action gmail write message --connection <connection-id> \
  --inputs '{"from_name":"Jane Smith","reply_to":"jane.smith@company.com","subject":"Quarterly Update","body_type":"plain","body":"Hello team,\n\nPlease find attached the quarterly update.\n\nBest regards,\nJane","signature_delimiter":true,"send_to_groups":false}'

# Find an email matching a specific search query.
npx zapier-sdk run-action gmail search message --connection <connection-id> \
  --inputs '{"query":"from:ceo@company.com is:unread"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`send-email.ts`](./send-email.ts) | Send an email to one or more recipients. |
| [`find-email.ts`](./find-email.ts) | Find an email matching a specific search query. |
