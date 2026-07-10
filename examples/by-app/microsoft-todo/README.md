# MSTodo — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 3 · Read 4 · Search 1 · **Total:** 8 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app microsoft-todo

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions microsoft-todo
npx zapier-sdk list-actions microsoft-todo --action-type write
npx zapier-sdk list-actions microsoft-todo --action-type read
npx zapier-sdk list-actions microsoft-todo --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action microsoft-todo <action-type> <action-key>
npx zapier-sdk list-action-input-fields microsoft-todo <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections microsoft-todo
npx zapier-sdk create-connection microsoft-todo   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices microsoft-todo <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new task with details like note, due date, and importance.
npx zapier-sdk run-action microsoft-todo write task --connection <connection-id> \
  --inputs '{"title":"Submit Q2 Budget Report","note":"Attach the final draft and email to finance","due_date":"2024-07-15","reminder_date":"2024-07-14T09:00:00Z","is_reminder_on":false,"importance":"high"}'

# Find an existing task by title keyword.
npx zapier-sdk run-action microsoft-todo search find_task --connection <connection-id> \
  --inputs '{"title":"Budget Report","include_completed_tasks":false}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-task.ts`](./create-task.ts) | Create a new task with details like note, due date, and importance. |
| [`find-task.ts`](./find-task.ts) | Find an existing task by title keyword. |
