# List Workflows and Run History

Read this when the user asks to list workflows, or asks about run history for a specific one. Use the public `zapier-sdk --experimental` surface — do not use `zapier-sdk-code-substrate`.

## Check prerequisites

```bash
zapier-sdk --version
zapier-sdk get-profile --json
zapier-sdk --experimental --help
```

If auth fails, ask the user to run `zapier-sdk login` in an interactive terminal and retry.

## List workflows

```bash
zapier-sdk --experimental list-workflows --json
```

Parse the JSON output and format what the user asked for. Common useful fields may include `id`, `name`, `enabled`, `is_private`, `created_by_user_id`, `created_at`, `updated_at`, `description`, `current_version`, and trigger-related metadata if present.

For each workflow with an `id`, include the Zapier editor link:

```text
https://zapier.com/durables-editor/<workflow-id>
```

Treat `trigger_url` as sensitive because it contains a secret token. Do not print `trigger_url` unless the user explicitly asks for it.

## Ownership scoping

`list-workflows` may return every workflow the authenticated user can see, including team workflows. If the user asks for "my workflows," first show the likely matches and explain any uncertainty rather than silently filtering by the wrong ID.

Known quirk: `zapier-sdk get-profile` may return a UUID that does not match `list-workflows[].created_by_user_id`, which may be a separate numeric user ID. If you cannot confidently map those IDs, say so and present the unfiltered list with enough context for the user to choose.

## Identify a specific workflow

If the user provides a workflow ID, use it directly.

If the user refers to the workflow by name or description, list workflows first and find the matching ID (same `list-workflows --json` call as above). If multiple workflows match, show the candidates and ask the user which one they mean.

## Recent activity and run history

Fetch runs for the relevant workflow(s):

```bash
zapier-sdk --experimental list-workflow-runs <workflow-id> --json
```

Be mindful of API volume for large accounts when fetching runs across many workflows just to find the most recent activity.

Parse the JSON output. Useful fields may include `id`, `status`, `started_at`, `finished_at`, `input`, and `output`.

When the workflow ID is known, include the Zapier editor link:

```text
https://zapier.com/durables-editor/<workflow-id>
```

## Drill into a run

If a single deployed workflow run failed or the user wants step-level detail:

```bash
zapier-sdk --experimental get-workflow-run <run-id> --json
```

Use `get-durable-run <run-id>` only for one-off synthetic runs created by `zapier-sdk --experimental run-durable` (see [`build-and-deploy.md`](build-and-deploy.md)), not for deployed workflow runs returned by `list-workflow-runs`.

If a manual trigger response returns a trigger ID before a workflow run ID is available, bridge from trigger to run:

```bash
zapier-sdk --experimental get-trigger-run <trigger-id> --json
```

Summarize the failure, status, timing, input, output, and any step error details that appear in the response. Avoid dumping raw JSON unless the user asks for it.
