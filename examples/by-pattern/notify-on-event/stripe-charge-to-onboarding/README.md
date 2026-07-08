# stripe-charge-to-onboarding

A Zapier durable workflow that kicks off customer onboarding when a Stripe charge lands. One inbound event drives writes across HubSpot, Gmail, Notion, and Discord (the canonical **fan-out** pattern). Hand this workflow a charge id (from your `charge.succeeded` webhook handler) and every downstream system stays in lockstep, without manual handoffs.

## What it does

- **Trigger:** a `{ chargeId }` object delivered to the workflow input (validated by Zod).
- **Step 1: `find-charge-<chargeId>`:** `StripeCLIAPI.find_charge`. Returns charge amount, email, billing name.
- **Step 2: `upsert-hubspot-<chargeId>`:** `HubSpotCLIAPI.upsert_contact`. Contact record, lifecycle stage flipped to `customer`.
- **Step 3: `send-welcome-<chargeId>`:** `GoogleMailV2CLIAPI.message`. Welcome email.
- **Step 4: `create-notion-doc-<chargeId>`:** `NotionCLIAPI.create_database_item`. Onboarding tracker row.
- **Step 5: `notify-team-<chargeId>`:** `DiscordCLIAPI.send_channel_message`. Team ping so a CSM picks up.

Per-charge step names mean the same charge id cannot double-write on retry.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `STRIPE_CONNECTION`, `HUBSPOT_CONNECTION`, `GMAIL_CONNECTION`, `NOTION_CONNECTION`, `DISCORD_CONNECTION` | Deploy-time connection aliases | `zapier-sdk list-connections` |
| `NOTION_ONBOARDING_DB_ID` | The Notion database that tracks onboarding | Copy from the database URL, or `zapier-sdk list-action-input-fields notion write create_database_item` and inspect the `database_id` dropdown |
| `DISCORD_CHANNEL_ID` | Discord channel (snowflake id) for new-customer alerts | Enable Developer Mode in Discord, right-click the channel, "Copy Channel ID" |

## Discovery

```bash
zapier-sdk list-actions stripe
zapier-sdk list-actions hubspot
zapier-sdk list-action-input-fields hubspot write upsert_contact

zapier-sdk list-actions notion
zapier-sdk list-action-input-fields notion write create_database_item

zapier-sdk list-actions discord
zapier-sdk list-action-input-fields discord write send_channel_message
```

The HubSpot `upsert_contact` action accepts dynamic properties keyed by your account's property names. The Notion `properties` object depends on your database's schema. Verify both against your live connections.

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).
