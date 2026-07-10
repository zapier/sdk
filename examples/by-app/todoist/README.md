# Todoist — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 8 · Read 3 · Search 3 · **Total:** 14 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app todoist

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions todoist
npx zapier-sdk list-actions todoist --action-type write
npx zapier-sdk list-actions todoist --action-type read
npx zapier-sdk list-actions todoist --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action todoist <action-type> <action-key>
npx zapier-sdk list-action-input-fields todoist <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections todoist
npx zapier-sdk create-connection todoist   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices todoist <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new task in Todoist.
npx zapier-sdk run-action todoist write new_task --connection <connection-id> \
  --inputs '{"content":"Draft Q3 OKRs","note":"Discuss with leadership before finalizing.","date_string":"tomorrow at 9am","priority":1}'

# Find a project by name in Todoist.
npx zapier-sdk run-action todoist search find_project --connection <connection-id> \
  --inputs '{"name":"Product Launch"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-task.ts`](./create-task.ts) | Create a new task in Todoist. |
| [`find-project.ts`](./find-project.ts) | Find a project by name in Todoist. |
