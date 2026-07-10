# Plaud — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 0 · Read 1 · Search 0 · **Total:** 1 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app plaud

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions plaud
npx zapier-sdk list-actions plaud --action-type write
npx zapier-sdk list-actions plaud --action-type read
npx zapier-sdk list-actions plaud --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action plaud <action-type> <action-key>
npx zapier-sdk list-action-input-fields plaud <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections plaud
npx zapier-sdk create-connection plaud   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices plaud <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Retrieve a completed transcript and summary of an AI-generated session.
npx zapier-sdk run-action plaud read new_ai_generation_complete --connection <connection-id> \
  --inputs '{"minimum_duration":0,"format_for_transcript_and_summary":"detailed"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`get-ai-generation-complete.ts`](./get-ai-generation-complete.ts) | Retrieve a completed transcript and summary of an AI-generated session. |
