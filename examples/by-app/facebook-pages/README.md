# Facebook — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 5 · Read 5 · Search 0 · **Total:** 10 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app facebook-pages

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions facebook-pages
npx zapier-sdk list-actions facebook-pages --action-type write
npx zapier-sdk list-actions facebook-pages --action-type read
npx zapier-sdk list-actions facebook-pages --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action facebook-pages <action-type> <action-key>
npx zapier-sdk list-action-input-fields facebook-pages <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections facebook-pages
npx zapier-sdk create-connection facebook-pages   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices facebook-pages <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new post on a Facebook Page's timeline.
npx zapier-sdk run-action facebook-pages write page_stream --connection <connection-id> \
  --inputs '{"message":"Grand opening this Saturday! Join us for free coffee and prizes.","link_url":"https://acmecoffee.com/grand-opening"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-page-post.ts`](./create-page-post.ts) | Create a new post on a Facebook Page's timeline. |
