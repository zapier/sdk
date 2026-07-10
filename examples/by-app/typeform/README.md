# Typeform — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 3 · Read 3 · Search 1 · **Total:** 7 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app typeform

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions typeform
npx zapier-sdk list-actions typeform --action-type write
npx zapier-sdk list-actions typeform --action-type read
npx zapier-sdk list-actions typeform --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action typeform <action-type> <action-key>
npx zapier-sdk list-action-input-fields typeform <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections typeform
npx zapier-sdk create-connection typeform   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices typeform <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create an empty Typeform form with a specified title.
npx zapier-sdk run-action typeform write create_form --connection <connection-id> \
  --inputs '{"title":"Customer Satisfaction Survey"}'

# Find form responses matching a specific query or within a given date range.
npx zapier-sdk run-action typeform search lookup_responses --connection <connection-id> \
  --inputs '{"since":"2024-05-01T00:00:00Z","until":"2024-06-01T00:00:00Z","query":"email:customer@example.com","complete":false}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-empty-form.ts`](./create-empty-form.ts) | Create an empty Typeform form with a specified title. |
| [`lookup-responses.ts`](./lookup-responses.ts) | Find form responses matching a specific query or within a given date range. |
