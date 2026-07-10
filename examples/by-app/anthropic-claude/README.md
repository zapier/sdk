# Anthropic — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 4 · Read 0 · Search 2 · **Total:** 6 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app anthropic-claude

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions anthropic-claude
npx zapier-sdk list-actions anthropic-claude --action-type write
npx zapier-sdk list-actions anthropic-claude --action-type read
npx zapier-sdk list-actions anthropic-claude --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action anthropic-claude <action-type> <action-key>
npx zapier-sdk list-action-input-fields anthropic-claude <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections anthropic-claude
npx zapier-sdk create-connection anthropic-claude   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices anthropic-claude <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send a conversational message to Claude and receive its AI-generated response.
npx zapier-sdk run-action anthropic-claude write create_message --connection <connection-id> \
  --inputs '{"user_message":"Summarize the key findings from the attached market research report.","system":"You are a helpful assistant for business analysts.","memory_key":"market-research-session-2024","advanced":false}'

# Upload a document for use in Claude conversations or analysis.
npx zapier-sdk run-action anthropic-claude write upload_file --connection <connection-id> \
  --inputs '{"file":"/files/reports/market-research-q2-2024.pdf"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`send-message.ts`](./send-message.ts) | Send a conversational message to Claude and receive its AI-generated response. |
| [`upload-file.ts`](./upload-file.ts) | Upload a document for use in Claude conversations or analysis. |
