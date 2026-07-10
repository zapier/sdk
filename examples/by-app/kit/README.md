# ConvertKit — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 5 · Read 7 · Search 1 · **Total:** 13 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app kit

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions kit
npx zapier-sdk list-actions kit --action-type write
npx zapier-sdk list-actions kit --action-type read
npx zapier-sdk list-actions kit --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action kit <action-type> <action-key>
npx zapier-sdk list-action-input-fields kit <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections kit
npx zapier-sdk create-connection kit   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices kit <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Add a subscriber to a form.
npx zapier-sdk run-action kit write formCreate --connection <connection-id> \
  --inputs '{"email":"jane.doe@example.com","name":"Jane Doe","course_opted":true,"subscriber_state":"active"}'

# Find a subscriber by email address.
npx zapier-sdk run-action kit search subscriberSearch --connection <connection-id> \
  --inputs '{"emailAddress":"jane.doe@example.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`add-subscriber-to-form.ts`](./add-subscriber-to-form.ts) | Add a subscriber to a form. |
| [`find-subscriber.ts`](./find-subscriber.ts) | Find a subscriber by email address. |
