# Example skeletons

Fill-in-the-blank shells for orientation, not runnable examples. They answer "what does a plain script / Table script / durable workflow *look like*" without pretending to be verified against a real action catalog.

**The real, verified corpus lives at https://github.com/zapier/sdk/tree/main/examples** (or the `examples/` directory of a local clone). Grep it for the app or pattern you actually need.

Every example in that corpus has had its action key verified against the live catalog by CI. The skeletons below have not. Copy the shape, then look up real action keys and inputs before shipping.

## 1. Plain single-action script

The simplest thing you can write with the SDK. One authenticated call. No durable wrapper, no `ctx.step`. Runs wherever your code runs (Node script, Next.js route, Lambda).

Matches the style of `examples/by-app/<app>/*.ts`.

```typescript
// examples/by-app/<app>/<verb-noun>.ts
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const { data: connection } = await zapier.findFirstConnection({
    app: "<app-slug>", // short slug from `zapier-sdk list-apps`, e.g. "notion"
    owner: "me",
  });

  const result = await zapier.runAction({
    appKey: "<AppCLIAPI>", // CLIAPI-suffixed form, e.g. "NotionCLIAPI"
    actionType: "<read|write|search>",
    actionKey: "<action-key>", // from `zapier-sdk list-actions <app>`
    connection: connection.id,
    inputs: {
      // Verify shape with `zapier-sdk list-action-input-fields <app> <type> <action>`.
      // Mark dynamic inputs with `// dynamic` so future readers know to re-verify.
    },
  });

  console.log(result.data);
}

main().catch(console.error);
```

## 2. Zapier Tables

Tables uses first-class SDK methods (`createTable`, `createTableFields`, `createTableRecords`, `listTables`, `listTableRecords`). No connection lookup, no action discovery. The method names in the SDK reference are the surface.

Matches `examples/by-app/zapier-tables/log-event.ts`.

```typescript
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  // Find-or-create the table by name.
  const { data: tables } = await zapier.listTables({ search: "<table-name>" });
  let table = tables[0];

  if (!table) {
    const created = await zapier.createTable({
      name: "<table-name>",
      description: "<what this table is for>",
    });
    await zapier.createTableFields({
      table: created.data.id,
      fields: [
        { name: "<field-name>", type: "string" }, // or number | boolean | datetime | json
      ],
    });
    table = created.data;
  }

  // Write records. keyMode: "names" addresses fields by declared name.
  await zapier.createTableRecords({
    table: table.id,
    keyMode: "names",
    records: [
      { data: { "<field-name>": "<value>" } },
    ],
  });
}

main().catch(console.error);
```

## 3. Durable workflow (deploy to Zapier's infrastructure)

Runs on a trigger (webhook, poll, schedule) instead of in your own process. This is a different skill, not a third skeleton here — see the `zapier-workflows` skill for the full build/test/deploy flow, the idempotency invariant, and the four workflow shapes.

## What these skeletons deliberately leave out

- **Real action keys and input shapes.** Both are per-app and change over time. Look them up.
- **Sensitive-partner apps.** The corpus excludes some partners (Salesforce, Slack, others). Don't copy skeletons for those without checking.
- **Error handling, retries, structured logging.** The corpus examples don't add these either; the `defineDurable` runtime handles retries.

For anything past the shape, go to the corpus.
