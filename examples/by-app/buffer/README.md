# Buffer — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 3 · Read 9 · Search 0 · **Total:** 12 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app buffer

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions buffer
npx zapier-sdk list-actions buffer --action-type write
npx zapier-sdk list-actions buffer --action-type read
npx zapier-sdk list-actions buffer --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action buffer <action-type> <action-key>
npx zapier-sdk list-action-input-fields buffer <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections buffer
npx zapier-sdk create-connection buffer   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices buffer <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Add an item to the Buffer publishing queue.
npx zapier-sdk run-action buffer write update --connection <connection-id> \
  --inputs '{"method":"https://www.example.com/blog/launch-announcement"}'

# List tags assigned to a Buffer post or draft, filtered by status.
npx zapier-sdk run-action buffer read tagAssignedToPost --connection <connection-id> \
  --inputs '{"status":"pending"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`add-to-queue.ts`](./add-to-queue.ts) | Add an item to the Buffer publishing queue. |
| [`tag-assigned-to-post-or-draft.ts`](./tag-assigned-to-post-or-draft.ts) | List tags assigned to a Buffer post or draft, filtered by status. |
