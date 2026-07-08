# HubSpot

Single-action HubSpot examples. One authenticated call, no orchestration.

| File | JTBD |
|---|---|
| [`upsert-contact.ts`](./upsert-contact.ts) | Push an inbound prospect into HubSpot so the sales motion can pick it up. Upsert-by-email means safe under retry. |

## Run

```bash
npx tsx examples/by-app/hubspot/upsert-contact.ts
```

## Discovery

```bash
zapier-sdk list-actions hubspot
zapier-sdk list-action-input-fields hubspot write upsert_contact
```

HubSpot property names are dynamic per account. `email` is the stable primary key; every other property (`firstname`, `lastname`, `lifecyclestage`, custom fields) depends on the account's schema. Verify with `getActionInputFieldsSchema` against your connection.
