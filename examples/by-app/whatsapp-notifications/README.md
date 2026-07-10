# WhatsAppNotifications — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 1 · Read 0 · Search 0 · **Total:** 1 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app whatsapp-notifications

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions whatsapp-notifications
npx zapier-sdk list-actions whatsapp-notifications --action-type write
npx zapier-sdk list-actions whatsapp-notifications --action-type read
npx zapier-sdk list-actions whatsapp-notifications --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action whatsapp-notifications <action-type> <action-key>
npx zapier-sdk list-action-input-fields whatsapp-notifications <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections whatsapp-notifications
npx zapier-sdk create-connection whatsapp-notifications   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices whatsapp-notifications <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send a WhatsApp message using a specific template.
npx zapier-sdk run-action whatsapp-notifications write send_message --connection <connection-id> \
  --inputs '{"template":"order_confirmation"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`send-message.ts`](./send-message.ts) | Send a WhatsApp message using a specific template. |
