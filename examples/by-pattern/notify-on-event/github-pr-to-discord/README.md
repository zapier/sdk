# github-pr-to-discord

A Zapier durable workflow that posts a formatted message to Discord when a GitHub pull request is opened. Point your GitHub webhook (or a repo App with `pull_request` event) at this workflow's endpoint and the review channel gets pinged automatically.

## What it does

- **Trigger:** GitHub `pull_request` payload delivered to the workflow input (validated by Zod).
- **Step 1: `post-to-discord`:** calls `DiscordCLIAPI.send_channel_message` with a link and formatted title. Uses `username: "GitHub"` so the webhook message renders under a `GitHub` alias in Discord. Idempotent per PR.

## Parameters to edit before deploy

Constants at the top of `workflow.ts`:

| Constant | Purpose | How to determine the value |
|---|---|---|
| `DISCORD_CONNECTION` | Deploy-time alias for the Discord connection | `zapier-sdk list-connections` |
| `DISCORD_CHANNEL_ID` | Discord channel snowflake id (numeric string) | Enable Developer Mode in Discord, right-click the channel, "Copy Channel ID" |

## Discovery

```bash
# What actions does Discord expose, and what's the exact key?
zapier-sdk list-actions discord

# What input fields does send_channel_message need on my connection?
zapier-sdk list-action-input-fields discord write send_channel_message
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

