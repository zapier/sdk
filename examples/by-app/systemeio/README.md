# SystemeIo — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 6 · Read 5 · Search 0 · **Total:** 11 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app systemeio

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions systemeio
npx zapier-sdk list-actions systemeio --action-type write
npx zapier-sdk list-actions systemeio --action-type read
npx zapier-sdk list-actions systemeio --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action systemeio <action-type> <action-key>
npx zapier-sdk list-action-input-fields systemeio <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections systemeio
npx zapier-sdk create-connection systemeio   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices systemeio <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Grant a contact access to a specific course.
npx zapier-sdk run-action systemeio write grantAccessToCourse --connection <connection-id> \
  --inputs '{"access_type":"full"}'

# Trigger when a new sale occurs in your system.
npx zapier-sdk run-action systemeio read new_sale_trigger --connection <connection-id> \
  --inputs '{}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`grant-access-to-course.ts`](./grant-access-to-course.ts) | Grant a contact access to a specific course. |
| [`new-sale-trigger.ts`](./new-sale-trigger.ts) | Trigger when a new sale occurs in your system. |
