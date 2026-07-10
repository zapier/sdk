# Discord — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 7 · Read 7 · Search 2 · **Total:** 16 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app discord

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions discord
npx zapier-sdk list-actions discord --action-type write
npx zapier-sdk list-actions discord --action-type read
npx zapier-sdk list-actions discord --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action discord <action-type> <action-key>
npx zapier-sdk list-action-input-fields discord <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections discord
npx zapier-sdk create-connection discord   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices discord <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send a message to a Discord channel.
npx zapier-sdk run-action discord write send_channel_message --connection <connection-id> \
  --inputs '{"content":"Hello from Zapier!","ping_usernames":false,"tts":false,"username":"Zapier Bot","avatar_url":"https://cdn.zapier.com/zapier-avatar.png"}'

# Find a Discord user by username.
npx zapier-sdk run-action discord search find_user --connection <connection-id> \
  --inputs '{"username":"discordUser123"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`send-channel-message.ts`](./send-channel-message.ts) | Send a message to a Discord channel. |
| [`find-user.ts`](./find-user.ts) | Find a Discord user by username. |
