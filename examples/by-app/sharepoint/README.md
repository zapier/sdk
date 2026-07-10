# MicrosoftSharePoint — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 18 · Read 8 · Search 10 · **Total:** 36 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app sharepoint

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions sharepoint
npx zapier-sdk list-actions sharepoint --action-type write
npx zapier-sdk list-actions sharepoint --action-type read
npx zapier-sdk list-actions sharepoint --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action sharepoint <action-type> <action-key>
npx zapier-sdk list-action-input-fields sharepoint <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections sharepoint
npx zapier-sdk create-connection sharepoint   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices sharepoint <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new text file with specified content in a SharePoint folder.
npx zapier-sdk run-action sharepoint write create_text_file --connection <connection-id> \
  --inputs '{"fileName":"Quarterly-Report-Q2-2024.txt","content":"Q2 revenue exceeded forecasts by 14%. See attached charts for details.","conflictBehavior":"replace"}'

# Search for a file or folder in SharePoint by keyword.
npx zapier-sdk run-action sharepoint search find_file_or_folder --connection <connection-id> \
  --inputs '{"searchType":"file","searchMode":"default","query":"Quarterly Report Q2 2024"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-text-file.ts`](./create-text-file.ts) | Create a new text file with specified content in a SharePoint folder. |
| [`find-file-or-folder.ts`](./find-file-or-folder.ts) | Search for a file or folder in SharePoint by keyword. |
