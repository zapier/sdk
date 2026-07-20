# eventbrite-to-google-sheets

A Zapier durable workflow that appends every new Eventbrite attendee as a row in a Google Sheet. Eventbrite doesn't crack the top 10 for most verticals, but it's a distinctive top-5 pattern for non-profits — fundraisers and galas run their registration through it more than any other vertical.

## What it does

- **Trigger:** a `{ attendeeId, eventName, name, email, ticketClass }` object delivered to the workflow input (validated by Zod).
- **Step 1: `append-row-<attendeeId>`:** `GoogleSheetsV2CLIAPI.add_row`. Per-attendee step name keeps retries idempotent.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `GOOGLE_SHEETS_CONNECTION` | Deploy-time alias for the Google Sheets connection | `zapier-sdk list-connections` |
| `SPREADSHEET` | Target spreadsheet name or id | `zapier-sdk list-action-input-field-choices google-sheets write add_row spreadsheet` |
| `WORKSHEET` | Target worksheet/tab name | `zapier-sdk list-action-input-field-choices google-sheets write add_row worksheet` (depends on `SPREADSHEET`) |

The row column names (`"Name"`, `"Email"`, ...) are `// dynamic` — they must match your worksheet's header row exactly.

## Discovery

```bash
zapier-sdk list-actions google-sheets --action-type write
zapier-sdk list-action-input-fields google-sheets write add_row

zapier-sdk list-actions eventbrite
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

Wire Eventbrite's `new_attendee_hook` ("New Attendee Registered") trigger to this workflow's endpoint. The attendee payload passes through as the workflow input.
