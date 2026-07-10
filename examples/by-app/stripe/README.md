# Stripe — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 12 · Read 16 · Search 8 · **Total:** 36 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app stripe

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions stripe
npx zapier-sdk list-actions stripe --action-type write
npx zapier-sdk list-actions stripe --action-type read
npx zapier-sdk list-actions stripe --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action stripe <action-type> <action-key>
npx zapier-sdk list-action-input-fields stripe <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections stripe
npx zapier-sdk create-connection stripe   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices stripe <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a payment intent for a specific amount and currency.
npx zapier-sdk run-action stripe write create_payment_intent --connection <connection-id> \
  --inputs '{"amount":5000,"currency":"usd","confirm":false,"error_on_requires_action":false,"off_session":false,"description":"Payment for Order #12345","receipt_email":"jane.doe@example.com","shipping_name":"Jane Doe","shipping_address_line1":"123 Main St","shipping_address_line2":"Apt 4B","capture_method":"automatic"}'

# Find a customer by name or email.
npx zapier-sdk run-action stripe search find_customer --connection <connection-id> \
  --inputs '{"selection":"email","query":"jane.doe@example.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-payment-intent.ts`](./create-payment-intent.ts) | Create a payment intent for a specific amount and currency. |
| [`find-customer.ts`](./find-customer.ts) | Find a customer by name or email. |
