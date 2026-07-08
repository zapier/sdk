# Airtable

Single-action Airtable examples. One authenticated call, no orchestration.

| File | JTBD |
|---|---|
| [`find-record.ts`](./find-record.ts) | Find a record by matching a field value. Read-only. |

## Run

```bash
npx tsx examples/by-app/airtable/find-record.ts
```

## Discovery

```bash
zapier-sdk list-actions airtable
zapier-sdk list-action-input-fields airtable search findRecord
```

Base ID, table name, and searchable fields are dynamic per connection. Verify with `list-action-input-fields` before running.
