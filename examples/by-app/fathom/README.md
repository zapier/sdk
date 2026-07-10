# Fathom — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 0 · Read 6 · Search 0 · **Total:** 6 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app fathom

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions fathom
npx zapier-sdk list-actions fathom --action-type write
npx zapier-sdk list-actions fathom --action-type read
npx zapier-sdk list-actions fathom --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action fathom <action-type> <action-key>
npx zapier-sdk list-action-input-fields fathom <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections fathom
npx zapier-sdk create-connection fathom   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices fathom <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Retrieve a meeting recording to access or share the audio or video file.
npx zapier-sdk run-action fathom read recording --connection <connection-id> \
  --inputs '{}'

# Retrieve the full transcript of a recorded meeting for review or documentation.
npx zapier-sdk run-action fathom read transcript --connection <connection-id> \
  --inputs '{}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`get-meeting-recording.ts`](./get-meeting-recording.ts) | Retrieve a meeting recording to access or share the audio or video file. |
| [`get-meeting-transcript.ts`](./get-meeting-transcript.ts) | Retrieve the full transcript of a recorded meeting for review or documentation. |
