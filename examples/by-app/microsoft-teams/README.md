# MSTeams — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 15 · Read 7 · Search 6 · **Total:** 28 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app microsoft-teams

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions microsoft-teams
npx zapier-sdk list-actions microsoft-teams --action-type write
npx zapier-sdk list-actions microsoft-teams --action-type read
npx zapier-sdk list-actions microsoft-teams --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action microsoft-teams <action-type> <action-key>
npx zapier-sdk list-action-input-fields microsoft-teams <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections microsoft-teams
npx zapier-sdk create-connection microsoft-teams   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices microsoft-teams <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send a message to a Microsoft Teams channel as a user.
npx zapier-sdk run-action microsoft-teams write send_channel_message_from_user --connection <connection-id> \
  --inputs '{"message":"Quarterly review meeting is scheduled for Friday at 10am.","format":"text","importance":"high"}'

# Find public channels in Microsoft Teams by name.
npx zapier-sdk run-action microsoft-teams search search_public_channel --connection <connection-id> \
  --inputs '{"channel_name":"Marketing","include_archived":false}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`send-channel-message-from-user.ts`](./send-channel-message-from-user.ts) | Send a message to a Microsoft Teams channel as a user. |
| [`search-public-channel.ts`](./search-public-channel.ts) | Find public channels in Microsoft Teams by name. |
