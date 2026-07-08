# Notion

Single-action Notion examples. One authenticated call, no orchestration.

| File | JTBD |
|---|---|
| [`find-page-by-title.ts`](./find-page-by-title.ts) | Look up a page by its title. Read-only, no database setup. The simplest Notion call. |
| [`create-page.ts`](./create-page.ts) | Drop a structured record into Notion (meeting note, customer profile) from your code or agent. |

## Run

```bash
npx tsx examples/by-app/notion/find-page-by-title.ts "Q2 Planning"
npx tsx examples/by-app/notion/create-page.ts
```

## Discovery

```bash
zapier-sdk list-actions notion
zapier-sdk list-action-input-fields notion search page_by_title
zapier-sdk list-action-input-fields notion write create_database_item
```

Notion property shape depends on your database's schema. Every property beyond title is dynamic — verify with `getActionInputFieldsSchema` before assuming.
