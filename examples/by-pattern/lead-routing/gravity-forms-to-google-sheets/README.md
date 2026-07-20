# gravity-forms-to-google-sheets

A Zapier durable workflow that appends every new Gravity Forms entry as a row in a Google Sheet. Gravity Forms is the dominant WordPress form plugin behind donation and volunteer-signup intake, so this is the WordPress-ecosystem sibling to `typeform-to-google-sheets` — same destination, different intake.

## What it does

- **Trigger:** a `{ entryId, formTitle, fields }` object delivered to the workflow input (validated by Zod). `fields` is a flattened field-label -> value map.
- **Step 1: `append-row-<entryId>`:** `GoogleSheetsV2CLIAPI.add_row`. Spreads `fields` onto worksheet columns alongside entry metadata. Per-entry step name keeps retries idempotent.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `GOOGLE_SHEETS_CONNECTION` | Deploy-time alias for the Google Sheets connection | `zapier-sdk list-connections` |
| `SPREADSHEET` | Target spreadsheet name or id | `zapier-sdk list-action-input-field-choices google-sheets write add_row spreadsheet` |
| `WORKSHEET` | Target worksheet/tab name | `zapier-sdk list-action-input-field-choices google-sheets write add_row worksheet` (depends on `SPREADSHEET`) |

The `fields` spread is `// dynamic` — each key must match your worksheet's header row exactly. Gravity Forms' native field labels are set per-form by the site admin.

## Discovery

```bash
zapier-sdk list-actions google-sheets --action-type write
zapier-sdk list-action-input-fields google-sheets write add_row

zapier-sdk list-actions gravity-forms
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

Wire Gravity Forms' `getEntry` ("Form Submission") trigger to this workflow's endpoint, flattening the raw field-id-keyed entry to the `fields` map shape first (a Formatter/Code step ahead of this workflow, or equivalent transform on your trigger).
