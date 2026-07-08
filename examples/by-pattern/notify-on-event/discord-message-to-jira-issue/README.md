# discord-message-to-jira-issue

A Zapier durable workflow that turns a Discord message payload into a Jira issue in a target project. Wire your Discord bot / slash command handler to this workflow's endpoint and the first line of the message becomes the ticket summary; the rest becomes the description.

## What it does

- **Trigger:** Discord message payload (`{ content, user_id, channel_id }`) delivered to the workflow input (validated by Zod).
- **Step 1: `create-jira-issue`:** calls `JiraSoftwareCloudCLIAPI.create_issue` with the parsed summary and description. Idempotent per invocation.

## Parameters to edit before deploy

Constants at the top of `workflow.ts`:

| Constant | Purpose | How to determine the value |
|---|---|---|
| `JIRA_CONNECTION` | Deploy-time alias for the Jira connection | `zapier-sdk list-connections` |
| `JIRA_PROJECT_KEY` | The Jira project key (e.g. `ENG`, `SUP`) | Read from Jira URL, or `zapier-sdk list-action-input-fields jira-software-cloud write create_issue` and inspect the `project` dropdown |
| `JIRA_ISSUE_TYPE` | The Jira issue type name (e.g. `Bug`, `Task`) | Depends on the project schema. Same `list-action-input-fields` call as above, `issuetype` field |

## Discovery

```bash
# What actions does Jira expose, and what's the exact key?
zapier-sdk list-actions jira-software-cloud

# What input fields does create_issue need on my connection?
zapier-sdk list-action-input-fields jira-software-cloud write create_issue
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

