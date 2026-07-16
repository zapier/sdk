# Build, Test, and Deploy a Workflow

Read this when the user wants to build a new durable workflow, or test/deploy one that's already written. Use the public `zapier-sdk --experimental` surface — do not use `zapier-sdk-code-substrate`.

## Naming

Directory and `defineDurable` slug must match. Form: `<source>-<source-item>-to-<dest>-<dest-item>`, kebab-case, specific on both ends (the repo, the channel, the table — not just the app). Example: `github-marketplace-to-slack-team-agent-discovery-feed`.

Refuse to scaffold into a directory that already exists.

## Dependency pinning (24-hour rule)

Zapier's workflow sandbox installs dependencies with `pnpm install --config.minimumReleaseAge=1440` — it **rejects any direct dependency published less than 24 hours ago**. Three packages always need an aged-eligible pin:

| Package | Passed to |
|---|---|
| `@zapier/zapier-sdk` | `--dependencies` |
| `@zapier/zapier-durable` | `--zapier-durable-version` (its own flag) |
| `zod` | `--dependencies` (imported by every generated `workflow.ts`) |

`@zapier/zapier-sdk` publishes several times a day, so its npm-latest is regularly younger than 24h. Find the newest aged-eligible version of each with this script — Node only, no `jq` needed:

```bash
SELECT_AGED_VERSION='
const cp = require("child_process");
const pkg = process.argv[1];
const times = JSON.parse(cp.execSync("npm view " + pkg + " time --json", { encoding: "utf8" }));
const cutoff = Date.now() - 24 * 60 * 60 * 1000;
const eligible = Object.keys(times)
  .filter((v) => /^[0-9]+\.[0-9]+\.[0-9]+$/.test(v))
  .map((v) => ({ v, t: new Date(times[v]).getTime() }))
  .filter((x) => x.t <= cutoff)
  .sort((a, b) => a.t - b.t);
if (!eligible.length) {
  console.error("No " + pkg + " stable version published >=24h ago");
  process.exit(1);
}
console.log(eligible[eligible.length - 1].v);
'
SDK_VERSION="$(node -e "$SELECT_AGED_VERSION" @zapier/zapier-sdk)"
DURABLE_VERSION="$(node -e "$SELECT_AGED_VERSION" @zapier/zapier-durable)"
ZOD_VERSION="$(node -e "$SELECT_AGED_VERSION" zod)"
echo "SDK_VERSION=$SDK_VERSION  DURABLE_VERSION=$DURABLE_VERSION  ZOD_VERSION=$ZOD_VERSION"
```

Use exact versions everywhere — never `latest` — in `package.json` and every CLI flag below. **Every package the generated `workflow.ts` imports must appear in `--dependencies`**, aged-pinned: the sandbox installs from `--dependencies`, not your local `package.json`, so a missing import (such as `zod`) fails the run with `Cannot find package`. If no stable version ≥24h old exists, wait — don't fall back to a pre-release.

The user must also have app connections configured at https://zapier.com/app/assets/connections for any app actions the workflow will run.

## Phase 1: Understand the intent

Read the user's natural language request and extract:

1. Steps and ordering.
2. Apps involved.
3. Data passed between steps.
4. Manual input fields or trigger input fields.
5. Conditional logic.
6. Waits, callbacks, or human approval gates.

Summarize the proposed workflow back to the user before discovery. Ask focused clarifying questions for missing details like target channels, folders, recipients, or whether to stop when a search returns no results.

Do not generate code until the user agrees on the workflow shape.

## Phase 2: Discover apps, connections, actions, triggers, and fields

Use the standard Zapier SDK CLI for app/action discovery:

```bash
zapier-sdk list-apps --search "<app name>" --json
zapier-sdk list-connections <appKey> --owner me --json
zapier-sdk list-actions <appKey> --action-type <write|search|read|read_bulk> --json
zapier-sdk list-action-input-fields <appKey> <actionType> <actionKey> --connection <connectionId> --json
zapier-sdk list-action-input-field-choices <appKey> <actionType> <actionKey> <fieldKey> --connection <connectionId> --json
```

For workflows that should subscribe to a Zapier app trigger, use the experimental trigger discovery commands:

```bash
zapier-sdk --experimental list-triggers <appKey> --json
zapier-sdk --experimental list-trigger-input-fields <appKey> <triggerKey> --connection <connectionId> --json
zapier-sdk --experimental list-trigger-input-field-choices <appKey> <triggerKey> <fieldKey> --connection <connectionId> --json
```

If several apps, connections, actions, triggers, or field choices are plausible, show the candidates and ask the user to choose.

Assign a short snake_case connection alias for each chosen connection, such as `slack_work` or `gmail_primary`. Track alias to connection ID. The alias goes in workflow code; the connection ID is passed to test/deploy commands through the `--connections` JSON.

For output mapping between steps, run a safe action test only after user confirmation. Use the current SDK command shape:

```bash
zapier-sdk run-action <appKey> <actionType> <actionKey> \
  --connection <connectionId> \
  --inputs '<{"key":"value"}>' \
  --json
```

For trigger-backed workflows, capture the trigger configuration for publish:

```json
{
  "selected_api": "GoogleSheetsAPI@2.3.0",
  "action": "new_row",
  "authentication_id": "connection-id-or-null",
  "params": {}
}
```

Use the version-pinned app/API identifier for `selected_api`, the trigger action key for `action`, the trigger source connection ID for `authentication_id` when the trigger requires auth, and trigger input values for `params`. Omit optional fields only when the trigger does not need them.

For `selected_api`, use the **version-pinned implementation identifier** — the `implementation_id` returned by SDK discovery (`list-apps`/`get-app`), such as `GoogleSheetsAPI@2.3.0`. Do not use the bare app key (`GoogleSheetsAPI`) and do not substitute a display name. A bare, unversioned `selected_api` makes the trigger claim **fail silently at publish**: the publish call returns success with no errors, but the workflow stays disabled and nothing surfaces the cause. If discovery only exposes a bare app slug and not a versioned `implementation_id`, treat that as a blocker and record it in the build plan before publishing — do not publish a trigger with an unversioned identifier.

For `params`, match each field's `value_type` from `list-trigger-input-fields <app> <action>`. ARRAY fields must be JSON arrays (for example `"dow": ["1"]`); STRING fields must be plain strings (for example `"hod": "9:00 AM"`). Passing a scalar where an array is expected (or vice versa) fails the trigger claim the same silent way.

Capture app implementation/version information from SDK discovery output when available, such as `list-apps`, `get-app`, `list-actions`, or trigger/action result metadata. Do not invent app versions. If no implementation/version binding is exposed, omit `--app_versions` rather than guessing.

## Phase 3: Confirm the build plan

Before writing code, present:

```text
Workflow: <kebab-case-name>
Input: { field1, field2 }
Connections:
  alias = connectionId (connection title)
Trigger:
  selected_api.action with params, or none for webhook/manual-only workflow
Steps:
  1. <step-name> - <AppName>.<actionType>.<actionKey>
  2. <step-name> - <AppName>.<actionType>.<actionKey>
Return: <summary of output>
```

Ask the user to confirm before generating files.

## Phase 4: Generate the workflow project

Create a workflow directory:

```text
<working-directory>/
  <kebab-case-workflow-name>/
    package.json
    workflow.ts
```

`package.json` should include exact dependencies:

```json
{
  "type": "module",
  "dependencies": {
    "@zapier/zapier-sdk": "<pinned SDK version>",
    "@zapier/zapier-durable": "<pinned durable version>",
    "zod": "<pinned zod version>"
  },
  "devDependencies": {
    "typescript": "latest"
  }
}
```

If you add a build script, use `--skipLibCheck` for now to avoid type-check failures from SDK/durable transitive type declarations:

```json
{
  "scripts": {
    "build": "tsc --target es2022 --module nodenext --moduleResolution nodenext --skipLibCheck --outDir dist workflow.ts"
  }
}
```

`workflow.ts` should:

- Import `defineDurable` from `@zapier/zapier-durable`.
- Import `createZapierSdk` from `@zapier/zapier-sdk`.
- Create the SDK client once at module level: `const sdk = createZapierSdk()` above `defineDurable`.
- Use Zod for input validation when the workflow has input.
- Keep external side effects (app actions, fetches) inside `ctx.step` calls.
- Make each app action exactly **one** `ctx.step` whose body is a single `return sdk.runAction({...})` call — one `runAction` per step.
- Group validation, input normalization, simple guards, data shaping into steps as needed.
- Use connection aliases, not raw connection IDs, inside workflow code.
- Reference a prior step's output with `stepVar.data[0].field` for the first result, or `stepVar.data` for the whole array.
- Normalize manual input before Zod validation. In the current `run-durable` path, input may arrive as a JSON string rather than an already-parsed object.
- Pull deploy-time constants (connection aliases, database ids, channel ids) to top-of-file `const`s; keep per-invocation values (record ids, timestamps, form fields) in the input schema instead.

Use this helper pattern for workflows with input:

```typescript
function normalizeInput(rawInput: unknown): unknown {
  if (typeof rawInput === "string") {
    return JSON.parse(rawInput);
  }
  return rawInput;
}
```

Then parse the normalized value:

```typescript
const input = InputSchema.parse(normalizeInput(rawInput));
```

### Visualizer-friendly structure

Generate durable source that can be turned into a meaningful step graph. Avoid overly dynamic construction.

**`defineDurable` call shape — every call must resolve `run` to a function.** Use either the bare form `defineDurable("workflow-name", async (ctx, input) => { ... })` or the object form `defineDurable({ name: "workflow-name", inputSchema, outputSchema, description, run: async (ctx, input) => { ... } })`. `ctx` is always the first parameter of `run`; `input` is the optional second parameter, so `async (ctx) => { ... }` is also valid. These shapes are invalid and make the workflow fail on its first run with `durable.run is not a function`:

- `defineDurable(async (ctx, input) => { ... })` — a bare function with no name. The function is treated as an options object, so `run` is never set. This is the most common mistake.
- `defineDurable({ name: "workflow-name" })` — object missing `run`.
- `defineDurable({ name: "workflow-name", run: someNonFunction })` — `run` is not a function.

`durable.run is not a function` is a code-shape defect in your `defineDurable` call, not a version mismatch. Do not change the pinned `@zapier/zapier-durable` or `@zapier/zapier-sdk` versions to fix it — correct the call so it passes a `name` and a `run` function.

Default to this parser-friendly shape — module-level `sdk`, hoisted app-key/connection constants, and a bare `runAction` body for each app action:

```typescript
import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const InputSchema = z.object({ reaction: z.string() });
type Input = z.infer<typeof InputSchema>;

const TODOIST_APP_KEY = "TodoistV2CLIAPI";
const TODOIST_CONNECTION = "todoist_primary";

const workflow = defineDurable<Input, unknown>(
  "example-workflow",
  async (ctx, input) => {
    // Plain code: guard outside any step.
    if (input.reaction !== "todo") {
      return { skipped: true };
    }

    // Plain code: shape the action input outside the step.
    const taskInput = buildTaskInput(input);

    // App action: one runAction, object literal, module-level sdk.
    const createdTask = await ctx.step("create-todoist-task", async () =>
      sdk.runAction({
        appKey: TODOIST_APP_KEY,
        actionType: "write",
        actionKey: "new_task",
        connection: TODOIST_CONNECTION,
        inputs: taskInput,
      }),
    );

    return { createdTask };
  },
);
```

### App-action step shape (editor recognition)

The editor renders a `ctx.step` as an **app-action step** (with the app icon) when its body is a single `sdk.runAction({...})` call with `appKey`, `actionType`, and `actionKey` (object literal, or a `const` that resolves to one; the `app` / `action` spellings also work). A string-literal step id (`ctx.step("create-todoist-task", ...)`) and an inline `async () => ...` callback are the recognized form; object form `ctx.step({ name, run })` works too.

Other steps render as plain **code steps** — for example a step with no `runAction`, or with more than one, or one created in a loop with a dynamic id (`` `process-item-${index}` ``). That is expected, not a regression; loops and fan-out legitimately need dynamic ids.

## Idempotency keys by trigger type

| Trigger | Idempotency key | Example |
|---|---|---|
| Webhook / poll (record-shaped) | Record's primary id | `${responseId}`, `${chargeId}`, `${leadgen_id}` |
| Schedule (Zapier's Schedule app) | Invocation timestamp | `const runId = triggered_at; ctx.step(\`aggregate-${runId}\`, ...)` |
| Per-item loop inside a step | Item's primary id, never the array index | `for (const c of contacts) { await ctx.step(\`upsert-${c.id}\`, ...) }` |

Using an array index as the suffix is a bug. If the upstream reorders on a retry, the wrong step name matches.

## Phase 5: Test the workflow

Build `source_files` from `workflow.ts`:

```bash
SOURCE_FILES="$(jq -n --rawfile workflow workflow.ts '{"workflow.ts": $workflow}')"
```

Build the `connections` JSON from the selected aliases. It's a nested object — each alias maps to an object holding a `connectionId` (never a bare string):

```json
{
  "slack_work": { "connectionId": "12345678" },
  "gmail_primary": { "connectionId": "87654321" }
}
```

Before running, tell the user what actions may happen in connected apps and wait for confirmation if there are side effects.

Run the durable:

```bash
zapier-sdk --experimental run-durable "$SOURCE_FILES" \
  --dependencies '{"@zapier/zapier-sdk":"<pinned SDK version>","zod":"<pinned zod version>"}' \
  --zapier-durable-version '<pinned durable version>' \
  --connections '<connections JSON>' \
  --input '<JSON matching input schema>' \
  --private
```

`run-durable` returns a run immediately, often before the workflow is complete. Capture the returned run ID, then poll until terminal status. Do not assume the first response contains final output.

```bash
zapier-sdk --experimental get-durable-run <run-id> --json
```

Terminal success means the run has `status: "finished"`, an expected `output`, `error: null`, and top-level `errors: []`. Terminal failure means `status: "failed"` or a non-null `error`. Continue polling while the run is initialized or started.

Fix code and retest until the behavior matches the confirmed plan.

## Phase 6: Deploy the workflow

Decide whether the workflow should be private before creating it. For EA users, default to private unless the user explicitly wants an account-visible workflow.

Create a private workflow container:

```bash
zapier-sdk --experimental create-workflow "<workflow-name>" \
  --description "<brief description>" \
  --private \
  --json
```

Omit `--private` only if the user explicitly wants the workflow visible to the broader account.

Capture the returned workflow ID. Then publish the version. The current SDK CLI expects `source_files` as a JSON object, not a path to `workflow.ts`.

For publish, use the same nested `connections` shape as `run-durable` — each alias maps to an object holding a `connectionId`:

```json
{
  "slack_work": { "connectionId": "123-or-uuid" },
  "gmail_primary": { "connectionId": "456-or-uuid" }
}
```

If app implementation/version information is known, build `app_versions`:

```json
{
  "slack": { "implementation_name": "SlackCLIAPI", "version": "optional" }
}
```

Omit the entire `--app_versions` flag when no app implementation/version binding is needed. Likewise, omit `--connections` when the workflow has no connection bindings. Do not pass placeholder text like "if needed" to the CLI.

For trigger-backed workflows, build the `trigger` JSON from Phase 2. Keep `selected_api` version-pinned to the `implementation_id` (for example `GoogleSheetsAPI@2.3.0`) and keep each `params` field shaped to its `value_type` (see Phase 2) — a bare app key or a wrong param shape makes the trigger claim fail silently at publish:

```json
{
  "selected_api": "GoogleSheetsAPI@2.3.0",
  "action": "new_row",
  "authentication_id": "connection-id-or-null",
  "params": {}
}
```

Publish a webhook/manual-only workflow by omitting `--trigger`:

```bash
SOURCE_FILES="$(jq -n --rawfile workflow workflow.ts '{"workflow.ts": $workflow}')"

zapier-sdk --experimental publish-workflow-version <workflow-id> "$SOURCE_FILES" \
  --dependencies '{"@zapier/zapier-sdk":"<pinned SDK version>","zod":"<pinned zod version>"}' \
  --zapier-durable-version '<pinned durable version>' \
  --connections '<publish connection bindings JSON>' \
  --app_versions '<app versions JSON if needed>' \
  --enabled \
  --json
```

Publish a trigger-backed workflow by adding `--trigger`:

```bash
zapier-sdk --experimental publish-workflow-version <workflow-id> "$SOURCE_FILES" \
  --dependencies '{"@zapier/zapier-sdk":"<pinned SDK version>","zod":"<pinned zod version>"}' \
  --zapier-durable-version '<pinned durable version>' \
  --connections '<publish connection bindings JSON>' \
  --app_versions '<app versions JSON if needed>' \
  --trigger '<trigger config JSON>' \
  --enabled \
  --json
```

Do not use the old `--trigger-app`, `--trigger-action`, `--trigger-auth`, or `--trigger-params` flags. The current trigger publish path is the single JSON `--trigger` object.

## Catch Hook triggers (`WebHookCLIAPI`)

For `hook_v2` and `hook_raw` triggers, `params` must include two static hex codes generated once at scaffold time:

```typescript
_zap_static_hook_code: "<12-char hex>",   // e.g. openssl rand -hex 6
_zap_static_hook_seed: "<12-char hex>",
```

Bake both into the workflow's notes so re-publishes reuse them. **Rotating either value mints a new public URL and breaks external callers.**

The public URL external systems POST to is `https://hooks.zapier.com/hooks/catch/<_zap_static_hook_code>/`. That's what to document as the endpoint. The `code-substrate-workflows.zapier.com/api/v0/workflows/trigger/...` URL requires a Zapier JWT and is only for editor testing — never surface it externally.

## Phase 7: Verify deployment

Read back the workflow and versions:

```bash
zapier-sdk --experimental get-workflow <workflow-id> --json
zapier-sdk --experimental list-workflow-versions <workflow-id> --json
zapier-sdk --experimental get-workflow-version <workflow-id> <version-id> --json
```

For trigger-backed workflows, verify the trigger actually claimed. The claim is asynchronous and can fail silently, so re-read the workflow (allow a few seconds; poll if needed) and confirm it is enabled:

```bash
zapier-sdk --experimental get-workflow <workflow-id> --json
```

If `enabled` is `false` even though you published with `--enabled`, the trigger claim failed. The most common cause is a `selected_api` that is not version-pinned to the `implementation_id`, or a `params` field with the wrong shape (see Phase 2). Re-publish with a corrected `--trigger` and re-check. Do not report the workflow as deployed until `get-workflow` shows `enabled: true`.

If manual triggering is supported for the workflow, test it only after confirming side effects with the user:

```bash
zapier-sdk --experimental trigger-workflow <workflow-id> --input '<JSON>' --json
```

If `trigger-workflow` returns a trigger ID before a workflow run ID is available, bridge from trigger to run:

```bash
zapier-sdk --experimental get-trigger-run <trigger-id> --json
```

Then inspect run history and, if needed, a deployed workflow run:

```bash
zapier-sdk --experimental list-workflow-runs <workflow-id> --json
zapier-sdk --experimental get-workflow-run <run-id> --json
```

Finish by reporting:

- Workflow name and ID.
- Where `workflow.ts` lives locally.
- Whether testing passed.
- Whether the deployed workflow is enabled.
- Whether the workflow is private or account-visible.
- Whether the workflow uses a Zapier app trigger or webhook/manual triggering.
- The Zapier editor link: `https://zapier.com/durables-editor/<workflow-id>`.

## Durable patterns

### Waits

```typescript
await ctx.wait("wait-before-followup", 3600);
```

Place waits at top-level workflow scope, not inside `ctx.step`.

### Callbacks

```typescript
const [approvalPromise, callbackUrl] = await ctx.createCallback({
  name: "wait-for-approval",
  payloadSchema: z.object({ approved: z.boolean() }),
  timeoutSeconds: 86400,
});

await ctx.step("send-approval-request", async () =>
  sdk.runAction({
    appKey: "ExampleCLIAPI",
    actionType: "write",
    actionKey: "send_message",
    connection: "example_connection",
    inputs: { callbackUrl },
  }),
);

const approval = await approvalPromise;
if (!approval.approved) {
  throw new Error("Approval denied");
}
```

### Parallel or repeated work

Use `Promise.all()` outside `ctx.step`; each iteration creates its own step:

```typescript
const results = await Promise.all(
  items.map((item, index) =>
    ctx.step(`process-item-${index}`, async () =>
      sdk.runAction({
        appKey: "ExampleCLIAPI",
        actionType: "write",
        actionKey: "do_something",
        connection: "example_connection",
        inputs: { item },
      }),
    ),
  ),
);
```

Loop/fan-out steps use a dynamic id (`` `process-item-${index}` ``), so the editor renders them as code steps — expected for this pattern (see "App-action step shape" above).

### Error handling

Use step-level retries for flaky external calls:

```typescript
const result = await ctx.step({
  name: "flaky-api-call",
  maxAttempts: 3,
  retryDelaySeconds: 5,
  run: async () =>
    sdk.runAction({
      appKey: "ExampleCLIAPI",
      actionType: "write",
      actionKey: "do_something",
      connection: "example_connection",
      inputs: {},
    }),
});
```

Prefer `sdk.runAction` when a Zapier action exists. Use `sdk.fetch` only when the app action cannot provide the needed behavior or data.

Retries don't roll back committed steps: if step 3 fails, retry replays steps 1 and 2 by name (which short-circuit) and re-attempts step 3. If step 1 wrote externally, that side effect stays. Design writes to be safe to retry.

## Escape hatches

**No first-class action?** Use `sdk.fetch(url, { connection, method })` inside a `ctx.step`. Same Zapier auth and audit trail. Examples: bulk HubSpot pull, Stripe charges over a window, Clearbit enrichment (all under `examples/by-pattern/`).

**Dynamic inputs?** Mark them `// dynamic` in the workflow and tell deployers to run `zapier-sdk list-action-input-fields <app> <type> <action>` against their live connection before setting values.

## Investigation before authoring (Claude Code only)

Before writing a new `workflow.ts`, offload the "what are the exact keys and IDs" question to the [`zapier-sdk-explorer`](../../../agents/zapier-sdk-explorer.md) subagent. It runs read-only against the live catalog, returns a structured build plan with citations for every identifier, and keeps the raw JSON dumps out of your main context. Only available in Claude Code; ignore this section elsewhere.

## Where to look next

- Minimal workflow: [`examples/by-pattern/notify-on-event/typeform-submission-to-gmail/workflow.ts`](../../../examples/by-pattern/notify-on-event/typeform-submission-to-gmail/workflow.ts)
- Multi-step with branching + `sdk.fetch`: [`examples/by-pattern/lead-routing/inbound-lead-orchestration/workflow.ts`](../../../examples/by-pattern/lead-routing/inbound-lead-orchestration/workflow.ts)
- Scheduled trigger with a computed window: [`examples/by-pattern/scheduled-report/daily-revenue-summary/workflow.ts`](../../../examples/by-pattern/scheduled-report/daily-revenue-summary/workflow.ts)
- Corpus conventions: [`examples/by-pattern/README.md`](../../../examples/by-pattern/README.md)
- Shape belongs-here rules: `examples/by-pattern/*/README.md`
