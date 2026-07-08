# route-form-lead-by-region

A Zapier durable workflow that DMs the right rep on Discord when an inbound form lead comes in, based on the lead's region. Uses a Zapier Table as the source of truth for the rep roster. Swap regions or reassign reps by editing rows in the Table, no code redeploy.

## What it does

- **Trigger:** a `{ leadId, email, company, region }` object delivered to the workflow input (validated by Zod).
- **Step 1: `lookup-rep-<leadId>`:** `listTableRecords` filters the rep roster by region and returns the mapped `discord_user_id`.
- **Step 2: `dm-rep-<leadId>`:** `DiscordCLIAPI.send_direct_message` pings the rep with the lead's email and company.

Per-lead step names keep retries idempotent.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `DISCORD_CONNECTION` | Deploy-time alias for the Discord connection | `zapier-sdk list-connections` |
| `REP_ROSTER_TABLE_ID` | Zapier Tables id for the rep roster | `zapier-sdk list-tables` |

The rep roster Table needs two columns: `region` (string, matches the enum in the input schema) and `discord_user_id` (string, the Discord user snowflake id).

## Discovery

```bash
zapier-sdk list-tables
zapier-sdk list-actions discord
zapier-sdk list-action-input-fields discord write send_direct_message
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).
