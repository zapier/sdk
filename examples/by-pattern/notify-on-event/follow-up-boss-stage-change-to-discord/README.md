# follow-up-boss-stage-change-to-discord

A Zapier durable workflow that posts a formatted message to Discord when a Follow Up Boss contact changes stage. Wire the Follow Up Boss webhook (or the FUB `people_stage_updated` trigger polling on a schedule) to this workflow's endpoint and the SDR channel gets the ping the moment a lead heats up.

## What it does

- **Trigger:** Follow Up Boss stage-change payload delivered to the workflow input (validated by Zod).
- **Routing:** stages whose name contains `hot` go to `DISCORD_HOT_LEADS_CHANNEL_ID`; everything else goes to `DISCORD_PIPELINE_CHANNEL_ID`.
- **Step 1: `post-stage-change-<contactId>`:** calls `DiscordCLIAPI.send_channel_message` with a formatted line. Per-contact step name means retries stay idempotent per contact.

## Parameters to edit before deploy

Constants at the top of `workflow.ts`:

| Constant | Purpose | How to determine the value |
|---|---|---|
| `DISCORD_CONNECTION` | Deploy-time alias for the Discord connection | `zapier-sdk list-connections` |
| `DISCORD_HOT_LEADS_CHANNEL_ID` | Discord channel snowflake id for hot-lead alerts | Enable Developer Mode in Discord, right-click the channel, "Copy Channel ID" |
| `DISCORD_PIPELINE_CHANNEL_ID` | Discord channel snowflake id for other stage changes | Same as above |

Stage-name-to-channel routing lives inside `workflow.ts`. Adjust the `.includes("hot")` check to match your Follow Up Boss stage vocabulary (e.g. `Nurture`, `Under Contract`, `Closed`).

## Discovery

```bash
# What actions does Discord expose?
zapier-sdk list-actions discord
zapier-sdk list-action-input-fields discord write send_channel_message

# What stage names exist in this Follow Up Boss account?
zapier-sdk list-actions follow-up-boss
zapier-sdk list-action-input-fields follow-up-boss read people_stage_updated
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

