# Notion — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 12 · Read 6 · Search 11 · **Total:** 29 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app notion

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions notion
npx zapier-sdk list-actions notion --action-type write
npx zapier-sdk list-actions notion --action-type read
npx zapier-sdk list-actions notion --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action notion <action-type> <action-key>
npx zapier-sdk list-action-input-fields notion <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections notion
npx zapier-sdk create-connection notion   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices notion <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new Notion page with a title, content, icon, and cover image.
npx zapier-sdk run-action notion write create_page --connection <connection-id> \
  --inputs '{"title":"Q2 Planning","content":"## Goals\n- Increase revenue by 20%\n- Launch new product line","icon":"📄","cover":"https://images.unsplash.com/photo-1506744038136-46273834b3fb"}'

# Find a Notion page by its exact title.
npx zapier-sdk run-action notion search page_by_title --connection <connection-id> \
  --inputs '{"title":"Q2 Planning","exact_match":true}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-page.ts`](./create-page.ts) | Create a new Notion page with a title, content, icon, and cover image. |
| [`find-page-by-title.ts`](./find-page-by-title.ts) | Find a Notion page by its exact title. |
