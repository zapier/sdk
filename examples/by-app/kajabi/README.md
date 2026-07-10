# Kajabi — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 3 · Read 7 · Search 0 · **Total:** 10 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app kajabi

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions kajabi
npx zapier-sdk list-actions kajabi --action-type write
npx zapier-sdk list-actions kajabi --action-type read
npx zapier-sdk list-actions kajabi --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action kajabi <action-type> <action-key>
npx zapier-sdk list-action-input-fields kajabi <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections kajabi
npx zapier-sdk create-connection kajabi   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices kajabi <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Grant access to an offer for a user.
npx zapier-sdk run-action kajabi write activate_offer --connection <connection-id> \
  --inputs '{"name":"Email Marketing Bootcamp","email":"jane.doe@gmail.com","external_user_id":"user_12345","send_offer_grant_email":true}'

# Revoke access to an offer for a user.
npx zapier-sdk run-action kajabi write deactivate_offer --connection <connection-id> \
  --inputs '{"external_user_id":"user_12345"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`grant-access-to-offer.ts`](./grant-access-to-offer.ts) | Grant access to an offer for a user. |
| [`revoke-access-to-offer.ts`](./revoke-access-to-offer.ts) | Revoke access to an offer for a user. |
