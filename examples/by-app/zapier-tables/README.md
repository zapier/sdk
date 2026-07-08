# Zapier Tables

Single-action Zapier Tables examples. Tables are a first-class SDK surface — no `runAction`, no `get-action-input-fields`. Use the typed methods directly.

| File | JTBD |
|---|---|
| [`log-event.ts`](./log-event.ts) | Use Zapier Tables as a lightweight event log — no database to provision, shareable with non-engineers, queryable from Zaps and from the SDK |

## Run

```bash
npx tsx examples/by-app/zapier-tables/log-event.ts
```

## Reference

Tables methods (`createTable`, `createTableRecords`, `findTableRecords`, etc.) are documented at [docs.zapier.com/sdk/reference#tables](https://docs.zapier.com/sdk/reference#tables).
