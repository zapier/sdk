# support-ticket-with-context

A Zapier durable workflow that turns an Intercom conversation into a Zendesk ticket enriched with HubSpot lifecycle + Stripe billing context, then pings the support team on Discord. Every support ticket lands with the customer's HubSpot stage and Stripe record already attached, no manual lookups.

This is the canonical **aggregation** pattern. Three reads (Intercom + HubSpot + Stripe) merge into one richer write.

## What it does

- **Trigger:** a `{ conversationId }` object delivered to the workflow input (validated by Zod).
- **Step 1: `fetch-conversation-<conversationId>`:** `IntercomV2CLIAPI.retrieve_conversation`. Returns conversation body + user email.
- **Step 2: `fetch-hubspot-<conversationId>`:** `HubSpotCLIAPI.contactSearch`. Returns lifecycle stage, tier, name.
- **Step 3: `fetch-stripe-<conversationId>`:** `StripeCLIAPI.find_customer`. Returns customer-since, balance.
- **Step 4: `create-zendesk-ticket-<conversationId>`:** `ZendeskV2CLIAPI.ticket`. Ticket priority is derived from HubSpot lifecycle stage.
- **Step 5: `notify-discord-<conversationId>`:** `DiscordCLIAPI.send_channel_message`. Context-rich alert to the support channel.

Per-conversation step names keep retries idempotent.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `INTERCOM_CONNECTION`, `HUBSPOT_CONNECTION`, `STRIPE_CONNECTION`, `ZENDESK_CONNECTION`, `DISCORD_CONNECTION` | Deploy-time connection aliases | `zapier-sdk list-connections` |
| `DISCORD_CHANNEL_ID` | Support-escalations channel (numeric Discord snowflake id) | Enable Developer Mode in Discord, right-click the channel, "Copy Channel ID" |

The HubSpot search-property name is dynamic. Verify with `list-action-input-fields`. If your HubSpot account uses a custom identifier property, swap `first_search_property_name` accordingly.

## Discovery

```bash
zapier-sdk list-actions intercom
zapier-sdk list-actions hubspot
zapier-sdk list-action-input-fields hubspot search contactSearch

zapier-sdk list-actions stripe
zapier-sdk list-actions zendesk
zapier-sdk list-action-input-fields zendesk write ticket

zapier-sdk list-actions discord
zapier-sdk list-action-input-fields discord write send_channel_message
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).
