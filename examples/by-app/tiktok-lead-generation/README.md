# TikTokLeadGeneration — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 0 · Read 1 · Search 0 · **Total:** 1 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app tiktok-lead-generation

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions tiktok-lead-generation
npx zapier-sdk list-actions tiktok-lead-generation --action-type write
npx zapier-sdk list-actions tiktok-lead-generation --action-type read
npx zapier-sdk list-actions tiktok-lead-generation --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action tiktok-lead-generation <action-type> <action-key>
npx zapier-sdk list-action-input-fields tiktok-lead-generation <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections tiktok-lead-generation
npx zapier-sdk create-connection tiktok-lead-generation   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices tiktok-lead-generation <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Fetch new leads from a specified TikTok lead source.
npx zapier-sdk run-action tiktok-lead-generation read new_leads_integration --connection <connection-id> \
  --inputs '{"lead_source":"TikTok Lead Form - Summer Campaign"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`fetch-new-leads.ts`](./fetch-new-leads.ts) | Fetch new leads from a specified TikTok lead source. |
