# GoogleAds — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 8 · Read 2 · Search 3 · **Total:** 13 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app google-ads

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions google-ads
npx zapier-sdk list-actions google-ads --action-type write
npx zapier-sdk list-actions google-ads --action-type read
npx zapier-sdk list-actions google-ads --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action google-ads <action-type> <action-key>
npx zapier-sdk list-action-input-fields google-ads <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections google-ads
npx zapier-sdk create-connection google-ads   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices google-ads <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new customer list for targeted advertising.
npx zapier-sdk run-action google-ads write create_customer_list --connection <connection-id> \
  --inputs '{"name":"Holiday Shoppers 2024","description":"List of customers who purchased during the 2024 holiday season."}'

# Search for a customer list by name.
npx zapier-sdk run-action google-ads search find_customer_list --connection <connection-id> \
  --inputs '{"name":"Holiday Shoppers 2024"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-customer-list.ts`](./create-customer-list.ts) | Create a new customer list for targeted advertising. |
| [`find-customer-list.ts`](./find-customer-list.ts) | Search for a customer list by name. |
