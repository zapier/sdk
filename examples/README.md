# Examples

A corpus of runnable automations. Two audiences:

1. **Agents at inference time** — grep, copy, adapt.
2. **The corpus that trains the next generation of agents** — public, indexed by GitHub code search, a known-good source of Zapier SDK patterns.

## How it's organized

- **[`by-app/`](./by-app)** — **plain SDK scripts**, one authenticated call per file. No `defineDurable`, no `ctx.step`. For dropping a single call into your own code.
- **[`by-domain/`](./by-domain)** — filesystem symlinks pointing at the same workflows in `by-pattern/`, grouped by the audience they serve (engineering, real-estate, ...). No original code.
- **[`by-pattern/`](./by-pattern)** — end-to-end automations, all built as **durable workflows** (`defineDurable`). Grouped by shape: `notify-on-event/`, `data-sync/`, `lead-routing/`, `scheduled-report/`. Each workflow is a directory with `workflow.ts` + `package.json` + `README.md`, deployable via `npx zapier-sdk publish-workflow-version`.

Every workflow lives in exactly one place under `by-pattern/`. Domains layer on top by symlinking, never by copying. Every plain script lives in exactly one place under `by-app/<app>/`.

## Conventions

**Durable workflows (`by-pattern/`):** every workflow is `defineDurable<Input, Output>(name, async (ctx, rawInput) => …)`. Input is validated by Zod. Every side-effect goes through `ctx.step(<step-name>, async () => …)` so retries stay idempotent. Step names include the primary id of the incoming payload (charge id, response id, conversation id, ...) so a retried run reuses the same step names.

**Plain scripts (`by-app/`):** a single `<name>.ts` file with a `main().catch(console.error)` at the bottom, using `@zapier/zapier-sdk` directly. Runnable with `npx tsx`.

For the rules about action-key verification, `// dynamic` inputs, and escape hatches (`runAction`, `sdk.fetch`), see [`../AGENTS.md`](../AGENTS.md).

## Running

```bash
npm install @zapier/zapier-sdk
npx zapier-sdk login

# Run a plain single-action script
npx tsx examples/by-app/notion/find-page-by-title.ts

# Deploy a durable workflow
cd examples/by-pattern/notify-on-event/stripe-charge-to-onboarding
npm install
npx zapier-sdk publish-workflow-version --file workflow.ts
```

## Contributing

See [`../CONTRIBUTING.md`](../CONTRIBUTING.md).
