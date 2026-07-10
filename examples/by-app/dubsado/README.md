# Dubsado — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 1 · Read 5 · Search 0 · **Total:** 6 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app dubsado

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions dubsado
npx zapier-sdk list-actions dubsado --action-type write
npx zapier-sdk list-actions dubsado --action-type read
npx zapier-sdk list-actions dubsado --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action dubsado <action-type> <action-key>
npx zapier-sdk list-action-input-fields dubsado <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections dubsado
npx zapier-sdk create-connection dubsado   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices dubsado <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new project for a client.
npx zapier-sdk run-action dubsado write create_project --connection <connection-id> \
  --inputs '{"projectLocation__name":"Acme Corp HQ","projectLocation__line1":"123 Main St","projectLocation__city":"San Francisco","projectLocation__state":"CA","title":"Brand Refresh for Acme Corp","client__email":"jane.doe@acmecorp.com"}'

# Create a new project for a client at a specific location.
npx zapier-sdk run-action dubsado write create_project --connection <connection-id> \
  --inputs '{"projectLocation__name":"WebCo Main Office","projectLocation__line1":"456 Oak Ave","projectLocation__line2":"Suite 200","projectLocation__city":"Los Angeles","projectLocation__state":"CA","title":"Website Redesign","client__email":"john.smith@webco.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-project.ts`](./create-project.ts) | Create a new project for a client. |
| [`create-project-with-location.ts`](./create-project-with-location.ts) | Create a new project for a client at a specific location. |
