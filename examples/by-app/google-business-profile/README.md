# GoogleMyBusiness — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 2 · Read 1 · Search 0 · **Total:** 3 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app google-business-profile

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions google-business-profile
npx zapier-sdk list-actions google-business-profile --action-type write
npx zapier-sdk list-actions google-business-profile --action-type read
npx zapier-sdk list-actions google-business-profile --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action google-business-profile <action-type> <action-key>
npx zapier-sdk list-action-input-fields google-business-profile <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections google-business-profile
npx zapier-sdk create-connection google-business-profile   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices google-business-profile <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new post on a Google Business Profile with a summary and topic type.
npx zapier-sdk run-action google-business-profile write create_post --connection <connection-id> \
  --inputs '{"post_summary":"We're excited to announce our new weekend brunch hours!","topic_type":"EVENT"}'

# Reply to a customer review on a Google Business Profile.
npx zapier-sdk run-action google-business-profile write create_reply --connection <connection-id> \
  --inputs '{"review_name":"John Doe","reply":"Thank you for your kind words, John! We look forward to serving you again soon."}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-post.ts`](./create-post.ts) | Create a new post on a Google Business Profile with a summary and topic type. |
| [`create-reply.ts`](./create-reply.ts) | Reply to a customer review on a Google Business Profile. |
