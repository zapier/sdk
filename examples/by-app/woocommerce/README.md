# WooCommerce — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 16 · Read 11 · Search 9 · **Total:** 36 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app woocommerce

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions woocommerce
npx zapier-sdk list-actions woocommerce --action-type write
npx zapier-sdk list-actions woocommerce --action-type read
npx zapier-sdk list-actions woocommerce --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action woocommerce <action-type> <action-key>
npx zapier-sdk list-action-input-fields woocommerce <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections woocommerce
npx zapier-sdk create-connection woocommerce   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices woocommerce <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new WooCommerce order with customer details and products.
npx zapier-sdk run-action woocommerce write orderCreate --connection <connection-id> \
  --inputs '{}'

# Find an order by searching with customer email or order number.
npx zapier-sdk run-action woocommerce search orderSearch --connection <connection-id> \
  --inputs '{}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-order.ts`](./create-order.ts) | Create a new WooCommerce order with customer details and products. |
| [`find-order.ts`](./find-order.ts) | Find an order by searching with customer email or order number. |
