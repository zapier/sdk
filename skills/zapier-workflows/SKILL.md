---
name: zapier-workflows
description: |
  Build, test, deploy, list, inspect, and modify durable Zapier workflows (Code Workflows) — code that Zapier's
  infrastructure runs on a trigger (webhook, poll, schedule), not in your own process. Use when the user wants to
  build a Zapier workflow, create an automation, write a durable workflow, "build me a Zap that...", deploy code
  to Zapier, list their workflows or Zaps, check workflow run history, or fix/modify/republish an existing workflow.
license: MIT
metadata:
  author: zapier
---

# Zapier Workflows

Durable workflows are code that runs **on Zapier's infrastructure**, triggered by a webhook, a poll, or a schedule — not in the user's own process. If the user just wants to make one authenticated API call from their own script, Next.js route, or Lambda, that's the plain SDK — use the `zapier-sdk` skill instead.

## Prerequisites

```bash
zapier-sdk --version
zapier-sdk get-profile --json
zapier-sdk --experimental --help
```

If any of these fail — CLI missing, not logged in, or no Code Workflows commands in the `--experimental` help output — read [`references/setup.md`](references/setup.md) for the full install/auth/access-check flow before continuing.

Zapier Workflows is currently a closed beta (EA). `list-workflows` returning an allowlist/permission/JWT error means the account isn't in the beta yet — `references/setup.md` has the exact message to give the user.

## The core invariant

Every side-effecting call goes through `ctx.step("<name>-${primaryId}", async () => ...)`. The suffix is the primary id from the trigger payload (charge id, response id, or a timestamp for scheduled runs). That's what makes a retry safe: replaying the same trigger reuses the same step names and skips work that already succeeded. Omit the suffix and a retry can double-write.

## Plain script vs. durable workflow

| Situation | Use |
|---|---|
| One-off call from a script, Next.js route, CLI, or Lambda the user already runs | Plain SDK script — `zapier-sdk` skill |
| Runs on Zapier's infrastructure on a trigger (webhook, poll, schedule) | Durable workflow (this skill) |
| Side effects that must be retry-safe | Durable workflow — `ctx.step` is why the shape exists |
| Multi-step orchestration across several apps | Durable workflow, one `ctx.step` per side effect |

## The four shapes

Every deployable workflow fits one. Pick the closest match — `references/build-and-deploy.md` has the belongs-here rules and naming convention for each.

| Shape | Description |
|---|---|
| **notify-on-event** | Trigger to message. Fan-out lives here too. |
| **data-sync** | Read to write, keep two systems consistent. |
| **lead-routing** | Read to decide to write. Has a decision step before the write. |
| **scheduled-report** | Cron to read to summarize. Aggregate output on a timer. |

## What to do next

- Building, testing, or deploying a new workflow → [`references/build-and-deploy.md`](references/build-and-deploy.md)
- Listing workflows or checking run history → [`references/list-and-history.md`](references/list-and-history.md)
- Fixing, editing, or republishing an existing workflow → [`references/modify.md`](references/modify.md)
- SDK CLI missing, not authenticated, or Workflows EA access is unclear → [`references/setup.md`](references/setup.md)

## Cross-cutting gotchas

These apply no matter which task above you're doing.

- **The SDK CLI ships continuously; this skill does not pin a compatible version.** If a command or flag documented in the references is missing from `zapier-sdk --experimental <command> --help`, trust the live `--help` output over these instructions and adapt.
- **Trigger claims fail silently.** Publishing a trigger-backed workflow version can return success while the workflow stays disabled. Always re-read `get-workflow` after publish and confirm `enabled: true` before reporting success — see `references/build-and-deploy.md` for the specific causes.
- **Connection bindings are a nested object, never a bare string.** `{"slack_work": {"connectionId": "123"}}`, not `{"slack_work": "123"}`. Same shape for `run-durable`, `publish-workflow-version`, and any republish.
- **`runAction` always returns `{ data: T[] }`**, even for search-style actions that logically return one record. Cast/destructure at the call site.
- **Never paraphrase action, app, or trigger keys.** If `list-actions` returns `channel_message`, write `channel_message`, not `send_channel_message`.
- **`is_hidden: true` actions are not on the stable surface.** They may run, but Zapier makes no promise they keep working — filter them out before picking an action key.
- **Do not use `zapier-sdk-code-substrate`.** That's the legacy private CLI path. The public `zapier-sdk --experimental` surface is the only supported route for everything in this skill.

## Full documentation

- Quickstart: https://docs.zapier.com/sdk/quickstart.md
- CLI Reference: https://docs.zapier.com/sdk/cli-reference.md
- All docs index: https://docs.zapier.com/llms.txt
- Example workflows: https://github.com/zapier/sdk/tree/main/examples/by-pattern
