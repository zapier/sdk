# OpenPhone — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 2 · Read 8 · Search 8 · **Total:** 18 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app quo

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions quo
npx zapier-sdk list-actions quo --action-type write
npx zapier-sdk list-actions quo --action-type read
npx zapier-sdk list-actions quo --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action quo <action-type> <action-key>
npx zapier-sdk list-action-input-fields quo <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections quo
npx zapier-sdk create-connection quo   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices quo <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send a message to a phone number.
npx zapier-sdk run-action quo write send_message --connection <connection-id> \
  --inputs '{"to":"+14155551234","body":"Hi, this is your appointment reminder for 3 PM today. Please reply to confirm.","mark_as_done":false}'

# Retrieve a list of recent messages.
npx zapier-sdk run-action quo search list_messages --connection <connection-id> \
  --inputs '{"maxResults":5}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`send-message.ts`](./send-message.ts) | Send a message to a phone number. |
| [`list-messages.ts`](./list-messages.ts) | Retrieve a list of recent messages. |
