# HighLevel — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 5 · Read 1 · Search 0 · **Total:** 6 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app leadconnector

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions leadconnector
npx zapier-sdk list-actions leadconnector --action-type write
npx zapier-sdk list-actions leadconnector --action-type read
npx zapier-sdk list-actions leadconnector --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action leadconnector <action-type> <action-key>
npx zapier-sdk list-action-input-fields leadconnector <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections leadconnector
npx zapier-sdk create-connection leadconnector   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices leadconnector <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Add or update a contact with provided details.
npx zapier-sdk run-action leadconnector write add_update_contact --connection <connection-id> \
  --inputs '{"firstName":"Jane","lastName":"Doe","name":"Jane Doe","phone":"555-123-4567","email":"jane.doe@example.com","lead":"12345"}'

# Add a task with a title and description for a lead.
npx zapier-sdk run-action leadconnector write task --connection <connection-id> \
  --inputs '{"title":"Follow up with new lead","body":"Call to discuss project requirements.","dueDate":"2024-07-01","firstName":"Jane","lastName":"Doe","phone":"555-123-4567","email":"jane.doe@example.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`add-update-contact.ts`](./add-update-contact.ts) | Add or update a contact with provided details. |
| [`add-task.ts`](./add-task.ts) | Add a task with a title and description for a lead. |
