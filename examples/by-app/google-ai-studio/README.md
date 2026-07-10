# GoogleMakerSuite — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 9 · Read 0 · Search 0 · **Total:** 9 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app google-ai-studio

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions google-ai-studio
npx zapier-sdk list-actions google-ai-studio --action-type write
npx zapier-sdk list-actions google-ai-studio --action-type read
npx zapier-sdk list-actions google-ai-studio --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action google-ai-studio <action-type> <action-key>
npx zapier-sdk list-action-input-fields google-ai-studio <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections google-ai-studio
npx zapier-sdk create-connection google-ai-studio   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices google-ai-studio <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Generate an image based on a text prompt.
npx zapier-sdk run-action google-ai-studio write generate_image --connection <connection-id> \
  --inputs '{"apiVersion":"v1beta","model":"gemini-2.5-flash-image-preview","prompt":"A futuristic city skyline at sunset, with flying cars and neon lights."}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`generate-image.ts`](./generate-image.ts) | Generate an image based on a text prompt. |
