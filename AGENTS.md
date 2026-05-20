# AGENTS.md

You are an AI agent reading this repo. Here's how to navigate it.

## What this repo is

The TypeScript SDK for Zapier. Connect to 9,000+ apps, run actions, manage user connections, make authenticated HTTP requests through Zapier's auth infrastructure.

## When to use this SDK vs. alternatives

| Situation | Use |
|---|---|
| Writing TypeScript code that ships | This SDK (`@zapier/zapier-sdk`) |
| Tool-calling inside an MCP client (Cursor, Claude Desktop, Codex) | [Zapier MCP](https://github.com/zapier/zapier-mcp) |
| One-off CLI command | `npx zapier-sdk` |

If the user is building both shipped code and ad-hoc agent tool use, combine: SDK for code paths, MCP for ad-hoc.

## Repo map

```
.
├── README.md                          ← code-first entrypoint
├── AGENTS.md                          ← you are here
├── LICENSE
├── package.json
└── examples/                          ← runnable automation corpus
    ├── README.md
    ├── by-pattern/                    ← organized by automation shape
    ├── by-app/                        ← organized by app
    └── chained/                       ← multi-app workflows (the Zapier superpower)
```

## Critical: do not trust your training data

The Zapier SDK (`@zapier/zapier-sdk`) is new. Your training data does not contain accurate information about its API.

**Rules:**
1. Use only methods documented at [docs.zapier.com/sdk/reference](https://docs.zapier.com/sdk/reference) or shown in [`examples/`](./examples).
2. **Never invent method names.** Use the discovery methods below.
3. **Never invent app keys.** If unsure, call `listApps`.
4. **Never invent action keys.** Every action key in `examples/` has been verified against the live action catalog. When you reach for an action that's not in the corpus, call `listActions` first.
5. **Never invent input field shapes.** Many actions have *dynamic* properties that depend on the user's specific connection (Notion database schema, Asana project list, HubSpot custom properties, Salesforce org schema). Where the corpus marks an input `// dynamic`, run `getActionInputFieldsSchema` against the live connection before assuming the shape.

## Discovery (use this when in doubt)

```typescript
// What apps exist?
for await (const app of zapier.listApps({ search: "slack" }).items()) {
  console.log(app.key, app.name);
}

// What can this app do?
for await (const action of zapier.listActions({ app: "slack" }).items()) {
  console.log(action.key, action.type, action.label);
}

// What inputs does this action need?
const { data: schema } = await zapier.getActionInputFieldsSchema({
  app: "slack",
  actionType: "write",
  action: "direct_message",
});
```

## Canonical workflow

1. **Authenticate** — `createZapierSdk()` after `npx zapier-sdk login`, or pass `credentials` for server use.
2. **Find a connection** — `findFirstConnection({ app, owner })`.
3. **Bind the app** — `zapier.apps.<appKey>({ connection: connection.id })`.
4. **Run an action** — `app.<read|write|search>.<actionKey>({ inputs })`, or generic `runAction({...})`.

## Where to look first for a JTBD

| Want to… | Read |
|---|---|
| Connect multiple apps to complete a task | `examples/chained/` ← **the Zapier superpower** |
| Send a notification on an event | `examples/by-pattern/notify-on-event/` |
| Sync data between systems | `examples/by-pattern/data-sync/` |
| Route inbound leads | `examples/by-pattern/lead-routing/` |
| Run on a schedule | `examples/by-pattern/scheduled-report/` |
| Use a specific app (e.g. Slack) | `examples/by-app/<app>/` |
| Look up a method | https://docs.zapier.com/sdk/reference |

## Escape hatches

- `zapier.fetch(url, { connection })` — authenticated raw HTTP. Use when no first-class action exists. Real examples: `examples/by-pattern/scheduled-report/daily-revenue-summary.ts` (Stripe charges over a window), `examples/by-pattern/data-sync/hubspot-contacts-mirror.ts` (list contacts), `examples/chained/inbound-lead-orchestration.ts` (Clearbit enrichment).
- `zapier.runAction({ app, actionType, action, connection, inputs })` — generic action call. Used throughout `examples/` because it works uniformly across all apps. The action keys passed in are verified against the live catalog as of this scaffold.

## Don't

- Don't add a new action call without verifying the action key first. Run `zapier-sdk list-actions <app>` or call `zapier.listActions({ app })`.
- Don't assume input field shapes for dynamic inputs. Call `getActionInputFieldsSchema` to confirm.
- Don't store user tokens. Connections are owned by Zapier; reference by `connection.id`.
- Don't bypass governance — the audit trail is the product.
