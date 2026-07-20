# facebook-lead-ads-to-google-sheets

A Zapier durable workflow that appends every new Facebook Lead Ads lead as a row in a Google Sheet. This is the single highest-volume shape in Zapier's own usage data — the flagship "log the lead" pattern that shows up in nearly every vertical's top 3.

## What it does

- **Trigger:** a `{ leadgen_id, form_name, ad_name, campaign_name, field_data }` object delivered to the workflow input (validated by Zod) — the raw Meta Lead Ads webhook shape.
- **Step 1: `append-row-<leadgen_id>`:** `GoogleSheetsV2CLIAPI.add_row`. Maps the Meta field-data array onto named worksheet columns. Per-lead step name keeps retries idempotent.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `GOOGLE_SHEETS_CONNECTION` | Deploy-time alias for the Google Sheets connection | `zapier-sdk list-connections` |
| `SPREADSHEET` | Target spreadsheet name or id | `zapier-sdk list-action-input-field-choices google-sheets write add_row spreadsheet` |
| `WORKSHEET` | Target worksheet/tab name | `zapier-sdk list-action-input-field-choices google-sheets write add_row worksheet` (depends on `SPREADSHEET`) |
| `FIELD_EMAIL`, `FIELD_PHONE`, `FIELD_FIRST_NAME`, `FIELD_LAST_NAME` | Meta form field labels to pull from `field_data` | Match your Lead Ads form's field names exactly (case-insensitive) |

The row column names (`"First Name"`, `"Email"`, ...) are `// dynamic` — they must match your worksheet's header row exactly. Adding, renaming, or removing a header column changes the accepted input shape.

## Discovery

```bash
zapier-sdk list-actions google-sheets --action-type write
zapier-sdk list-action-input-fields google-sheets write add_row

zapier-sdk list-actions facebook-lead-ads
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

Wire Facebook Lead Ads' `lead` webhook (or Zapier's polling trigger) to this workflow's endpoint. The raw lead payload passes through as the workflow input.
