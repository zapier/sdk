# Webflow — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 6 · Read 5 · Search 2 · **Total:** 13 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app webflow

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions webflow
npx zapier-sdk list-actions webflow --action-type write
npx zapier-sdk list-actions webflow --action-type read
npx zapier-sdk list-actions webflow --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action webflow <action-type> <action-key>
npx zapier-sdk list-action-input-fields webflow <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections webflow
npx zapier-sdk create-connection webflow   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices webflow <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Mark an order as fulfilled and optionally send a fulfillment email.
npx zapier-sdk run-action webflow write fulfill_order --connection <connection-id> \
  --inputs '{"order_id":"ORD-102938","sendOrderFulfilledEmail":true}'

# Find an item by its name or slug.
npx zapier-sdk run-action webflow search find_item --connection <connection-id> \
  --inputs '{"name":"Spring Collection T-Shirt","slug":"spring-collection-tshirt"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`fulfill-order.ts`](./fulfill-order.ts) | Mark an order as fulfilled and optionally send a fulfillment email. |
| [`find-item.ts`](./find-item.ts) | Find an item by its name or slug. |
