# GoogleTasks — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 3 · Read 3 · Search 2 · **Total:** 8 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app google-tasks

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions google-tasks
npx zapier-sdk list-actions google-tasks --action-type write
npx zapier-sdk list-actions google-tasks --action-type read
npx zapier-sdk list-actions google-tasks --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action google-tasks <action-type> <action-key>
npx zapier-sdk list-action-input-fields google-tasks <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections google-tasks
npx zapier-sdk create-connection google-tasks   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices google-tasks <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new task in a Google Tasks list.
npx zapier-sdk run-action google-tasks write task --connection <connection-id> \
  --inputs '{"title":"Book flights for conference","notes":"Compare prices on Delta and United","due":"2024-06-15T17:00:00Z"}'

# Find a task by its title in Google Tasks.
npx zapier-sdk run-action google-tasks search find_task --connection <connection-id> \
  --inputs '{"title":"Book flights for conference"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-task.ts`](./create-task.ts) | Create a new task in a Google Tasks list. |
| [`find-task.ts`](./find-task.ts) | Find a task by its title in Google Tasks. |
