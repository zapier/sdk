# JotForm — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 3 · Read 2 · Search 0 · **Total:** 5 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app jotform

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions jotform
npx zapier-sdk list-actions jotform --action-type write
npx zapier-sdk list-actions jotform --action-type read
npx zapier-sdk list-actions jotform --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action jotform <action-type> <action-key>
npx zapier-sdk list-action-input-fields jotform <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections jotform
npx zapier-sdk create-connection jotform   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices jotform <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Assign a Jotform form to a user by email with an optional message.
npx zapier-sdk run-action jotform write assign_form --connection <connection-id> \
  --inputs '{"email":"jane.doe@example.com","message":"Please complete this survey by Friday.","permission":"submit"}'

# Assign a prefilled Jotform form to a user by email with an optional message.
npx zapier-sdk run-action jotform write assign_prefilled_form --connection <connection-id> \
  --inputs '{"email":"john.smith@example.com","message":"Here is your personalized onboarding form.","fieldBehaviour":"readonly"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`assign-form.ts`](./assign-form.ts) | Assign a Jotform form to a user by email with an optional message. |
| [`assign-prefilled-form.ts`](./assign-prefilled-form.ts) | Assign a prefilled Jotform form to a user by email with an optional message. |
