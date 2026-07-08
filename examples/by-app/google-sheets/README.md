# Google Sheets

Single-action Google Sheets examples. One authenticated call, no orchestration.

| File | JTBD |
|---|---|
| [`lookup-row.ts`](./lookup-row.ts) | Find a row by column value. Read-only. |

## Run

```bash
npx tsx examples/by-app/google-sheets/lookup-row.ts
```

## Discovery

```bash
zapier-sdk list-actions google-sheets
zapier-sdk list-action-input-fields google-sheets search lookup_row
```

The `spreadsheet` and `worksheet` inputs are dynamic dropdowns tied to your connection. Verify their values with `list-action-input-fields` before running.
