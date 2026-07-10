# ManyChat — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 9 · Read 6 · Search 4 · **Total:** 19 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app manychat

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions manychat
npx zapier-sdk list-actions manychat --action-type write
npx zapier-sdk list-actions manychat --action-type read
npx zapier-sdk list-actions manychat --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action manychat <action-type> <action-key>
npx zapier-sdk list-action-input-fields manychat <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections manychat
npx zapier-sdk create-connection manychat   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices manychat <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send a text message to a ManyChat user.
npx zapier-sdk run-action manychat write send_message --connection <connection-id> \
  --inputs '{"message_tag":"POST_PURCHASE_UPDATE","text":"Your package has shipped! Track it here: https://trackmypackage.com/1234"}'

# Find a ManyChat user by their name.
npx zapier-sdk run-action manychat search user_by_name --connection <connection-id> \
  --inputs '{"name":"Jessica Taylor"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`send-message.ts`](./send-message.ts) | Send a text message to a ManyChat user. |
| [`find-user-by-name.ts`](./find-user-by-name.ts) | Find a ManyChat user by their name. |
