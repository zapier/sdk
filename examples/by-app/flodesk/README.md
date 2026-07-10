# Flodesk — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 6 · Read 3 · Search 1 · **Total:** 10 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app flodesk

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions flodesk
npx zapier-sdk list-actions flodesk --action-type write
npx zapier-sdk list-actions flodesk --action-type read
npx zapier-sdk list-actions flodesk --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action flodesk <action-type> <action-key>
npx zapier-sdk list-action-input-fields flodesk <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections flodesk
npx zapier-sdk create-connection flodesk   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices flodesk <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create or update a subscriber in your Flodesk audience.
npx zapier-sdk run-action flodesk write create_or_update_subscriber --connection <connection-id> \
  --inputs '{"email":"jane.doe@example.com","firstName":"Jane","lastName":"Doe","doubleOptIn":false,"optinTimestamp":"2024-06-10T09:15:00Z"}'

# Find a subscriber by their email address.
npx zapier-sdk run-action flodesk search search_subscriber_by_email --connection <connection-id> \
  --inputs '{"email":"jane.doe@example.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-or-update-subscriber.ts`](./create-or-update-subscriber.ts) | Create or update a subscriber in your Flodesk audience. |
| [`search-subscriber-by-email.ts`](./search-subscriber-by-email.ts) | Find a subscriber by their email address. |
