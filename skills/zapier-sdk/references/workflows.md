# Durable workflows

Read this when the user wants to **deploy** something that runs on Zapier's infrastructure (webhook, poll, or schedule) rather than call the SDK from their own process.

## The invariant

Every side-effecting call goes through `ctx.step("<name>-${primaryId}", async () => ...)`. The suffix is the primary id from the payload (charge id, response id, `triggered_at` timestamp). That's what makes a retry safe: replaying the same trigger reuses the same step names and skips work that already succeeded. A workflow without the `${primaryId}` suffix can double-write on retry.

## Plain script vs. durable workflow

| Situation | Use |
|---|---|
| One-off call from a script, Next.js route, CLI, or Lambda you already run | Plain SDK script (`examples/by-app/`) |
| Runs on Zapier's infrastructure on a trigger (webhook, poll, schedule) | Durable workflow (`examples/by-pattern/`) |
| Side effects that must be retry-safe | Durable workflow (`ctx.step` is why the shape exists) |
| Multi-step orchestration across several apps | Durable workflow, one `ctx.step` per side effect |

## The four shapes

Every deployable workflow fits one. Pick the closest match and put the file under `examples/by-pattern/<shape>/<name>/`. Read the shape's `README.md` for full belongs-here rules.

| Shape | Description |
|---|---|
| **notify-on-event** | Trigger to message. Fan-out lives here too. |
| **data-sync** | Read to write, keep two systems consistent. |
| **lead-routing** | Read to decide to write. Has a decision step before the write. |
| **scheduled-report** | Cron to read to summarize. Aggregate output on a timer. |

## Naming

Directory and `defineDurable` slug must match. Form: `<source>-<source-item>-to-<dest>-<dest-item>`, kebab-case, specific on both ends (the repo, the channel, the table, not just the app). Example: `github-marketplace-to-slack-team-agent-discovery-feed`.

## Workflow spine

Copy an existing entry as a template. Every workflow follows this shape:

```typescript
import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Deploy-time constants. Every one gets a row in the README's parameters table.
const GMAIL_CONNECTION = "gmail_primary";
const RECIPIENTS = ["team@example.com"];

const InputSchema = z.object({
  responseId: z.string(),
  respondentEmail: z.string().email(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { sent: boolean }>(
  "typeform-submission-to-gmail",   // must match leaf directory name
  async (ctx, rawInput) => {
    const { responseId, respondentEmail } = InputSchema.parse(rawInput);

    await ctx.step(`send-confirmation-${responseId}`, async () =>
      sdk.runAction({
        appKey: "GoogleMailV2CLIAPI",
        actionType: "write",
        actionKey: "message",
        connection: GMAIL_CONNECTION,
        inputs: { to: [respondentEmail], subject: "Thanks", body: "..." },
      }),
    );

    return { sent: true };
  },
);
```

- `defineDurable<Input, Output>("<slug>", handler)` exported as default. Slug matches leaf directory name.
- `const sdk = createZapierSdk()` at module scope. Runtime injects credentials.
- Top-of-file constants for every value a deployer edits. Each one gets a README parameters-table row.
- Zod `InputSchema` parsed as the handler's first line. This is the contract for what the trigger delivers.
- One `ctx.step` per side effect, keyed by `${primaryId}`.

## Idempotency keys by trigger type

| Trigger | Idempotency key | Example |
|---|---|---|
| Webhook / poll (record-shaped) | Record's primary id | `${responseId}`, `${chargeId}`, `${leadgen_id}` |
| Schedule (Zapier's Schedule app) | Invocation timestamp | `const runId = triggered_at; ctx.step(\`aggregate-${runId}\`, ...)` |
| Per-item loop inside a step | Item's primary id, never the array index | `for (const c of contacts) { await ctx.step(\`upsert-${c.id}\`, ...) }` |

Using an array index as the suffix is a bug. If the upstream reorders on a retry, the wrong step name matches.

## Connections at deploy time

Workflows never store user tokens. Reference each connection by a string alias declared as a top-of-file constant:

```typescript
const HUBSPOT_CONNECTION = "hubspot_primary";
const DISCORD_CONNECTION = "discord_primary";
```

The alias is resolved at deploy time via the `--connections` flag (see [Deploy](#deploy)). A **runtime** SDK script would pass `connection.id` (a UUID) directly. Don't mix the two shapes.

## Dependency pinning (24-hour rule)

Zapier's workflow sandbox installs deps with `pnpm install --config.minimumReleaseAge=1440`. **It rejects any direct dependency published less than 24 hours ago.** Three packages always pin:

| Package | Passed to |
|---|---|
| `@zapier/zapier-sdk` | `--dependencies` |
| `@zapier/zapier-durable` | `--zapier-durable-version` (its own flag) |
| `zod` | `--dependencies` |

Pin exact versions in `package.json` (no `^`, no `~`). To find the newest aged-eligible version:

```bash
npm view @zapier/zapier-sdk time --json
# Take the newest X.Y.Z stable version whose timestamp is >=24h old. No pre-releases.
```

If no stable version >=24h old exists, wait. Do not fall back to a pre-release.

## Deploy

The publish flow uses the CLI's `--experimental` surface. Two commands, in order, and a verify step. Don't skip the verify.

```bash
# 1. Create the workflow container (skip if you already have a workflow_id).
zapier-sdk --experimental create-workflow "<name>" \
  --description "<one-line summary>" --private --json

# 2. Publish a version with the trigger claim.
SOURCE_FILES=$(jq -n --rawfile w workflow.ts '{"workflow.ts": $w}')
zapier-sdk --experimental publish-workflow-version <workflow-id> "$SOURCE_FILES" \
  --dependencies '{"@zapier/zapier-sdk":"<pinned>","zod":"<pinned>"}' \
  --zapier-durable-version '<pinned>' \
  --connections '<connections JSON>' \
  --trigger '{"selected_api":"<AppKey>@<version>","action":"<trigger-key>","authentication_id":"<id>","params":{...}}' \
  --enabled --json

# 3. VERIFY enabled:true. Trigger claims fail silently.
zapier-sdk --experimental get-workflow <workflow-id> --json
```

Three things silently break a trigger claim:

- `selected_api` not versioned (`GitHubCLIAPI` fails; `GitHubCLIAPI@2.5.0` works).
- `params` value types don't match the trigger schema (arrays as arrays, strings as strings). Look them up with `list-action-input-fields`.
- Missing `--enabled`. Workflow deploys but the trigger isn't claimed.

If `get-workflow` returns `enabled: false`, the trigger claim failed. Diagnose against the three causes above. Do NOT report success.

## Catch Hook triggers (`WebHookCLIAPI`)

For `hook_v2` and `hook_raw` triggers, `params` must include two static hex codes generated once at scaffold time:

```typescript
_zap_static_hook_code: "<12-char hex>",   // e.g. openssl rand -hex 6
_zap_static_hook_seed: "<12-char hex>",
```

Bake both into the README so re-publishes reuse them. **Rotating either value mints a new public URL and breaks external callers.**

The public URL external systems POST to is `https://hooks.zapier.com/hooks/catch/<_zap_static_hook_code>/`. That's what goes in the workflow's README as the endpoint. The `code-substrate-workflows.zapier.com/api/v0/workflows/trigger/...` URL requires a Zapier JWT and is only for editor testing. Never surface it externally.

## Test synthetically before deploying

`run-durable` executes the workflow against real connections without publishing. Real side effects. Before running, tell the user which channels/emails/records the workflow will actually touch and get explicit confirmation.

```bash
SOURCE_FILES=$(jq -n --rawfile w workflow.ts '{"workflow.ts": $w}')
zapier-sdk --experimental run-durable "$SOURCE_FILES" \
  --dependencies '{"@zapier/zapier-sdk":"<pinned>","zod":"<pinned>"}' \
  --zapier-durable-version '<pinned>' \
  --connections '<connections JSON>' \
  --input '<sample input JSON>' \
  --private
# Capture the run_id, then poll:
zapier-sdk --experimental get-durable-run <run-id> --json
# Terminal statuses are "finished" or "failed". The initial response usually shows "initialized"; that is not success.
```

## Escape hatches

- **No first-class action?** Use `sdk.fetch(url, { connection, method })` inside a `ctx.step`. Same Zapier auth and audit trail. Examples: bulk HubSpot pull, Stripe charges over a window, Clearbit enrichment (all under `examples/by-pattern/`).
- **Dynamic inputs?** Mark them `// dynamic` in the workflow and tell deployers to run `zapier-sdk list-action-input-fields <app> <type> <action>` against their live connection before setting values.

## Gotchas

- **Never paraphrase action keys.** If `list-actions` returns `channel_message`, write `channel_message`, not `send_channel_message`. Same for app keys (`GoogleMailV2CLIAPI`, not `gmail`) and trigger keys.
- **Step name uniqueness.** Each `ctx.step` name must be unique within one invocation and stable across retries. Two `ctx.step("send-email", ...)` calls in the same run collide.
- **`runAction` always returns `{ data: T[] }`.** Even search-style actions that logically return one record wrap it in an array. Cast at the call site.
- **`is_hidden: true` actions are not stable.** They may work at runtime but aren't guaranteed to keep working. Filter them out before picking an action key.
- **Retries don't roll back committed steps.** If step 3 fails, retry replays steps 1 and 2 by name (which short-circuit) and re-attempts step 3. If step 1 wrote externally, that side effect stays. Design writes to be safe to retry.
- **Deploy-time constants vs. runtime inputs.** Values a deployer sets once (connection aliases, database ids, channel ids) → top-of-file constants. Values that vary per invocation (record ids, timestamps, form fields) → `InputSchema`.
- **Don't overwrite existing workflow directories.** Refuse to scaffold into a directory that already exists.

## Where to look next

- Minimal workflow: [`examples/by-pattern/notify-on-event/typeform-submission-to-gmail/workflow.ts`](../../../examples/by-pattern/notify-on-event/typeform-submission-to-gmail/workflow.ts)
- Multi-step with branching + `sdk.fetch`: [`examples/by-pattern/lead-routing/inbound-lead-orchestration/workflow.ts`](../../../examples/by-pattern/lead-routing/inbound-lead-orchestration/workflow.ts)
- Scheduled trigger with a computed window: [`examples/by-pattern/scheduled-report/daily-revenue-summary/workflow.ts`](../../../examples/by-pattern/scheduled-report/daily-revenue-summary/workflow.ts)
- Corpus conventions: [`examples/by-pattern/README.md`](../../../examples/by-pattern/README.md)
- Shape belongs-here rules: `examples/by-pattern/*/README.md`

## Investigation before authoring (Claude Code only)

Before writing a new `workflow.ts`, offload the "what are the exact keys and IDs" question to the [`zapier-sdk-explorer`](../../../agents/zapier-sdk-explorer.md) subagent. It runs read-only against the live catalog, returns a structured build plan with citations for every identifier, and keeps the raw JSON dumps out of your main context. Only available in Claude Code; ignore this section elsewhere.
