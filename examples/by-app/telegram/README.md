# Telegram — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 4 · Read 1 · Search 0 · **Total:** 5 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app telegram

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions telegram
npx zapier-sdk list-actions telegram --action-type write
npx zapier-sdk list-actions telegram --action-type read
npx zapier-sdk list-actions telegram --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action telegram <action-type> <action-key>
npx zapier-sdk list-action-input-fields telegram <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections telegram
npx zapier-sdk create-connection telegram   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices telegram <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send a text message to a Telegram chat.
npx zapier-sdk run-action telegram write send_message --connection <connection-id> \
  --inputs '{"format":"plaintext","text":"Welcome to the group! Please read the rules.","disable_link_preview":false}'

# Get notified when a new message is received in a Telegram chat.
npx zapier-sdk run-action telegram read new_message --connection <connection-id> \
  --inputs '{"message_type":"text"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`send-message.ts`](./send-message.ts) | Send a text message to a Telegram chat. |
| [`new-message.ts`](./new-message.ts) | Get notified when a new message is received in a Telegram chat. |
