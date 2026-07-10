# YouTube — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 3 · Read 5 · Search 2 · **Total:** 10 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app youtube

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions youtube
npx zapier-sdk list-actions youtube --action-type write
npx zapier-sdk list-actions youtube --action-type read
npx zapier-sdk list-actions youtube --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action youtube <action-type> <action-key>
npx zapier-sdk list-action-input-fields youtube <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections youtube
npx zapier-sdk create-connection youtube   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices youtube <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Upload a new video to YouTube.
npx zapier-sdk run-action youtube write upload_video --connection <connection-id> \
  --inputs '{"title":"How to Make Sourdough Bread","description":"A step-by-step guide to making sourdough bread at home.","video":"/files/videos/sourdough-bread.mp4","thumbnail":"/files/images/sourdough-thumbnail.jpg","privacy_status":"public","publish_at":"2024-07-10T15:00:00Z","default_language":"en","default_audio_language":"en","license":"youtube","embeddable":true,"public_stats_viewable":true,"made_for_kids":false,"notify_subscribers":true}'

# Search for a video matching a specific query.
npx zapier-sdk run-action youtube search find_video --connection <connection-id> \
  --inputs '{"query":"sourdough bread recipe","order":"relevance","published_after":"2024-01-01T00:00:00Z","published_before":"2024-06-01T00:00:00Z","video_duration":"any","video_definition":"any","video_dimension":"any","video_caption":"any","video_license":"any","safe_search":"moderate","max_results":25}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`upload-video.ts`](./upload-video.ts) | Upload a new video to YouTube. |
| [`find-video.ts`](./find-video.ts) | Search for a video matching a specific query. |
