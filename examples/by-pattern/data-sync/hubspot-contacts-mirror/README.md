# hubspot-contacts-mirror

A Zapier durable workflow that mirrors HubSpot contacts into a Notion database on a schedule. Sales-ops gets Notion as the working surface for contact research while HubSpot stays the source of truth.

HubSpot's bulk-read action (`get_all_contacts`) is marked hidden in the Zapier catalog and is not part of the stable public surface. The public non-hidden read actions are all triggers (`created_or_updated_crm_contact`, `contactList`) that fire per event, not bulk. Since a scheduled "mirror all contacts" needs bulk read, this workflow uses `sdk.fetch` against HubSpot's REST API directly. Same Zapier auth and audit trail, but bypasses the action catalog when no stable first-class action fits.

## What it does

- **Trigger:** Zapier's **Schedule** app (Every Day / Every Hour, your choice). Trigger delivers `{ triggered_at }`.
- **Step 1 — `fetch-contacts-<runId>`:** raw HTTPS `sdk.fetch` to `api.hubapi.com/crm/v3/objects/contacts`, paged 100 at a time.
- **Step 2..N — `upsert-notion-<contactId>`:** one `NotionCLIAPI.create_database_item` call per contact. Per-contact step names mean the same contact cannot double-upsert on retry within a run.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `HUBSPOT_CONNECTION`, `NOTION_CONNECTION` | Deploy-time connection aliases | `zapier-sdk list-connections` |
| `NOTION_DB_ID` | Notion database that holds the mirrored contacts | Copy from the database URL, or `zapier-sdk get-action-input-fields notion write create_database_item` |

The Notion database needs columns matching the properties the workflow sets: `Name` (Title), `Email` (Email), `Company` (Text). Adjust the `properties` block if your schema differs.

## Discovery

```bash
zapier-sdk list-actions schedule
zapier-sdk get-action-input-fields schedule read every_day

zapier-sdk list-actions notion
zapier-sdk get-action-input-fields notion write create_database_item
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

Wire Zapier's Schedule → Every Day trigger to this workflow's endpoint. The scheduled invocation payload passes through as the workflow input.
