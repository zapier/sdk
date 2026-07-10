# GravityForms — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 2 · Read 1 · Search 0 · **Total:** 3 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app gravity-forms

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions gravity-forms
npx zapier-sdk list-actions gravity-forms --action-type write
npx zapier-sdk list-actions gravity-forms --action-type read
npx zapier-sdk list-actions gravity-forms --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action gravity-forms <action-type> <action-key>
npx zapier-sdk list-action-input-fields gravity-forms <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections gravity-forms
npx zapier-sdk create-connection gravity-forms   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices gravity-forms <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Retrieve a form submission by the form name.
npx zapier-sdk run-action gravity-forms read getEntry --connection <connection-id> \
  --inputs '{"admin_labels":false,"feed_name":"Contact Us"}'

# Submit a new response to a form.
npx zapier-sdk run-action gravity-forms write createFormSubmission --connection <connection-id> \
  --inputs '{}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`get-form-submission.ts`](./get-form-submission.ts) | Retrieve a form submission by the form name. |
| [`submit-form.ts`](./submit-form.ts) | Submit a new response to a form. |
