# hubspot-contacts-to-zapier-table

A Zapier durable workflow that mirrors HubSpot contacts into a Zapier Table on a schedule. Gives the data team a queryable contact feed without them having to build a HubSpot connector. The Table becomes the integration boundary.

HubSpot's bulk-read action (`get_all_contacts`) is marked hidden in the Zapier catalog and is not part of the stable public surface. Since a scheduled "mirror all contacts" needs bulk read, this workflow uses `sdk.fetch` against HubSpot's REST API directly. Same Zapier auth and audit trail, but bypasses the action catalog when no stable first-class action fits (matches the sibling `hubspot-contacts-mirror` workflow).

## What it does

- **Trigger:** Zapier's **Schedule** app (Every Day / Every Hour). Trigger delivers `{ triggered_at }`.
- **Step 1: `resolve-destination-table`:** finds `hubspot-contacts-mirror` in Zapier Tables, or creates it with the six expected columns.
- **Step 2: `fetch-contacts-<runId>`:** raw HTTPS `sdk.fetch` to `api.hubapi.com/crm/v3/objects/contacts`, requesting the properties we mirror.
- **Step 3: `write-table-<runId>`:** `createTableRecords` writes every row in one call. `keyMode: "names"` addresses fields by their declared name (`contact_id`, `email`, `first_name`, `last_name`, `company`, `created_at`).

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `HUBSPOT_CONNECTION` | Deploy-time alias for the HubSpot connection | `zapier-sdk list-connections` |
| `DESTINATION_TABLE_NAME` | Name of the target Zapier Table | Edit inline (the workflow creates the table if it doesn't exist) |

The output shape assumes the standard HubSpot contact properties (`email`, `firstname`, `lastname`, `company`, `createdate`) surfaced under `properties` on each contact record. If your account uses additional custom properties, extend the schema and the record mapper together, and add them to the `properties` list on the fetch step.

## Discovery

```bash
zapier-sdk list-tables

zapier-sdk list-actions schedule
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

Wire Zapier's Schedule (Every Day or Every Hour) trigger to this workflow's endpoint. The scheduled invocation payload passes through as the workflow input.
