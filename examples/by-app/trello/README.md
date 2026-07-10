# Trello — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 19 · Read 14 · Search 18 · **Total:** 51 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app trello

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions trello
npx zapier-sdk list-actions trello --action-type write
npx zapier-sdk list-actions trello --action-type read
npx zapier-sdk list-actions trello --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action trello <action-type> <action-key>
npx zapier-sdk list-action-input-fields trello <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections trello
npx zapier-sdk create-connection trello   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices trello <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a comment on a Trello card.
npx zapier-sdk run-action trello write comment --connection <connection-id> \
  --inputs '{"text":"Reviewed the Q2 roadmap and approved changes."}'

# Find a card using a custom search query.
npx zapier-sdk run-action trello search organization_card_custom_query --connection <connection-id> \
  --inputs '{"query":"label:Urgent list:'To Do' due:week","cards_limit":50}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-card-comment.ts`](./create-card-comment.ts) | Create a comment on a Trello card. |
| [`find-card-by-custom-query.ts`](./find-card-by-custom-query.ts) | Find a card using a custom search query. |
