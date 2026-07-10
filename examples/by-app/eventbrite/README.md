# Eventbrite — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 3 · Read 5 · Search 2 · **Total:** 10 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app eventbrite

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions eventbrite
npx zapier-sdk list-actions eventbrite --action-type write
npx zapier-sdk list-actions eventbrite --action-type read
npx zapier-sdk list-actions eventbrite --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action eventbrite <action-type> <action-key>
npx zapier-sdk list-action-input-fields eventbrite <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections eventbrite
npx zapier-sdk create-connection eventbrite   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices eventbrite <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new event with specific details.
npx zapier-sdk run-action eventbrite write eventCreate --connection <connection-id> \
  --inputs '{"name":"Summer Networking Mixer","description":"An evening of networking for local professionals at Rooftop Bar.","start":"2024-08-15T18:00:00Z","end":"2024-08-15T21:00:00Z","currency":"USD","listed":false}'

# Find an event by keyword or phrase.
npx zapier-sdk run-action eventbrite search eventSearch --connection <connection-id> \
  --inputs '{"query":"Networking Mixer"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-event.ts`](./create-event.ts) | Create a new event with specific details. |
| [`find-event.ts`](./find-event.ts) | Find an event by keyword or phrase. |
