# InstagramBusiness — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 2 · Read 2 · Search 0 · **Total:** 4 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app instagram-for-business

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions instagram-for-business
npx zapier-sdk list-actions instagram-for-business --action-type write
npx zapier-sdk list-actions instagram-for-business --action-type read
npx zapier-sdk list-actions instagram-for-business --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action instagram-for-business <action-type> <action-key>
npx zapier-sdk list-action-input-fields instagram-for-business <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections instagram-for-business
npx zapier-sdk create-connection instagram-for-business   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices instagram-for-business <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Publish a video to your Instagram for Business account.
npx zapier-sdk run-action instagram-for-business write publish_video --connection <connection-id> \
  --inputs '{"video":"https://example.com/videos/launch-announcement.mp4","caption":"Launching our new product today! #launchday","location":"New York, NY"}'

# Get notified when new media is posted to your Instagram for Business account.
npx zapier-sdk run-action instagram-for-business read new_media --connection <connection-id> \
  --inputs '{}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`publish-video.ts`](./publish-video.ts) | Publish a video to your Instagram for Business account. |
| [`new-media-posted.ts`](./new-media-posted.ts) | Get notified when new media is posted to your Instagram for Business account. |
