# GoogleHangoutsChat — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 1 · Read 0 · Search 0 · **Total:** 1 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app google-chat

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions google-chat
npx zapier-sdk list-actions google-chat --action-type write
npx zapier-sdk list-actions google-chat --action-type read
npx zapier-sdk list-actions google-chat --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action google-chat <action-type> <action-key>
npx zapier-sdk list-action-input-fields google-chat <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections google-chat
npx zapier-sdk create-connection google-chat   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices google-chat <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send a message to a Google Chat space.
npx zapier-sdk run-action google-chat write create_message --connection <connection-id> \
  --inputs '{"title":"Team Update","imageUrl":"https://example.com/meeting.png","subtitle":"Weekly Standup","text":"Hello team, our next meeting is at 2:00 PM.","buttonText":"Join Meeting","buttonUrl":"https://meet.google.com/xyz-meeting"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-message.ts`](./create-message.ts) | Send a message to a Google Chat space. |
