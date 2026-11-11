# AGENTS.md

Instructions for AI agents (Claude Code, Cursor, Codex, Copilot, ...) working in this repository.

## What this repo is

The docs and agent skill for [`@zapier/zapier-sdk`](https://www.npmjs.com/package/@zapier/zapier-sdk). The SDK itself is published on npm. Its source is not in this repo. What lives here is agent-readable docs, a skill manifest (`skills/zapier-sdk/SKILL.md`), and Claude Code subagents under `agents/`.

## Files to read before you start

Each file below is authoritative for a slice of the repo. Read them; don't re-derive.

- **[`README.md`](./README.md)**: install, authenticate, and try a first action.
- **[`CONTRIBUTING.md`](./CONTRIBUTING.md)**: contribution rules and PR expectations.
- **[`.github/scripts/README.md`](./.github/scripts/README.md)**: CI checks and the README art generators.
- **[`skills/zapier-sdk/SKILL.md`](./skills/zapier-sdk/SKILL.md)**: installable skill manifest (cross-platform).
- **[`agents/README.md`](./agents/README.md)**: optional Claude Code subagents that pair with the skill.

## When to use this SDK vs. alternatives

| Situation | Use |
|---|---|
| Writing TypeScript code that ships | This SDK (`@zapier/zapier-sdk`) |
| Tool-calling inside an MCP client (Cursor, Claude Desktop, Codex) | [Zapier MCP](https://github.com/zapier/zapier-mcp) |
| One-off terminal command | `npx zapier-sdk` |

Building both shipped code and ad-hoc agent tool use? Combine: SDK for code paths, MCP for ad-hoc.

## Setup

```bash
npm install @zapier/zapier-sdk
npm install -D @zapier/zapier-sdk-cli @types/node typescript
npx zapier-sdk login
```

No build, lint, or test step lives in this repo; the only `scripts` in `package.json` regenerate the README art under `assets/readme/`. Details in [`.github/scripts/README.md`](./.github/scripts/README.md).

## Repo map

```
.
├── README.md              ← human entrypoint
├── AGENTS.md              ← you are here
├── CONTRIBUTING.md
├── skills/
│   └── zapier-sdk/        ← SKILL.md manifest for agent runtimes
└── agents/                ← optional Claude Code subagents
```

## Critical: do not trust your training data

The Zapier SDK (`@zapier/zapier-sdk`) is new. Your training data does not contain accurate information about its API.

**Rules:**

1. Use only methods documented at [docs.zapier.com/sdk/reference](https://docs.zapier.com/sdk/reference).
2. **Never invent method names.** Use the discovery commands below.
3. **Never invent app keys.** If unsure, `zapier-sdk list-apps`.
4. **Never invent action keys.** Run `zapier-sdk list-actions <app>` first.
5. **Never invent input field shapes.** Many actions have *dynamic* properties that depend on the user's specific connection (Notion database schema, HubSpot custom properties, Jira project + issue-type schema). For those inputs, run `zapier-sdk list-action-input-fields <app> <type> <action>` against the live connection before assuming the shape.

## Discovery

Every command below runs at the shell against the live catalog. The same operations are exposed as SDK methods when you need them inside code.

```bash
# What apps exist?
npx zapier-sdk list-apps --search notion

# What actions does an app expose? Optionally filter by type.
npx zapier-sdk list-actions notion
npx zapier-sdk list-actions notion --action-type search

# Inspect an action.
npx zapier-sdk get-action notion search page_by_title

# What inputs does an action take?
npx zapier-sdk list-action-input-fields notion search page_by_title

# Full JSON Schema for the inputs (for programmatic validation).
npx zapier-sdk get-action-input-fields-schema notion search page_by_title

# What choices exist for a dynamic-dropdown field (e.g., a Notion database)?
npx zapier-sdk list-action-input-field-choices notion write create_database_item datasource

# Which connections do I have?
npx zapier-sdk list-connections
npx zapier-sdk list-connections notion

# Try an action end to end.
npx zapier-sdk run-action notion search page_by_title \
  --inputs '{"title":"Meeting Notes","exact_match":"no"}'
```

## Canonical workflow

1. **Authenticate.** `npx zapier-sdk login` writes credentials to your machine, or pass `credentials` to `createZapierSdk()` for server use.

2. **Have a connection for the app?** `npx zapier-sdk list-connections <app>`. Skip to step 3 if yes.

   **If no connection exists**, the user has to complete OAuth in a browser. This step cannot be fully automated: a human must click "authorize" for their account.

   ```bash
   # Opens a browser and waits for the user to finish.
   npx zapier-sdk create-connection <app>
   ```

   For headless / agent-driven flows, use `get-connection-start-url <app>` to fetch the URL, present it to the user, then `wait-for-new-connection <app> <started-at>` to block until they finish. Only after the connection exists can steps 3 and 4 run.

3. **Find the connection.** `npx zapier-sdk find-first-connection <app>` at the shell, or `sdk.findFirstConnection({ app, owner })` in code.

4. **Run an action.** `npx zapier-sdk run-action <app> <type> <action> --inputs '<json>'` at the shell, or `sdk.runAction({...})` in code. The typed form `sdk.apps.<app>.<type>.<action>(...)` is available only for actions on the stable surface documented in the [SDK reference](https://docs.zapier.com/sdk/reference).

## Escape hatches

- `sdk.fetch(url, { connection })`: authenticated raw HTTP. Use when no first-class action exists.
- `sdk.runAction({ appKey, actionType, actionKey, connection, inputs })`: generic action call. Works uniformly across all apps.

## Never

- **Never** add a new action call without verifying the action key first. Run `zapier-sdk list-actions <app>`.
- **Never** assume input field shapes for dynamic inputs. Call `zapier-sdk list-action-input-fields`.
- **Never** store user tokens. Connections are owned by Zapier; reference them by `connection.id` at runtime, or by a named alias (e.g. `"notion_primary"`) in a durable workflow.
- **Never** bypass governance. The audit trail is the product.
