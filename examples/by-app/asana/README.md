# Asana — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 13 · Read 15 · Search 11 · **Total:** 39 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app asana

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions asana
npx zapier-sdk list-actions asana --action-type write
npx zapier-sdk list-actions asana --action-type read
npx zapier-sdk list-actions asana --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action asana <action-type> <action-key>
npx zapier-sdk list-action-input-fields asana <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections asana
npx zapier-sdk create-connection asana   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices asana <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new project with a name and description.
npx zapier-sdk run-action asana write project --connection <connection-id> \
  --inputs '{"name":"Product Launch Plan","notes":"Detailed plan and timeline for launching the new app in Q3."}'

# Find a project by its name.
npx zapier-sdk run-action asana search find_project --connection <connection-id> \
  --inputs '{"name":"Product Launch Plan"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-project.ts`](./create-project.ts) | Create a new project with a name and description. |
| [`find-project.ts`](./find-project.ts) | Find a project by its name. |
