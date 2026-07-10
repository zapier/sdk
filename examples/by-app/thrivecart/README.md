# ThriveCart — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 0 · Read 18 · Search 0 · **Total:** 18 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app thrivecart

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions thrivecart
npx zapier-sdk list-actions thrivecart --action-type write
npx zapier-sdk list-actions thrivecart --action-type read
npx zapier-sdk list-actions thrivecart --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action thrivecart <action-type> <action-key>
npx zapier-sdk list-action-input-fields thrivecart <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections thrivecart
npx zapier-sdk create-connection thrivecart   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices thrivecart <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Retrieve details about a completed product purchase.
npx zapier-sdk run-action thrivecart read order_payment_product --connection <connection-id> \
  --inputs '{"customer__checkbox_confirmation":false,"mode_int":1}'

# Retrieve information about a cancelled recurring payment subscription.
npx zapier-sdk run-action thrivecart read order_rebill_cancelled --connection <connection-id> \
  --inputs '{"subscription__type":"monthly","mode_int":1}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`get-product-purchase.ts`](./get-product-purchase.ts) | Retrieve details about a completed product purchase. |
| [`get-recurring-payments-cancelled.ts`](./get-recurring-payments-cancelled.ts) | Retrieve information about a cancelled recurring payment subscription. |
