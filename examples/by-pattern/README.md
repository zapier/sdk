# by-pattern

End-to-end automations grouped by their **shape** — the job-to-be-done abstracted from the specific apps involved. Every workflow here is a **durable workflow** (`defineDurable`), deployable via `zapier-sdk publish-workflow-version`.

Use these when you know what you want the automation to *do* but don't yet know which apps you'll wire together.

## How it's organized

Each subdirectory is a distinct automation shape (notify-on-event, data-sync, lead-routing, ...). Each entry inside a shape is a directory with `workflow.ts` + `package.json` + `README.md`. Multi-app orchestration lives inside whichever shape best matches the trigger.

Browse subdirectories directly to see what's covered.

## Deploying a durable workflow

Every leaf directory here follows the same deploy loop:

```bash
npm install
npx tsc --noEmit workflow.ts
npx zapier-sdk publish-workflow-version --file workflow.ts
```

Each leaf's README covers only what's specific to that workflow: parameters, discovery commands, and any routing logic inside `workflow.ts`.

## Contributing a new `by-pattern/` workflow

See [`../../CONTRIBUTING.md`](../../CONTRIBUTING.md) for the corpus-wide rules. Local rules:

1. If your workflow fits an existing shape, use it. If it truly doesn't, add a new subdirectory — but only if you expect a handful of workflows to live there. Resist expanding the taxonomy for one-offs.
2. Create `<source-to-destination>/` with `workflow.ts` + `package.json` + `README.md`. Copy any existing entry as a template.
3. Parameterize with constants at the top of `workflow.ts`; every "edit before deploy" value gets a matching row in the README's parameters table.
4. If it serves a specific audience, symlink it from `by-domain/<slug>/`.
