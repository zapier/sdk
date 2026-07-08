# daily-revenue-summary

A Zapier durable workflow that emails an end-of-day revenue digest. Wire Zapier's **Schedule** trigger (Every Day at 23:00 UTC) to this workflow's endpoint and leadership gets a consistent pulse without anyone manually pulling Stripe numbers.

Stripe doesn't expose a "list charges in a window" first-class action, so this workflow uses `sdk.fetch` against Stripe's REST API directly. Same Zapier auth and audit trail, but escapes the action catalog when there's no first-class action.

## What it does

- **Trigger:** Zapier's **Schedule** app. Trigger delivers `{ triggered_at }` (ISO 8601 timestamp).
- **Step 1: `aggregate-charges-<runId>`:** raw HTTPS `sdk.fetch` to `api.stripe.com/v1/charges?created[gte]=...&limit=100` over the trailing `WINDOW_HOURS` window; sums `succeeded` charges.
- **Step 2: `email-digest-<runId>`:** `GoogleMailV2CLIAPI.message` with the formatted digest.

`runId` derives from `triggered_at`, so a retried scheduled invocation for the same tick reuses the same step names and can't double-send.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `STRIPE_CONNECTION`, `GMAIL_CONNECTION` | Deploy-time connection aliases | `zapier-sdk list-connections` |
| `DIGEST_RECIPIENTS` | Who receives the daily email | Edit the array in `workflow.ts` |
| `WINDOW_HOURS` | How far back to aggregate | Match your Schedule trigger cadence (24 for daily, 1 for hourly) |

## Discovery

```bash
zapier-sdk list-actions schedule
zapier-sdk list-action-input-fields schedule read every_day

zapier-sdk list-actions gmail
zapier-sdk list-action-input-fields gmail write message
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

Wire Zapier's Schedule → Every Day (at your chosen hour) trigger to this workflow's endpoint. The scheduled invocation timestamp is what the workflow uses as the idempotency key.
