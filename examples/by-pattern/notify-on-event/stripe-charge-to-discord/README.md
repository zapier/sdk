# stripe-charge-to-discord

A Zapier durable workflow that fetches a Stripe charge by id and posts a formatted revenue line to Discord. Hand this workflow a charge id (from your own `charge.succeeded` webhook handler, for example) and the team sees the sale land in the channel.

## What it does

- **Trigger:** a `{ chargeId }` object delivered to the workflow input (validated by Zod).
- **Step 1: `find-charge-<chargeId>`:** calls `StripeCLIAPI.find_charge` and returns the charge amount + customer email.
- **Step 2: `post-charge-<chargeId>`:** calls `DiscordCLIAPI.send_channel_message` with a formatted `:moneybag:` line. Per-charge step names keep retries idempotent.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `STRIPE_CONNECTION` | Deploy-time alias for the Stripe connection | `zapier-sdk list-connections` |
| `DISCORD_CONNECTION` | Deploy-time alias for the Discord connection | `zapier-sdk list-connections` |
| `DISCORD_CHANNEL_ID` | Discord channel snowflake id (numeric string) | Enable Developer Mode in Discord, then right-click the channel and "Copy Channel ID" |

## Discovery

```bash
zapier-sdk list-actions stripe
zapier-sdk list-action-input-fields stripe search find_charge

zapier-sdk list-actions discord
zapier-sdk list-action-input-fields discord write send_channel_message
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).
