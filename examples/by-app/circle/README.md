# Circle — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 23 · Read 24 · Search 4 · **Total:** 51 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app circle

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions circle
npx zapier-sdk list-actions circle --action-type write
npx zapier-sdk list-actions circle --action-type read
npx zapier-sdk list-actions circle --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action circle <action-type> <action-key>
npx zapier-sdk list-action-input-fields circle <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections circle
npx zapier-sdk create-connection circle   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices circle <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new contact in the community.
npx zapier-sdk run-action circle write create_contact --connection <connection-id> \
  --inputs '{"first_name":"Jane","last_name":"Doe","email":"jane.doe@example.com"}'

# Find a community member by their email address.
npx zapier-sdk run-action circle search find_member --connection <connection-id> \
  --inputs '{"email":"jane.doe@example.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-contact.ts`](./create-contact.ts) | Create a new contact in the community. |
| [`find-member.ts`](./find-member.ts) | Find a community member by their email address. |
