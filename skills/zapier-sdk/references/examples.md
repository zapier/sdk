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

Tables uses first-class SDK methods (`createTable`, `createTableFields`, `createTableRecords`, `getTable`, `listTables`, `listTableFields`, `listTableRecords`). No connection lookup, no action discovery. The method names in the SDK reference are the surface.

Matches `examples/by-app/zapier-tables/log-event.ts`.

```typescript
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  // listTables returns { data: Table[], nextCursor?: string }.
  const { data: tables } = await zapier.listTables({ search: "<table-name>" });
  let table = tables[0];

  if (!table) {
    // createTable returns { data: { id, name, description, ... } }.
    const created = await zapier.createTable({
      name: "<table-name>",
      description: "<what this table is for>",
    });
    table = created.data;

    // createTableFields returns the created field definitions.
    // Supported field types: string, number, boolean (checkbox-style), datetime, json.
    await zapier.createTableFields({
      table: table.id,
      fields: [
        { name: "<field-name>", type: "string" },
        { name: "<field-name>", type: "boolean" },
        { name: "<field-name>", type: "datetime" },
      ],
    });
  }

  // getTable returns { data: { id, name, description, ... } } for one table.
  const { data: fetchedTable } = await zapier.getTable({ table: table.id });

  // listTableFields returns { data: Field[] }. Each field has an id (e.g. "f1")
  // and a type. Use the id with keyMode: "ids"; use the name with "names".
  const { data: fields } = await zapier.listTableFields({ table: table.id });
  console.log(fields.map((f) => ({ id: f.id, name: f.name, type: f.type })));

  // createTableRecords returns the created records.
  // keyMode "names" (default) uses human-readable field names.
  // keyMode "ids" uses raw field IDs like "f1", "f2".
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

### Method signatures and return values

- `listTables({ search?, pageSize?, maxItems?, cursor? })` -> `{ data: Table[], nextCursor?: string }`
- `createTable({ name, description? })` -> `{ data: Table }`
- `getTable({ table: string })` -> `{ data: Table }`
- `createTableFields({ table: string, fields: FieldInput[] })` -> `{ data: Field[] }`
- `listTableFields({ table: string })` -> `{ data: Field[] }`
- `createTableRecords({ table: string, keyMode?: "names" | "ids", records: { data: Record<string, unknown> }[] })` -> `{ data: TableRecord[] }`
- `listTableRecords({ table: string, filters?, sort?, pageSize?, maxItems?, cursor?, keyMode? })` -> `{ data: TableRecord[], nextCursor?: string }`

### Field types and keyMode

Fields support `string`, `number`, `boolean` (checkbox-style), `datetime`, and `json`. Field IDs are short strings like `f1`, `f2`. With `keyMode: "names"` (the default), record `data` keys are field names. With `keyMode: "ids"`, record `data` keys are raw field IDs. Use `listTableFields` or `getTable` to read the field IDs and types for an existing table.

For filtering and pagination of table records, see [`pagination.md`](pagination.md).

## 3. Durable workflow (notify-on-event shape)

Deployable to Zapier's infrastructure. Runs on a trigger (webhook, poll, schedule). Every side-effect goes through `ctx.step` with the trigger's primary id in the step name so retries are idempotent.

Matches `examples/by-pattern/notify-on-event/<name>/workflow.ts`.

```typescript
// workflow.ts
import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Constants get pulled out and documented in the leaf directory's README.
const DESTINATION_CONNECTION = "<connection-alias>"; // e.g. "gmail_primary"
const DESTINATION_APP_KEY = "<AppCLIAPI>"; // e.g. "GoogleMailV2CLIAPI"

const InputSchema = z.object({
  primaryId: z.string(), // whatever id the trigger emits (charge id, response id, ...)
  // ...other fields the trigger provides
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { done: boolean }>(
  "<workflow-name>",
  async (ctx, rawInput) => {
    const input = InputSchema.parse(rawInput);

    // Step name MUST include `${input.primaryId}`. Without it, a retry
    // would double-write. This is the whole reason `defineDurable` exists.
    await ctx.step(`<action-name>-${input.primaryId}`, async () =>
      sdk.runAction({
        appKey: DESTINATION_APP_KEY,
        actionType: "<write|search|read>",
        actionKey: "<action-key>",
        connection: DESTINATION_CONNECTION,
        inputs: {
          // ...
        },
      }),
    );

    return { done: true };
  },
);
```

Deploy loop:

```bash
npm install
npx tsc --noEmit workflow.ts
npx zapier-sdk publish-workflow-version --file workflow.ts
```

## What these skeletons deliberately leave out

- **Real action keys and input shapes.** Both are per-app and change over time. Look them up.
- **Sensitive-partner apps.** The corpus excludes some partners (Salesforce, Slack, others). Don't copy skeletons for those without checking.
- **Error handling, retries, structured logging.** The corpus examples don't add these either; the `defineDurable` runtime handles retries.

For anything past the shape, go to the corpus.
