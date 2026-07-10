# ClickUp — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 19 · Read 10 · Search 6 · **Total:** 35 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app clickup

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions clickup
npx zapier-sdk list-actions clickup --action-type write
npx zapier-sdk list-actions clickup --action-type read
npx zapier-sdk list-actions clickup --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action clickup <action-type> <action-key>
npx zapier-sdk list-action-input-fields clickup <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections clickup
npx zapier-sdk create-connection clickup   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices clickup <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new task in ClickUp.
npx zapier-sdk run-action clickup write task --connection <connection-id> \
  --inputs '{"name":"Draft Q2 Marketing Plan","content":"Outline key strategies for Q2 growth and assign initial tasks.","markdown":true,"priority":"high","start_date":"2024-07-01","due_date":"2024-07-15"}'

# Find a user by name or email.
npx zapier-sdk run-action clickup search findUser --connection <connection-id> \
  --inputs '{"field":"email","value":"alice.jones@acme.com","include_shared":true}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-task.ts`](./create-task.ts) | Create a new task in ClickUp. |
| [`find-user.ts`](./find-user.ts) | Find a user by name or email. |
