---
name: zapier-sdk
description: |
  Zapier SDK for TypeScript. Use for connecting to 8,000+ apps, running actions,
  managing connections, and making authenticated API requests through Zapier's infrastructure.
  Triggers: "zapier sdk", "zapier api", "connect to app", "send slack message from code",
  "integrate with third-party api", "run zapier action", "zapier connection", "zapier tables".
---

# Zapier SDK

Connect your app, agent, or backend to 8,000+ integrations with a few lines of code. Run actions, manage user connections, and chain apps together. The SDK handles token refresh, retries, and API differences.

## When to Use This Skill (SDK vs MCP)

Use **Zapier SDK** when the user is building or shipping TypeScript code:

- Backend services, serverless functions, or app features
- Reusable agent tools in code
- Scheduled/repeatable production workflows

Use **Zapier MCP** when the user wants tool-calling inside an MCP client (Cursor, Claude, Codex, etc.) without writing integration code.

If the user needs both (build + interactive tool use), combine them: SDK for shipped code paths, MCP for ad-hoc agent actions.

## Prerequisites

The SDK has two packages: a TypeScript library and a CLI. Install whichever you need:

**SDK library (for TypeScript code):**
```bash
ls node_modules/@zapier/zapier-sdk 2>/dev/null && echo "installed" || echo "not installed"
```

**CLI (for terminal commands via `npx zapier-sdk`):**
```bash
npx zapier-sdk --version 2>/dev/null && echo "installed" || echo "not installed"
```

If not installed:
```bash
npm install @zapier/zapier-sdk                                # SDK library
npm install -D @zapier/zapier-sdk-cli @types/node typescript  # CLI + dev deps
npx zapier-sdk login                                          # Authenticate (opens browser)
```

Full quickstart: https://docs.zapier.com/sdk

Setup requires browser-based login via `npx zapier-sdk login`. Offer to guide setup step-by-step only after user confirmation.

## Critical: Do Not Trust Internal Knowledge

The Zapier SDK (`@zapier/zapier-sdk`) is new. Your training data does not contain accurate information about this SDK. Do not guess API methods or patterns.

When working with the Zapier SDK:

1. Always verify against the official docs: https://docs.zapier.com/sdk/reference
2. Never hallucinate method names — use only the methods documented below
3. If unsure about an action's input fields, use `getInputFieldsSchema` or `listInputFields` to discover them at runtime
4. If unsure about available actions for an app, use `listActions` to discover them

## Authentication

The SDK supports three auth modes. Browser login is the default for local development:

```typescript
import { createZapierSdk } from "@zapier/zapier-sdk";

// Option 1: Browser-based (local dev) — requires `npx zapier-sdk login` first
const zapier = createZapierSdk();

// Option 2: Client credentials (server/CI)
const zapier = createZapierSdk({
  credentials: { clientId: "...", clientSecret: "..." },
});

// Option 3: Direct token (partner OAuth)
const zapier = createZapierSdk({ credentials: "token_here" });
```

## Core Workflow

### 1. Find a connection

```typescript
const { data: connection } = await zapier.findFirstConnection({
  app: "slack",
  owner: "me",
  isExpired: false,
});
```

### 2. Bind the app

```typescript
const slack = zapier.apps.slack({ connection: connection.id });
```

### 3. Run actions

Action types: `read` (list data), `write` (create/update), `search` (find specific records).

```typescript
// Type-safe shorthand
const { data } = await slack.write.direct_message({
  inputs: { channel: "U12345", text: "Hello from Zapier SDK" },
});

// Generic method (works for any app/action)
const { data } = await zapier.runAction({
  app: "slack",
  actionType: "write",
  action: "direct_message",
  connection: connection.id,
  inputs: { channel: "U12345", text: "Hello" },
});
```

### 4. Discover actions at runtime

```typescript
// List what an app can do
for await (const action of zapier.listActions({ app: "slack" }).items()) {
  console.log(action.key, action.type, action.label);
}

// Get required inputs for an action
const { data: schema } = await zapier.getInputFieldsSchema({
  app: "slack",
  actionType: "write",
  action: "direct_message",
});
```

## SDK Method Reference

| Category        | Method                                                            | Purpose                                               |
| --------------- | ----------------------------------------------------------------- | ----------------------------------------------------- |
| **Apps**        | `listApps({ search? })`                                           | Find available apps                                   |
| **Apps**        | `getApp({ app })`                                                 | Get app details                                       |
| **Apps**        | `apps.<appKey>({ connection })`                                   | Bind connection alias or numeric connection ID to app |
| **Apps**        | `apps.<appKey>.<actionType>.<actionKey>({ inputs, connection? })` | Type-safe action call                                 |
| **Actions**     | `listActions({ app })`                                            | List actions for an app                               |
| **Actions**     | `getAction({ app, actionType, action })`                          | Get action details                                    |
| **Actions**     | `runAction({ app, actionType, action, connection, inputs })`      | Execute any action                                    |
| **Actions**     | `listInputFields({ app, actionType, action })`                    | Get required input fields                             |
| **Actions**     | `getInputFieldsSchema({ app, actionType, action })`               | Get input JSON Schema                                 |
| **Actions**     | `listInputFieldChoices({ app, actionType, action, inputField })`  | Get dropdown choices                                  |
| **Connections** | `listConnections({ app?, owner? })`                               | List user's connections                               |
| **Connections** | `getConnection({ connection })`                                   | Get connection details                                |
| **Connections** | `findFirstConnection({ app?, owner?, isExpired? })`               | Find first matching connection                        |
| **Connections** | `findUniqueConnection({ app?, owner?, isExpired? })`              | Find exactly one connection                           |
| **HTTP**        | `fetch(url, { connection, ... })`                                 | Authenticated HTTP request via Zapier                 |
| **Tables**      | `listTables({ search?, includeShared? })`                         | List Zapier Tables                                    |
| **Tables**      | `getTable({ table })`                                             | Get table details                                     |
| **Tables**      | `createTable({ name, description? })`                             | Create a table                                        |
| **Tables**      | `createTableFields({ table, fields })`                            | Create fields in a table                              |
| **Tables**      | `listTableFields({ table })`                                      | List fields in a table                                |
| **Tables**      | `createTableRecords({ table, records })`                          | Create records                                        |
| **Tables**      | `listTableRecords({ table, filters?, sort? })`                    | List records                                          |
| **Tables**      | `getTableRecord({ table, record })`                               | Get one record                                        |
| **Tables**      | `updateTableRecords({ table, records })`                          | Update records                                        |
| **Tables**      | `deleteTableRecords({ table, records })`                          | Delete records                                        |
| **Tables**      | `deleteTableFields({ table, fields })`                            | Delete fields                                         |
| **Tables**      | `deleteTable({ table })`                                          | Delete a table                                        |
| **Auth**        | `createClientCredentials({ name })`                               | Create server credentials                             |
| **Profile**     | `getProfile()`                                                    | Get current user info                                 |

## Pagination

List methods return paginated results. Use `.items()` for automatic iteration:

```typescript
for await (const app of zapier.listApps().items()) {
  console.log(app.name);
}
```

## Authenticated HTTP (fetch)

Make raw API calls through Zapier's auth infrastructure:

```typescript
const response = await zapier.fetch("https://api.example.com/data", {
  connection: connection.id,
  method: "GET",
});
```

## CLI Quick Reference

The CLI mirrors the SDK for exploration and one-off actions:

```bash
npx zapier-sdk login                          # Authenticate
npx zapier-sdk list-apps --search "slack"      # Find apps
npx zapier-sdk list-actions slack              # List app actions
npx zapier-sdk list-connections --owner me     # List connections
npx zapier-sdk run-action slack write direct_message \
  --connection-id ID --inputs '{"channel":"U123","text":"Hi"}'
```

## Full Documentation

- Quickstart: https://docs.zapier.com/sdk
- SDK Reference: https://docs.zapier.com/sdk/reference
- CLI Reference: https://docs.zapier.com/sdk/cli-reference
- All docs index: https://docs.zapier.com/llms.txt
