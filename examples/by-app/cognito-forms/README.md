# CognitoForms — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 4 · Read 3 · Search 3 · **Total:** 10 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app cognito-forms

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions cognito-forms
npx zapier-sdk list-actions cognito-forms --action-type write
npx zapier-sdk list-actions cognito-forms --action-type read
npx zapier-sdk list-actions cognito-forms --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action cognito-forms <action-type> <action-key>
npx zapier-sdk list-action-input-fields cognito-forms <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections cognito-forms
npx zapier-sdk create-connection cognito-forms   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices cognito-forms <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Update an existing Cognito Forms entry with new information.
npx zapier-sdk run-action cognito-forms write edit_entry --connection <connection-id> \
  --inputs '{"entry_id":"f3a1b9c2-45d7-4a2e-9a72-2e4d6b7c8c9d"}'

# Retrieve all entries from a specific Cognito Forms view.
npx zapier-sdk run-action cognito-forms search get_form_entries --connection <connection-id> \
  --inputs '{"entryViewId":"view-2024-open-applications","maxResults":1000,"selectIdOnly":false}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`update-entry.ts`](./update-entry.ts) | Update an existing Cognito Forms entry with new information. |
| [`get-form-entries.ts`](./get-form-entries.ts) | Retrieve all entries from a specific Cognito Forms view. |
