# Thinkific — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 2 · Read 8 · Search 1 · **Total:** 11 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app thinkific

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions thinkific
npx zapier-sdk list-actions thinkific --action-type write
npx zapier-sdk list-actions thinkific --action-type read
npx zapier-sdk list-actions thinkific --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action thinkific <action-type> <action-key>
npx zapier-sdk list-action-input-fields thinkific <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections thinkific
npx zapier-sdk create-connection thinkific   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices thinkific <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Enroll a user in a Thinkific course.
npx zapier-sdk run-action thinkific write enroll_user --connection <connection-id> \
  --inputs '{"first_name":"Jane","last_name":"Doe","email":"jane.doe@example.com","expiry_date":"2024-12-31","company":"Acme Corp"}'

# Search for users by email address.
npx zapier-sdk run-action thinkific search users_list --connection <connection-id> \
  --inputs '{"email":"jane.doe@example.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`enroll-user.ts`](./enroll-user.ts) | Enroll a user in a Thinkific course. |
| [`search-users.ts`](./search-users.ts) | Search for users by email address. |
