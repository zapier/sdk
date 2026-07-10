# GoogleForms — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 0 · Read 2 · Search 0 · **Total:** 2 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app google-forms

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions google-forms
npx zapier-sdk list-actions google-forms --action-type write
npx zapier-sdk list-actions google-forms --action-type read
npx zapier-sdk list-actions google-forms --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action google-forms <action-type> <action-key>
npx zapier-sdk list-action-input-fields google-forms <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections google-forms
npx zapier-sdk create-connection google-forms   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices google-forms <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Retrieve responses submitted to a Google Form.
npx zapier-sdk run-action google-forms read new_form_response --connection <connection-id> \
  --inputs '{}'

# Fetch new or updated responses from a Google Form.
npx zapier-sdk run-action google-forms read updated_form_response --connection <connection-id> \
  --inputs '{}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`get-new-form-response.ts`](./get-new-form-response.ts) | Retrieve responses submitted to a Google Form. |
| [`get-updated-form-response.ts`](./get-updated-form-response.ts) | Fetch new or updated responses from a Google Form. |
