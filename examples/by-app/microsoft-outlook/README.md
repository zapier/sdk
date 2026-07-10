# MicrosoftOutlook — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 23 · Read 12 · Search 7 · **Total:** 42 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app microsoft-outlook

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions microsoft-outlook
npx zapier-sdk list-actions microsoft-outlook --action-type write
npx zapier-sdk list-actions microsoft-outlook --action-type read
npx zapier-sdk list-actions microsoft-outlook --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action microsoft-outlook <action-type> <action-key>
npx zapier-sdk list-action-input-fields microsoft-outlook <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections microsoft-outlook
npx zapier-sdk create-connection microsoft-outlook   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices microsoft-outlook <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Send an email to one or more recipients with a specific subject and message.
npx zapier-sdk run-action microsoft-outlook write send_email --connection <connection-id> \
  --inputs '{"recipients":"bob@example.com, alice@example.com","subject":"Quarterly Report Submission","bodyFormat":"HTML","body":"<p>Hi team,<br>Please find attached the Q2 report.<br>Best,<br>John</p>","skipLargeFiles":"skip"}'

# Find emails matching a specific search query.
npx zapier-sdk run-action microsoft-outlook search find_email --connection <connection-id> \
  --inputs '{"searchValue":"from:ceo@company.com subject:Strategy Meeting"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`send-email.ts`](./send-email.ts) | Send an email to one or more recipients with a specific subject and message. |
| [`find-email.ts`](./find-email.ts) | Find emails matching a specific search query. |
