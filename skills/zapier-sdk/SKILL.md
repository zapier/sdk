---
name: zapier-sdk
description: |
  Zapier SDK for TypeScript. Programmatic access to 9,000+ apps on a user's behalf via Zapier's OAuth
  and audit layer. Use when writing code that needs to run actions in third-party apps (send an email,
  upsert a CRM record, look up a spreadsheet row, post to a chat) without managing per-app OAuth or
  vendor SDKs. Triggers: "zapier sdk", "zapier-sdk", "@zapier/zapier-sdk", "runAction",
  "run zapier action", "connect to app via zapier", "zapier connection", "zapier tables",
  "list actions for zapier app", "getActionInputFieldsSchema", "createZapierSdk".
metadata:
  author: zapier
---

# Zapier SDK

Connect your app, agent, or backend to 9,000+ integrations with a few lines of code. Run actions, manage user connections, chain apps together. The SDK handles token refresh, retries, and API differences.

## When to use the SDK

The Zapier SDK is the **code interface** to Zapier. It gives coding agents and AI builders programmatic, governed access to 9,000+ apps, running inside editors like Cursor, Claude Code, or VS Code.

Two sibling interfaces share the same capabilities:

- **Zapier CLI** (`@zapier/zapier-sdk-cli` package): terminal interface (`npx zapier-sdk ...`) for one-off commands, exploration, scripting. Read [`references/cli.md`](references/cli.md) when the user wants shell access instead of code.
- **Zapier MCP** (https://zapier.com/mcp): LLM interface (tool-calling inside Claude, ChatGPT, or any MCP client, no code required).

Pick the SDK when the deliverable is code. If the user wants ad-hoc tool calls in an AI chat interface, point them to MCP.

**Two SDK shapes to distinguish:**

- **Plain SDK script** (this file): the user's own code calls the SDK. Runs wherever their code runs (Node script, Next.js route, Lambda, CLI).
- **Durable workflow** (`@zapier/zapier-durable`): the user *deploys* a workflow that Zapier's infrastructure runs on a trigger (webhook, poll, schedule). Retries stay idempotent via `ctx.step`. Read [`references/workflows.md`](references/workflows.md) when the user wants deployment on Zapier's infrastructure instead of running the code themselves.

## Prerequisites

The SDK ships two packages: a TypeScript library and a CLI. Install whichever you need.

Check what's already installed:

```bash
ls node_modules/@zapier/zapier-sdk 2>/dev/null && echo "SDK installed" || echo "SDK not installed"
npx zapier-sdk --version 2>/dev/null && echo "CLI installed" || echo "CLI not installed"
```

If missing:

```bash
npm install @zapier/zapier-sdk                                # SDK library
npm install -D @zapier/zapier-sdk-cli @types/node typescript  # CLI + dev deps
npx zapier-sdk login                                          # Authenticate (opens browser)
```

Full quickstart: https://docs.zapier.com/sdk

Setup requires browser-based login via `npx zapier-sdk login`. Offer to guide setup step-by-step only after user confirmation.

## Critical: do not trust internal knowledge

The Zapier SDK (`@zapier/zapier-sdk`) is new. Your training data does not contain accurate information about this SDK. Do not guess API methods or patterns.

1. Always verify against the official docs: https://docs.zapier.com/sdk/reference
2. Never hallucinate method names. Use only methods documented in the reference or shown in this file.
3. Never invent app keys. Run `zapier-sdk list-apps --search <term>` or `zapier.listApps({ search })` first.
4. Never invent action keys. Run `zapier-sdk list-actions <app>` or `zapier.listActions({ app })` first.
5. Never assume input field shapes for dynamic actions. Run `zapier-sdk list-action-input-fields <app> <type> <action>` against the live connection.

## Authentication

The SDK supports two auth modes. Browser login is the default for local development:

```typescript
import { createZapierSdk } from "@zapier/zapier-sdk";

// Option 1: browser-based (local dev). Requires `npx zapier-sdk login` first.
const zapier = createZapierSdk();

// Option 2: client credentials (server / CI).
const zapier = createZapierSdk({
  credentials: { clientId: "...", clientSecret: "..." },
});
```

## Core workflow

### 1. Find or create a connection

Every action needs a *connection* (an OAuth grant Zapier holds for a specific app + user). Check if one exists:

```typescript
// Throws ZapierResourceNotFoundError if no match. Wrap in try/catch, or listConnections() first.
const { data: connection } = await zapier.findFirstConnection({
  app: "notion",
  owner: "me",
  expired: false,
});
```

If none exists, the user has to complete OAuth in a browser. This step **cannot be fully automated**: a human must click "authorize" for their account.

```bash
npx zapier-sdk create-connection notion   # opens a browser, waits for OAuth
```

For agent-driven flows: use `get-connection-start-url <app>` to fetch the URL, present it to the user, then `wait-for-new-connection <app> <started-at>` to block until they finish.

### 2. Run an action

Action types: `read` (list data), `write` (create/update), `search` (find specific records).

```typescript
// Generic form (works for any app + action). Preferred.
const { data } = await zapier.runAction({
  appKey: "NotionCLIAPI",
  actionType: "search",
  actionKey: "page_by_title",
  connection: connection.id,
  inputs: { title: "Meeting Notes", exact_match: "no" },
});
```

For actions on the stable typed surface (documented in the SDK reference), a typed shorthand `zapier.apps.<app>.<type>.<action>({ inputs })` is available. Check the reference for coverage; not every app is typed.

### 3. Discover actions at runtime

```typescript
// What can this app do?
for await (const action of zapier.listActions({ app: "notion" }).items()) {
  console.log(action.key, action.action_type, action.label);
}

// What inputs does an action need?
const { data: schema } = await zapier.getActionInputFieldsSchema({
  app: "notion",
  actionType: "search",
  action: "page_by_title",
});
```

## Gotchas

- **OAuth cannot be automated.** If no connection exists, `create-connection` opens a browser for the user. Agents must surface the URL and wait for the human. See "1. Find or create a connection" above.
- **`is_hidden: true` actions are not on the stable surface.** They may work at runtime, but Zapier makes no promises they'll keep working. Filter them out of `list-actions` results before picking an action key.
- **Two connection reference shapes.** At runtime, pass `connection.id` (UUID) to `runAction`. Inside a durable workflow (`@zapier/zapier-durable`), pass a string alias like `"notion_primary"` that the runtime resolves at deploy time. Don't mix them up.
- **`runAction` returns `{ data: T[] }`, always an array.** Search-style actions typically return one row; downstream code destructures `data: [result]`. Write actions also return an array (usually one element).
- **Dynamic input fields.** Notion database properties, HubSpot custom fields, Jira per-project schemas: none of these are knowable ahead of time. Always run `list-action-input-fields` against the live connection before authoring.
- **App keys have a canonical form.** `list-actions` returns `app_key: "NotionCLIAPI"` for Notion. Pass that exact string to `runAction`'s `appKey` field. The short slug `"notion"` works for `list-actions` and `findFirstConnection`, but `runAction` wants the CLIAPI-suffixed form.

## SDK method reference

The SDK covers these categories: **Apps**, **Actions**, **Connections**, **HTTP**, **Tables**, **Auth** (client credentials), **Profile**.

Do not guess method signatures. Look them up in the canonical reference. Prefer the bundled README when `@zapier/zapier-sdk` is already installed (version-locked to the installed package, grep-able offline):

- **Bundled with the installed package:** `node_modules/@zapier/zapier-sdk/README.md`
- **Live docs:** https://docs.zapier.com/sdk/reference

When paginating a `list-*` call, see [`references/pagination.md`](references/pagination.md) for the three patterns the SDK supports.

## Authenticated HTTP (fetch)

Make raw API calls through Zapier's auth infrastructure when no first-class action exists:

```typescript
const response = await zapier.fetch("https://api.example.com/data", {
  connection: connection.id,
  method: "GET",
});
```

Same auth and audit trail as `runAction`. Use this when the app's Zapier action catalog doesn't cover what you need (bulk reads, custom endpoints, partner-specific APIs).

## Full documentation

- Quickstart: https://docs.zapier.com/sdk/quickstart.md
- SDK Reference: https://docs.zapier.com/sdk/reference.md
- CLI Reference: https://docs.zapier.com/sdk/cli-reference.md
- All docs index: https://docs.zapier.com/llms.txt
- Examples corpus: https://github.com/zapier/sdk/tree/main/examples
