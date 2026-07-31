# Modify an Existing Workflow

Read this when the user asks to fix, update, edit, or republish an existing deployed workflow. Use the public `zapier-sdk --experimental` surface — do not use `zapier-sdk-code-substrate`.

Modifying a deployed workflow follows a discover → fetch → edit → republish → verify pattern. Publishing a workflow version writes to the user's Zapier account, so get explicit confirmation before publishing.

## Step 1: Identify the workflow

If the user provides a workflow ID, use it directly. Otherwise list workflows and find the matching one by name or description:

```bash
zapier-sdk --experimental list-workflows --json
```

If multiple workflows match, show candidates and ask the user which one to modify.

## Step 2: Fetch current metadata and version

Run these reads, then preserve the current metadata before changing anything:

```bash
zapier-sdk --experimental get-workflow <workflow-id> --json
zapier-sdk --experimental list-workflow-versions <workflow-id> --json
```

From the versions list, pick the current or newest version ID, then fetch it:

```bash
zapier-sdk --experimental get-workflow-version <workflow-id> <version-id> --json
```

Capture:

- `source_files`, especially `source_files["workflow.ts"]`.
- `dependencies`.
- `zapier_durable_version`.
- `enabled`.
- Any `connections`, `app_versions`, `trigger`, or workflow metadata present in the workflow or version response.

The current SDK publish command takes `source_files` as a JSON object. Do not pass a raw `workflow.ts` path to `publish-workflow-version`.

## Step 3: Make the edit

Prefer editing an existing local workflow file if one exists. Otherwise, write `source_files["workflow.ts"]` into a local `workflow.ts` in a workflow-specific directory and edit that copy.

Apply the requested change narrowly. Preserve existing Zod schemas, `ctx.step` boundaries, connection aliases, dependency pins, durable runtime version, publish connection bindings, app-version bindings, trigger configuration, and visibility/enabled state unless there is a reason to change them.

## Step 4: Optional synthetic test

For non-trivial changes, propose a test run before publishing. This may run real downstream actions, so summarize side effects and wait for confirmation.

Build `source_files` from the local file:

```bash
SOURCE_FILES="$(jq -n --rawfile workflow workflow.ts '{"workflow.ts": $workflow}')"
```

Run the workflow:

```bash
zapier-sdk --experimental run-durable "$SOURCE_FILES" \
  --dependencies '<deps from fetched version>' \
  --zapier_durable_version '<durable version from fetched version>' \
  --connections '<connection bindings JSON if needed>' \
  --input '<synthetic input JSON>' \
  --private
```

For synthetic `run-durable` tests, reuse the fetched version's connection bindings as-is — they're already the nested object shape `{ "alias": { "connectionId": "..." } }` that both `run-durable` and `publish-workflow-version` accept. Do not flatten to a bare string like `{ "alias": "id" }`; that fails with `expected object, received string`.

If the run returns a run ID, inspect it when needed:

```bash
zapier-sdk --experimental get-durable-run <run-id> --json
```

## Step 5: Confirm, then republish

Before publishing, summarize for the user:

1. The diagnosis.
2. The code or config change.
3. The workflow ID being updated.
4. The publish command shape and values that will be preserved from the old version, including dependencies, durable version, enabled state, connections, app versions, and trigger configuration.

Wait for explicit confirmation before publishing.

Build `source_files`:

```bash
SOURCE_FILES="$(jq -n --rawfile workflow workflow.ts '{"workflow.ts": $workflow}')"
```

Publish:

```bash
zapier-sdk --experimental publish-workflow-version <workflow-id> "$SOURCE_FILES" \
  --dependencies '<deps from fetched version>' \
  --zapier_durable_version '<durable version from fetched version>' \
  --connections '<connection bindings from fetched version>' \
  --app_versions '<app version bindings from fetched version>' \
  --trigger '<trigger config from fetched version>' \
  --json
```

Use the fetched workflow's enabled state when publishing. If the workflow was enabled before the edit, either omit `--enabled` or pass bare `--enabled` because publish defaults to enabled. If the workflow was disabled before the edit, add `--enabled false`; do not use `--enabled=false` or `--no-enabled`. Do not accidentally re-enable a disabled workflow.

Omit `--connections`, `--app_versions`, or `--trigger` only when the fetched metadata confirms the workflow version does not use that field. If the fetched metadata includes trigger, connection, or app-version configuration but the shape cannot be mapped to the current publish flags, stop before publishing and tell the user the workflow needs SDK confirmation rather than silently dropping metadata.

Do not use the old trigger republish flags (`--trigger-app`, `--trigger-action`, `--trigger-auth`, `--trigger-params`). The current trigger publish path is the single JSON `--trigger` object.

## Step 6: Verify

Read back the workflow and versions:

```bash
zapier-sdk --experimental get-workflow <workflow-id> --json
zapier-sdk --experimental list-workflow-versions <workflow-id> --json
```

Confirm the newest version reflects the publish, the workflow is still enabled if it should be, and trigger/connection/app-version metadata was preserved. If the change is hard to validate without a live trigger fire, tell the user exactly what test event to send and what result to expect.

Finish by reporting:

- Workflow name and ID.
- Whether the requested change was published.
- Whether trigger, connection, and app-version metadata were preserved.
- Whether the workflow is enabled.
- The Zapier editor link: `https://zapier.com/durables-editor/<workflow-id>`.

## Reverting

Previous versions remain available. To revert, fetch the prior version's source (Step 2) and republish it with the same `publish-workflow-version` pattern above (Step 5), preserving dependency, durable version, connection, app-version, trigger, and enabled-state metadata.
