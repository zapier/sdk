# CloseIO — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 45 · Read 25 · Search 14 · **Total:** 84 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app close

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions close
npx zapier-sdk list-actions close --action-type write
npx zapier-sdk list-actions close --action-type read
npx zapier-sdk list-actions close --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action close <action-type> <action-key>
npx zapier-sdk list-action-input-fields close <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections close
npx zapier-sdk create-connection close   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices close <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send a WhatsApp message to a contact.
npx zapier-sdk run-action close write create_whatsapp_message --connection <connection-id> \
  --inputs '{"contact_id":"12345","direction":"outgoing","message_markdown":"Hello, this is your appointment reminder for 3pm today!","local_phone":"+14155551234","remote_phone":"+14155559876","external_whatsapp_message_id":"msg-20240612-001","integration_link":"https://crm.example.com/lead/12345","activity_at":"2024-06-12T14:30:00Z","send_to_inbox":false}'

# Find WhatsApp messages matching specific criteria.
npx zapier-sdk run-action close search search_whatsapp_messages --connection <connection-id> \
  --inputs '{"result_limit":5,"search_direction":"incoming","search_text":"appointment reminder","search_local_phone":"+14155551234","search_remote_phone":"+14155559876"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-whatsapp-message.ts`](./create-whatsapp-message.ts) | Send a WhatsApp message to a contact. |
| [`search-whatsapp-messages.ts`](./search-whatsapp-messages.ts) | Find WhatsApp messages matching specific criteria. |
