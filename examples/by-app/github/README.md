# GitHub — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 12 · Read 20 · Search 8 · **Total:** 40 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app github

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions github
npx zapier-sdk list-actions github --action-type write
npx zapier-sdk list-actions github --action-type read
npx zapier-sdk list-actions github --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action github <action-type> <action-key>
npx zapier-sdk list-action-input-fields github <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections github
npx zapier-sdk create-connection github   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices github <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new issue in a GitHub repository.
npx zapier-sdk run-action github write issue --connection <connection-id> \
  --inputs '{"title":"Fix authentication bug","body":"Users are unable to log in with Google accounts since the last release. Please investigate and resolve."}'

# Retrieve the contents of a file from a GitHub repository.
npx zapier-sdk run-action github search get_file_contents --connection <connection-id> \
  --inputs '{"path":"src/components/LoginForm.tsx"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-issue.ts`](./create-issue.ts) | Create a new issue in a GitHub repository. |
| [`get-file-contents.ts`](./get-file-contents.ts) | Retrieve the contents of a file from a GitHub repository. |
