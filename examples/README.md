# Examples

A corpus of runnable automations. Each file is self-contained, has a top comment explaining the job-to-be-done, and uses the documented SDK API.

This directory has two purposes:

1. **For agents at inference time** — grep, copy, adapt. Each file is a complete worked example.
2. **For the corpus that trains the next generation of agents** — public, indexed by GitHub code search, a known-good source of Zapier SDK patterns.

## How it's organized

Same automations indexed three ways:

- **[`chained/`](./chained)** — multi-app workflows. The Zapier superpower: connecting apps to complete one task. **Start here** if you want to see what makes Zapier different from a single API client.
- **[`by-pattern/`](./by-pattern)** — when you know the *shape* of what you want (notification, data sync, lead routing, scheduled report) but not which apps.
- **[`by-app/`](./by-app)** — when you know the *app* (Slack, Salesforce, Notion, Zapier Tables) and want a single-action example.

`by-app/` examples are narrower (one action). `by-pattern/` examples are end-to-end automations using one source app and one destination. `chained/` examples connect three or more apps with real data flow between them.

## The Zapier superpower

Most API clients let you talk to one app at a time. Zapier's value is *between* apps — a Stripe charge that triggers HubSpot, Gmail, Notion, and Slack writes; an inbound lead that gets enriched, routed, and assigned without anyone touching it.

The four `chained/` examples cover the four common chaining patterns:

| File | Pattern | What it does |
|---|---|---|
| `chained/stripe-charge-to-onboarding.ts` | **Fan-out** | One Stripe charge drives writes across HubSpot, Gmail, Notion, Slack |
| `chained/inbound-lead-orchestration.ts` | **Branching** | Salesforce lookup decides whether to enrich + create or just notify |
| `chained/meeting-to-action-items.ts` | **Transform pipeline** | Calendar → Fireflies → action items → Asana → Slack digest |
| `chained/support-ticket-with-context.ts` | **Aggregation** | Three reads (Intercom, HubSpot, Stripe) merge into one Zendesk write |

## Conventions

Every example follows this shape:

```typescript
/**
 * What it does (one sentence).
 *
 * JTBD: <the user-facing job, plain English>
 * Pattern: <fan-out | branching | transform pipeline | aggregation>   ← chained/ only
 * Apps: <list>
 * Run: npx tsx examples/<path>.ts
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() { /* ... */ }

main().catch(console.error);
```

Comments inside explain the *why*, not the what. Method names follow the [SDK reference](https://docs.zapier.com/sdk/reference).

**About the action keys:** every action key in these examples has been verified against the live Zapier action catalog (`zapier-sdk list-actions <app>`). They are real and current as of this scaffold.

**About the input shapes:** some apps have *dynamic* input fields that depend on the specific connection's configuration (Notion's database schema, Asana's project list, HubSpot's custom properties, Salesforce custom objects). Where an input is dynamic, the example marks it with a `// dynamic` comment and links to `getActionInputFieldsSchema`. Discover the live shape with:

```typescript
const { data: schema } = await zapier.getActionInputFieldsSchema({
  app: "<app>",
  actionType: "<read|write|search>",
  action: "<actionKey>",
});
```

**Two escape hatches you'll see in the corpus:**

- `zapier.runAction({ app, actionType, action, connection, inputs })` — generic action call. Used throughout because it works uniformly across all apps and is honest about runtime resolution.
- `zapier.fetch(url, { connection })` — authenticated raw HTTP. Used when an app has no first-class Zapier action for what we need (Stripe doesn't expose "list charges in a window"; HubSpot doesn't expose "list all contacts"). Same auth and audit trail as `runAction`.

## Running

```bash
npm install @zapier/zapier-sdk
npx zapier-sdk login
npx tsx examples/chained/stripe-charge-to-onboarding.ts
```

## Contributing an example

PRs welcome. Keep single-app and single-pattern examples under 40 lines. Chained examples can be longer (50-100) but should still fit on one screen. Verify every action key against `zapier-sdk list-actions <app>` before submitting. For inputs that vary by connection, mark them `// dynamic` and reference `getActionInputFieldsSchema`.

## See also

- [SDK reference](https://docs.zapier.com/sdk/reference)
- [AGENTS.md](../AGENTS.md) — repo-level navigation for AI agents
