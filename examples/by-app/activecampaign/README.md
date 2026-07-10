# ActiveCampaign — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 22 · Read 22 · Search 8 · **Total:** 52 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app activecampaign

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions activecampaign
npx zapier-sdk list-actions activecampaign --action-type write
npx zapier-sdk list-actions activecampaign --action-type read
npx zapier-sdk list-actions activecampaign --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action activecampaign <action-type> <action-key>
npx zapier-sdk list-action-input-fields activecampaign <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections activecampaign
npx zapier-sdk create-connection activecampaign   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices activecampaign <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create an account with a name and optional URL.
npx zapier-sdk run-action activecampaign write account_add --connection <connection-id> \
  --inputs '{"name":"Acme Corporation","account_url":"https://acme-corp.com"}'

# Find an account by name.
npx zapier-sdk run-action activecampaign search find_account --connection <connection-id> \
  --inputs '{"name":"Acme Corporation"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-account.ts`](./create-account.ts) | Create an account with a name and optional URL. |
| [`find-account.ts`](./find-account.ts) | Find an account by name. |
