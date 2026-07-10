# FacebookConversions — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 4 · Read 0 · Search 0 · **Total:** 4 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app facebook-conversions

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions facebook-conversions
npx zapier-sdk list-actions facebook-conversions --action-type write
npx zapier-sdk list-actions facebook-conversions --action-type read
npx zapier-sdk list-actions facebook-conversions --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action facebook-conversions <action-type> <action-key>
npx zapier-sdk list-action-input-fields facebook-conversions <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections facebook-conversions
npx zapier-sdk create-connection facebook-conversions   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices facebook-conversions <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send a purchase event with custom data to Facebook Conversions.
npx zapier-sdk run-action facebook-conversions write send_purchase_event --connection <connection-id> \
  --inputs '{"source_and_destination":"website|facebook","custom_data":"{\"currency\":\"USD\",\"value\":199.99,\"content_name\":\"Zapier Automation Course\",\"content_category\":\"Online Education\"}"}'

# Send a funnel event to track user progress in the sales funnel.
npx zapier-sdk run-action facebook-conversions write send_funnel_event --connection <connection-id> \
  --inputs '{"destination":"facebook","sales_info":"{\"stage\":\"Lead Qualified\",\"user_email\":\"user@example.com\"}"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`send-purchase-event.ts`](./send-purchase-event.ts) | Send a purchase event with custom data to Facebook Conversions. |
| [`send-funnel-event.ts`](./send-funnel-event.ts) | Send a funnel event to track user progress in the sales funnel. |
