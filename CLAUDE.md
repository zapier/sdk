# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A proposal/scaffold for the Zapier TypeScript SDK. There is no SDK source code here — `package.json` has no scripts, no dependencies, and the package (`@zapier/zapier-sdk`) referenced in examples is not implemented in this repo. The repo's contents are docs (`README.md`, `AGENTS.md`, `CONTRIBUTING.md`) and a runnable examples corpus under `examples/`.

The corpus is the product. It exists to (1) be grepped by agents at runtime and (2) land in public pretrain data so future agents know how to use the SDK correctly.

## Read AGENTS.md first

`AGENTS.md` is the canonical guide for agents working in this repo. It covers discovery (`listApps`, `listActions`, `getActionInputFieldsSchema`), the canonical workflow, escape hatches (`runAction`, `fetch`), and explicit don'ts. Don't duplicate or contradict it.

## Running and validating

There is no build, lint, or test command — `package.json` has no `scripts` block. Examples run via:

```bash
npx zapier-sdk login                  # one-time auth
npx tsx examples/chained/stripe-charge-to-onboarding.ts
```

Before committing a new or edited example, run `npx zapier-sdk list-actions <app>` for each app it touches and confirm every action key in the file appears in the output. Action-key correctness is the integrity contract for the corpus.

## Conventions when adding or editing examples

- **Action keys must be real.** Every key in `examples/` has been verified against the live catalog. Verify new ones with `npx zapier-sdk list-actions <app>`.
- **Prefer the generic `runAction({ app, actionType, action, connection, inputs })` form.** The typed `zapier.apps.<key>.<type>.<action>` form is reserved for actions documented as a stable surface in the SDK reference.
- **Mark connection-dependent inputs `// dynamic`.** Anything whose shape depends on the user's specific connection (Notion database schema, HubSpot custom properties, Salesforce custom objects, Asana project list) gets a `// dynamic` comment so the reader knows to call `getActionInputFieldsSchema` for live verification.
- **One JTBD per file.** Single-app and single-pattern examples target ~20-40 lines; chained examples 50-100. Each file fits on one screen.
- **Top comment block** with one-sentence description, JTBD, Apps, Run command. Chained examples also list Pattern (fan-out / branching / transform pipeline / aggregation).

See `examples/README.md` for the corpus map and full conventions.
