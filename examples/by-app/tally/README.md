# Tally — Zapier SDK

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
npx zapier-sdk get-app tally

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions tally
npx zapier-sdk list-actions tally --action-type write
npx zapier-sdk list-actions tally --action-type read
npx zapier-sdk list-actions tally --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action tally <action-type> <action-key>
npx zapier-sdk list-action-input-fields tally <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections tally
npx zapier-sdk create-connection tally   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices tally <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Retrieve a new submission from a Tally form.
npx zapier-sdk run-action tally read response --connection <connection-id> \
  --inputs '{}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`get-new-submission.ts`](./get-new-submission.ts) | Retrieve a new submission from a Tally form. |
