# Chatbots — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 1 · Read 3 · Search 0 · **Total:** 4 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app zapier-chatbots

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions zapier-chatbots
npx zapier-sdk list-actions zapier-chatbots --action-type write
npx zapier-sdk list-actions zapier-chatbots --action-type read
npx zapier-sdk list-actions zapier-chatbots --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action zapier-chatbots <action-type> <action-key>
npx zapier-sdk list-action-input-fields zapier-chatbots <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections zapier-chatbots
npx zapier-sdk create-connection zapier-chatbots   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices zapier-chatbots <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Generate a reply to a user message in a chatbot conversation.
npx zapier-sdk run-action zapier-chatbots write chatbot_response --connection <connection-id> \
  --inputs '{"conversationKey":"support-chat-2024","message":"How can I reset my password?"}'

# Retrieve data when a specific chatbot button is clicked.
npx zapier-sdk run-action zapier-chatbots read button_click --connection <connection-id> \
  --inputs '{}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`generate-reply-to-message.ts`](./generate-reply-to-message.ts) | Generate a reply to a user message in a chatbot conversation. |
| [`chatbot-button-click.ts`](./chatbot-button-click.ts) | Retrieve data when a specific chatbot button is clicked. |
