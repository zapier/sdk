# google-sheets-row-to-gmail

A Zapier durable workflow that sends a Gmail notification whenever a new row lands in a Google Sheet. Inverts the sheet-as-log pattern (`facebook-lead-ads-to-google-sheets`, `typeform-to-google-sheets`) into a sheet-as-trigger pattern — useful for lightweight CRMs or trackers built entirely on a spreadsheet, where a human still needs a nudge outside the sheet.

## What it does

- **Trigger:** a `{ rowId, recipientEmail, rowSummary }` object delivered to the workflow input (validated by Zod). `rowSummary` is a pre-formatted digest of the row's columns.
- **Step 1: `send-notification-<rowId>`:** `GmailCLIAPI.message` sends the digest to the recipient. Per-row step name keeps retries idempotent.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `GMAIL_CONNECTION` | Deploy-time alias for the Gmail connection | `zapier-sdk list-connections` |
| `EMAIL_SUBJECT` | Subject line | Edit inline |

## Discovery

```bash
zapier-sdk list-actions gmail
zapier-sdk list-action-input-fields gmail write message

zapier-sdk list-actions google-sheets
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

Wire Google Sheets' `new_row` ("New Spreadsheet Row") trigger to this workflow's endpoint, formatting the row's columns into `rowSummary` first (a Formatter/Code step ahead of this workflow, or equivalent transform on your trigger).
