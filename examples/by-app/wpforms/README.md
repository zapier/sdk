# WPForms — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 0 · Read 1 · Search 0 · **Total:** 1 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app wpforms

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions wpforms
npx zapier-sdk list-actions wpforms --action-type write
npx zapier-sdk list-actions wpforms --action-type read
npx zapier-sdk list-actions wpforms --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action wpforms <action-type> <action-key>
npx zapier-sdk list-action-input-fields wpforms <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections wpforms
npx zapier-sdk create-connection wpforms   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices wpforms <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Fetch a new entry submitted through a WPForms form.
npx zapier-sdk run-action wpforms read entry --connection <connection-id> \
  --inputs '{"form_id":"12345"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`fetch-new-form-entry.ts`](./fetch-new-form-entry.ts) | Fetch a new entry submitted through a WPForms form. |
