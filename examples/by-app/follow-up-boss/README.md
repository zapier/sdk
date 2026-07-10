# FollowUpBoss — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 14 · Read 7 · Search 1 · **Total:** 22 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app follow-up-boss

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions follow-up-boss
npx zapier-sdk list-actions follow-up-boss --action-type write
npx zapier-sdk list-actions follow-up-boss --action-type read
npx zapier-sdk list-actions follow-up-boss --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action follow-up-boss <action-type> <action-key>
npx zapier-sdk list-action-input-fields follow-up-boss <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections follow-up-boss
npx zapier-sdk create-connection follow-up-boss   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices follow-up-boss <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new deal for a contact.
npx zapier-sdk run-action follow-up-boss write create_deal --connection <connection-id> \
  --inputs '{"person":"john.smith@example.com","name":"Home Purchase - Maple Ave","teamMembers":"jane.agent@example.com","description":"Residential home purchase for John Smith on Maple Ave.","projectedCloseDate":"2024-08-15"}'

# Find a contact by name or email address.
npx zapier-sdk run-action follow-up-boss search find_contact --connection <connection-id> \
  --inputs '{"person":"john.smith@example.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-deal.ts`](./create-deal.ts) | Create a new deal for a contact. |
| [`find-contact.ts`](./find-contact.ts) | Find a contact by name or email address. |
