# Pagination

Read this when paginating results from any `list-*` call (`listApps`, `listActions`, `listConnections`, `listTables`, etc.).

List methods return paginated results and support three patterns. List inputs also accept `cursor`, `pageSize`, and `maxItems`.

```typescript
// Pattern 1: single page (await as Promise).
const { data, nextCursor } = await zapier.listApps();

// Pattern 2: iterate pages (for await on the result).
for await (const page of zapier.listApps()) {
  // page.data: T[], page.nextCursor?: string
}

// Pattern 3: iterate items (flattened across all pages).
for await (const app of zapier.listApps().items()) {
  console.log(app.name);
}
```

Pattern 3 is the default recommendation when you want every item and don't need to inspect page boundaries.

## Options

Every `list-*` call accepts:

- `pageSize` (number): items per page. Server-side cap varies by resource.
- `maxItems` (number): stop iterating after this many items total. Useful with `.items()` to avoid pulling the whole catalog when you only need N results.
- `cursor` (string): resume from a previous `nextCursor`.

```typescript
// Cap at 50 total items across the iterator.
for await (const app of zapier.listApps({ search: "notion" }).items({ maxItems: 50 })) {
  console.log(app.key);
}
```
