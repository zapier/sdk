# WixAutomations — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 0 · Read 20 · Search 0 · **Total:** 20 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app wix

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions wix
npx zapier-sdk list-actions wix --action-type write
npx zapier-sdk list-actions wix --action-type read
npx zapier-sdk list-actions wix --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action wix <action-type> <action-key>
npx zapier-sdk list-action-input-fields wix <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections wix
npx zapier-sdk create-connection wix   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices wix <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Find a member by email address.
npx zapier-sdk run-action wix read k148C2287C669D849D153463C7486A694 --connection <connection-id> \
  --inputs '{"z_members_and_contacts_selected_trigger_type":"Find Member by Email"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`find-member-by-email.ts`](./find-member-by-email.ts) | Find a member by email address. |
