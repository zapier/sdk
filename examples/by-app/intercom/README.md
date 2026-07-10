# Intercom — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 16 · Read 18 · Search 6 · **Total:** 40 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app intercom

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions intercom
npx zapier-sdk list-actions intercom --action-type write
npx zapier-sdk list-actions intercom --action-type read
npx zapier-sdk list-actions intercom --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action intercom <action-type> <action-key>
npx zapier-sdk list-action-input-fields intercom <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections intercom
npx zapier-sdk create-connection intercom   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices intercom <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send a message to a user by email.
npx zapier-sdk run-action intercom write send_message --connection <connection-id> \
  --inputs '{"contact_identifier":"email","email":"jane.doe@example.com","body":"Hi Jane, just checking in to see how you are enjoying our service!"}'

# Find a user by email address.
npx zapier-sdk run-action intercom search find_user --connection <connection-id> \
  --inputs '{"search_mode":"email","search_value":"jane.doe@example.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`send-message.ts`](./send-message.ts) | Send a message to a user by email. |
| [`find-user.ts`](./find-user.ts) | Find a user by email address. |
