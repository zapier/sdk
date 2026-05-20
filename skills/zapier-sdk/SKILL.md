---
name: zapier-sdk
description: |
  Zapier SDK for TypeScript. Use for connecting to 9,000+ apps, running actions,
  managing connections, and making authenticated API requests through Zapier's infrastructure.
  Triggers: "zapier sdk", "zapier api", "connect to app", "send slack message from code",
  "integrate with third-party api", "run zapier action", "zapier connection", "zapier tables".
---

# Zapier SDK

Connect your app, agent, or backend to 9,000+ integrations with a few lines of code. Run actions, manage user connections, and chain apps together. The SDK handles token refresh, retries, and API differences.

## When to use the SDK

The Zapier SDK is the **code interface** to Zapier — how coding agents and AI builders give their agents programmatic, governed access to 9,000+ apps, running inside editors like Cursor, Claude Code, or VS Code.

Two sibling interfaces share the same capabilities:

- **Zapier CLI** (`@zapier/zapier-sdk-cli` package) — terminal interface (`npx zapier-sdk …` for one-off commands, exploration, scripting).
- **Zapier MCP** (https://zapier.com/mcp) — LLM interface (tool-calling inside Claude, ChatGPT, or any MCP client, no code required).

Pick the SDK when the deliverable is code. If the user wants ad-hoc tool calls in an AI chat interface, point them to MCP.

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
2. Never hallucinate method names — use only methods documented in the official Zapier SDK reference
3. If unsure about an action's input fields, use `getActionInputFieldsSchema` or `listActionInputFields` to discover them at runtime
4. If unsure about available actions for an app, use `listActions` to discover them

## Authentication

The SDK supports two auth modes. Browser login is the default for local development:

```typescript
import { createZapierSdk } from "@zapier/zapier-sdk";

// Option 1: Browser-based (local dev) — requires `npx zapier-sdk login` first
const zapier = createZapierSdk();

// Option 2: Client credentials (server/CI)
const zapier = createZapierSdk({
  credentials: { clientId: "...", clientSecret: "..." },
});
```

## Core Workflow

### 1. Find a connection

```typescript
// Throws ZapierResourceNotFoundError if no match — wrap in try/catch or use listConnections() to check first.
const { data: connection } = await zapier.findFirstConnection({
  app: "slack",
  owner: "me",
  expired: false,
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
const { data: schema } = await zapier.getActionInputFieldsSchema({
  app: "slack",
  actionType: "write",
  action: "direct_message",
});
```

## SDK Method Reference

The SDK covers these categories: **Apps**, **Actions**, **Connections**, **HTTP**, **Tables**, **Auth** (client credentials), **Profile**.

Do not guess method signatures. Look them up in the canonical reference — prefer the bundled README when `@zapier/zapier-sdk` is already installed (it's version-locked to the installed package and grep-able offline):

- **Bundled with the installed package:** `node_modules/@zapier/zapier-sdk/README.md`
- **Live docs:** https://docs.zapier.com/sdk/reference

When in doubt about what an app supports or what inputs an action requires, discover at runtime with `listActions` and `getActionInputFieldsSchema` — see Core Workflow step 4 above.

## Pagination

List methods return paginated results and support three patterns. List inputs also accept `cursor`, `pageSize`, and `maxItems`.

```typescript
// Pattern 1: single page (await as Promise)
const { data, nextCursor } = await zapier.listApps();

// Pattern 2: iterate pages (for await on the result)
for await (const page of zapier.listApps()) {
  // page.data: T[], page.nextCursor?: string
}

// Pattern 3: iterate items (flattened across all pages)
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
  --connection ID --inputs '{"channel":"U123","text":"Hi"}'
```

## Full Documentation

- Quickstart: https://docs.zapier.com/sdk/quickstart.md
- SDK Reference: https://docs.zapier.com/sdk/reference.md
- CLI Reference: https://docs.zapier.com/sdk/cli-reference.md
- All docs index: https://docs.zapier.com/llms.txt
