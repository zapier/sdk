# Granola — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 0 · Read 2 · Search 0 · **Total:** 2 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app granola

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions granola
npx zapier-sdk list-actions granola --action-type write
npx zapier-sdk list-actions granola --action-type read
npx zapier-sdk list-actions granola --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action granola <action-type> <action-key>
npx zapier-sdk list-action-input-fields granola <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections granola
npx zapier-sdk create-connection granola   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices granola <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Trigger when a note is added to a Granola folder.
npx zapier-sdk run-action granola read new_meeting --connection <connection-id> \
  --inputs '{"name":"Product Roadmap","visibility":"private"}'

# Trigger when a note is shared to Zapier from Granola.
npx zapier-sdk run-action granola read new_meeting_note_shared --connection <connection-id> \
  --inputs '{"name":"Team Meeting Notes","visibility":"public"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`note-added-to-granola-folder.ts`](./note-added-to-granola-folder.ts) | Trigger when a note is added to a Granola folder. |
| [`note-shared-to-zapier.ts`](./note-shared-to-zapier.ts) | Trigger when a note is shared to Zapier from Granola. |
