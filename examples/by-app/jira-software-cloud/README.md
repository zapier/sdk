# JiraSoftwareCloud — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 11 · Read 4 · Search 10 · **Total:** 25 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app jira-software-cloud

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions jira-software-cloud
npx zapier-sdk list-actions jira-software-cloud --action-type write
npx zapier-sdk list-actions jira-software-cloud --action-type read
npx zapier-sdk list-actions jira-software-cloud --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action jira-software-cloud <action-type> <action-key>
npx zapier-sdk list-action-input-fields jira-software-cloud <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections jira-software-cloud
npx zapier-sdk create-connection jira-software-cloud   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices jira-software-cloud <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Add a comment to a Jira issue.
npx zapier-sdk run-action jira-software-cloud write add_comment --connection <connection-id> \
  --inputs '{"comment":"This bug needs urgent attention. Please review ASAP!"}'

# Find issues in Jira using a JQL query.
npx zapier-sdk run-action jira-software-cloud search issue_jql --connection <connection-id> \
  --inputs '{"jql":"project = DEMO AND status = 'To Do' AND assignee = currentUser()","maxResults":50}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`add-comment-to-issue.ts`](./add-comment-to-issue.ts) | Add a comment to a Jira issue. |
| [`find-issues-via-jql.ts`](./find-issues-via-jql.ts) | Find issues in Jira using a JQL query. |
