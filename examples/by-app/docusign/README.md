# Docusign — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 32 · Read 41 · Search 8 · **Total:** 81 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app docusign

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions docusign
npx zapier-sdk list-actions docusign --action-type write
npx zapier-sdk list-actions docusign --action-type read
npx zapier-sdk list-actions docusign --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action docusign <action-type> <action-key>
npx zapier-sdk list-action-input-fields docusign <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections docusign
npx zapier-sdk create-connection docusign   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices docusign <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a reusable template from an uploaded document.
npx zapier-sdk run-action docusign write create_template_from_document --connection <connection-id> \
  --inputs '{"templateName":"NDA Template","templateDescription":"Standard NDA for contractors","emailSubject":"Please sign the NDA","emailBlurb":"Hi, please review and sign the attached NDA document."}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-template-from-document.ts`](./create-template-from-document.ts) | Create a reusable template from an uploaded document. |
