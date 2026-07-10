# ChatGPT — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 20 · Read 0 · Search 5 · **Total:** 25 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app chatgpt

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions chatgpt
npx zapier-sdk list-actions chatgpt --action-type write
npx zapier-sdk list-actions chatgpt --action-type read
npx zapier-sdk list-actions chatgpt --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action chatgpt <action-type> <action-key>
npx zapier-sdk list-action-input-fields chatgpt <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections chatgpt
npx zapier-sdk create-connection chatgpt   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices chatgpt <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Start or continue a conversation with ChatGPT and receive a response.
npx zapier-sdk run-action chatgpt write conversation_responses_api --connection <connection-id> \
  --inputs '{"model":"gpt-4o","user_message":"What's the weather in Paris this weekend?","instructions":"Answer as a travel assistant.","use_prompt_template":false,"max_tokens":2000,"tool_choice":"auto","parallel_tool_calls":true,"max_tool_calls":5,"response_format":"text"}'

# Retrieve a specific ChatGPT response using its response ID.
npx zapier-sdk run-action chatgpt search find_response --connection <connection-id> \
  --inputs '{"response_id":"resp_1234567890abcdef"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`conversation.ts`](./conversation.ts) | Start or continue a conversation with ChatGPT and receive a response. |
| [`find-response.ts`](./find-response.ts) | Retrieve a specific ChatGPT response using its response ID. |
