# typeform-to-google-sheets

A Zapier durable workflow that appends every new Typeform submission as a row in a Google Sheet. The canonical **trigger-swap** sibling to `facebook-lead-ads-to-google-sheets` — same destination, different intake — useful for showing how the SDK isolates the trigger shape without touching downstream logic.

## What it does

- **Trigger:** a `{ responseId, formTitle, submittedAt, answers }` object delivered to the workflow input (validated by Zod). `answers` is a flattened question-title -> answer-text map.
- **Step 1: `append-row-<responseId>`:** `GoogleSheetsV2CLIAPI.add_row`. Spreads `answers` onto worksheet columns alongside response metadata. Per-response step name keeps retries idempotent.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `GOOGLE_SHEETS_CONNECTION` | Deploy-time alias for the Google Sheets connection | `zapier-sdk list-connections` |
| `SPREADSHEET` | Target spreadsheet name or id | `zapier-sdk list-action-input-field-choices google-sheets write add_row spreadsheet` |
| `WORKSHEET` | Target worksheet/tab name | `zapier-sdk list-action-input-field-choices google-sheets write add_row worksheet` (depends on `SPREADSHEET`) |

The `answers` spread is `// dynamic` — each key must match your worksheet's header row exactly. If your form's question set changes, the worksheet headers need to change with it.

## Discovery

```bash
zapier-sdk list-actions google-sheets --action-type write
zapier-sdk list-action-input-fields google-sheets write add_row

zapier-sdk list-actions typeform
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

Wire Typeform's `entries_resthook_v2` ("New Entry") webhook to this workflow's endpoint, flattening the raw answers array to the `answers` map shape first (a Formatter/Code step ahead of this workflow, or equivalent transform on your trigger).
