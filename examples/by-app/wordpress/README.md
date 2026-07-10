# WordPress — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 5 · Read 6 · Search 2 · **Total:** 13 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app wordpress

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions wordpress
npx zapier-sdk list-actions wordpress --action-type write
npx zapier-sdk list-actions wordpress --action-type read
npx zapier-sdk list-actions wordpress --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action wordpress <action-type> <action-key>
npx zapier-sdk list-action-input-fields wordpress <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections wordpress
npx zapier-sdk create-connection wordpress   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices wordpress <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Upload an image with a caption to the WordPress media library.
npx zapier-sdk run-action wordpress write media --connection <connection-id> \
  --inputs '{"file":"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80","filename":"mountain-view.jpg","title":"Mountain View","caption":"A breathtaking view from the top of the mountain.","description":"Photo taken during a hiking trip in the Alps.","alt_text":"Mountain landscape with clouds","comment_status":"open","ping_status":"open"}'

# Find a post by its title.
npx zapier-sdk run-action wordpress search post --connection <connection-id> \
  --inputs '{"title":"How to Start a WordPress Blog"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`upload-media.ts`](./upload-media.ts) | Upload an image with a caption to the WordPress media library. |
| [`find-post.ts`](./find-post.ts) | Find a post by its title. |
