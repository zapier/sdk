# HoneyBook — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 2 · Read 6 · Search 0 · **Total:** 8 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app honeybook

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions honeybook
npx zapier-sdk list-actions honeybook --action-type write
npx zapier-sdk list-actions honeybook --action-type read
npx zapier-sdk list-actions honeybook --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action honeybook <action-type> <action-key>
npx zapier-sdk list-action-input-fields honeybook <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections honeybook
npx zapier-sdk create-connection honeybook   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices honeybook <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new project with client details and event information.
npx zapier-sdk run-action honeybook write create_project --connection <connection-id> \
  --inputs '{"full_name":"Jessica Smith","email":"jessica.smith@email.com","phone_number":"555-1234","event_type":"Wedding","event_date":"2024-09-14","event_details":"Outdoor ceremony at Central Park","event_location":"Central Park, NYC"}'

# Add a new client with contact information.
npx zapier-sdk run-action honeybook write new_contact --connection <connection-id> \
  --inputs '{"full_name":"Michael Johnson","email":"michael.johnson@email.com","address":"456 Oak Street, Springfield","phone_number":"555-5678"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-project.ts`](./create-project.ts) | Create a new project with client details and event information. |
| [`create-client.ts`](./create-client.ts) | Add a new client with contact information. |
