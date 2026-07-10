# Zendesk — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 11 · Read 12 · Search 7 · **Total:** 30 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app zendesk

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions zendesk
npx zapier-sdk list-actions zendesk --action-type write
npx zapier-sdk list-actions zendesk --action-type read
npx zapier-sdk list-actions zendesk --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action zendesk <action-type> <action-key>
npx zapier-sdk list-action-input-fields zendesk <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections zendesk
npx zapier-sdk create-connection zendesk   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices zendesk <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new support ticket with an initial comment.
npx zapier-sdk run-action zendesk write ticket --connection <connection-id> \
  --inputs '{"subject":"Login issue on mobile app","name":"Jane Doe","email":"jane.doe@example.com","comment_format":"Plain Text","first_comment":"User cannot log in with correct credentials. Error message: 'Invalid username or password.'","first_comment_public":"yes","tags":"mobile,login,urgent","status":"new","type":"problem","priority":"urgent"}'

# Find a user by name or email address.
npx zapier-sdk run-action zendesk search user --connection <connection-id> \
  --inputs '{"query":"jane.doe@example.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-ticket.ts`](./create-ticket.ts) | Create a new support ticket with an initial comment. |
| [`find-user.ts`](./find-user.ts) | Find a user by name or email address. |
