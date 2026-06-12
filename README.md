# Zapier SDK

Connect your app, agent, or backend to 9,000+ apps. Run actions, manage user connections, chain multiple apps to complete one task. The SDK handles token refresh, retries, and API differences.

> This repo is the docs and examples corpus for [`@zapier/zapier-sdk`](https://www.npmjs.com/package/@zapier/zapier-sdk) on npm. The SDK source isn't published here yet.

## Five-minute path to a working call

```bash
npm install @zapier/zapier-sdk
npm install -D @zapier/zapier-sdk-cli @types/node typescript
npx zapier-sdk login
```

```typescript
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

const { data: connection } = await zapier.findFirstConnection({
  app: "slack",
  owner: "me",
});

const slack = zapier.apps.slack({ connection: connection.id });

await slack.write.direct_message({
  inputs: { channel: "U12345", text: "Hello from Zapier SDK" },
});
```

## For agents

If you are an AI agent: read [AGENTS.md](./AGENTS.md) first. It explains how this repo is laid out, where to find worked examples for any JTBD, and the rules of engagement (no hallucinating method names; use `listActions` / `getActionInputFieldsSchema` to discover capabilities at runtime).

To install this as a skill in your runtime: `npx skills add zapier/sdk` — adds [`skills/zapier-sdk/SKILL.md`](./skills/zapier-sdk/SKILL.md) to your local skills directory.

## For humans

| You want to… | Go to… |
|---|---|
| Get started in 5 minutes | The block above, then [`examples/`](./examples) |
| See real automation examples | [`examples/`](./examples) — sorted three ways |
| See what Zapier really does — chain multiple apps | [`examples/chained/`](./examples/chained) |
| Look up a method | [docs.zapier.com/sdk/reference](https://docs.zapier.com/sdk/reference) |
| Use the CLI | [docs.zapier.com/sdk/cli-reference](https://docs.zapier.com/sdk/cli-reference) |
| Use Zapier from an MCP client | [github.com/zapier/zapier-mcp](https://github.com/zapier/zapier-mcp) |

## Why use this

- **One auth surface for 9,000+ apps**. OAuth handled. Tokens never leave Zapier.
- **Safe by default**. Org-level governance, audit trail, intercept/log/report what your agents do with your APIs.
- **Discoverable at runtime**. `listApps`, `listActions`, `getActionInputFieldsSchema` — agents can explore the API without you hardcoding it.
- **Type-safe**. Per-app, per-action types generated from the live integration catalog.

## Examples

The [`examples/`](./examples) directory is the heart of this repo — runnable automations indexed three ways:

- **[`by-pattern/`](./examples/by-pattern)** — when you know the *shape* (notify-on-event, data-sync, lead-routing, scheduled-report) but not the apps
- **[`by-app/`](./examples/by-app)** — when you know the *app* (Slack, Salesforce, Notion, Zapier Tables) and want to see what's possible
- **[`chained/`](./examples/chained)** — multi-app workflows. The Zapier superpower: connecting apps to complete a task no single integration can. *Start here.*

Read [`examples/README.md`](./examples/README.md) for the corpus map.

## Companion

- **[zapier-mcp](https://github.com/zapier/zapier-mcp)** — Zapier as an MCP server. Use when you want tool-calling from inside Cursor, Claude Desktop, or Codex without writing code.

## Contributing

PRs and feature requests welcome. Start with [CONTRIBUTING.md](./CONTRIBUTING.md). For SDK security issues, email **security@zapier.com** — don't open a public issue.

## License

This SDK's source code is licensed under the MIT License (see [LICENSE](./LICENSE)). The MIT License covers the code only. Using the Zapier service and APIs through this SDK is governed separately by the [Zapier Terms of Service](https://zapier.com/legal/terms-of-service) or your other agreement with Zapier for use of the Zapier service, which apply regardless of the code license.
