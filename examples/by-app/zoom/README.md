# Zoom — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 4 · Read 10 · Search 4 · **Total:** 18 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app zoom

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions zoom
npx zapier-sdk list-actions zoom --action-type write
npx zapier-sdk list-actions zoom --action-type read
npx zapier-sdk list-actions zoom --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action zoom <action-type> <action-key>
npx zapier-sdk list-action-input-fields zoom <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections zoom
npx zapier-sdk create-connection zoom   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices zoom <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new Zoom meeting for a scheduled event.
npx zapier-sdk run-action zoom write create_meeting --connection <connection-id> \
  --inputs '{"type":"scheduled"}'

# Search for a Zoom meeting or webinar by type and topic.
npx zapier-sdk run-action zoom search find_meeting --connection <connection-id> \
  --inputs '{"type":"scheduled","topic":"Quarterly Planning","isExactMatch":false}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-meeting.ts`](./create-meeting.ts) | Create a new Zoom meeting for a scheduled event. |
| [`find-meeting.ts`](./find-meeting.ts) | Search for a Zoom meeting or webinar by type and topic. |
