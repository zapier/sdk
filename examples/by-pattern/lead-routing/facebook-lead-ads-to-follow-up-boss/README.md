# facebook-lead-ads-to-follow-up-boss

A Zapier durable workflow that routes a Meta lead-ads submission into Follow Up Boss as a contact tagged with the source campaign. Wire the Meta Lead Ads webhook (or the Facebook Lead Ads `lead` trigger polling on a schedule) to this workflow's endpoint and prospects land in the CRM within seconds of clicking the ad.

## What it does

- **Trigger:** a Meta lead payload (with `field_data` array) delivered to the workflow input (validated by Zod).
- **Step 1 — `upsert-fub-contact-<leadgen_id>`:** calls `FollowUpBossCLIAPI.create_contact` (the "Create or Update Contact Without Triggering Action Plans" variant) so upserts stay idempotent by email/phone and Action Plans stay controllable from the FUB UI. Per-lead step name means the same leadgen id cannot create a duplicate under retry.

## Parameters to edit before deploy

Constants at the top of `workflow.ts`:

| Constant | Purpose | How to determine the value |
|---|---|---|
| `FUB_CONNECTION` | Deploy-time alias for the Follow Up Boss connection | `zapier-sdk list-connections` |
| `FUB_INITIAL_STAGE` | The stage name new leads land in (e.g. `Lead`, `New`, `Nurture`) | `zapier-sdk get-action-input-fields follow-up-boss write create_contact` and inspect the `stage` dropdown; stage names are set per FUB account |
| `FIELD_EMAIL`, `FIELD_PHONE`, `FIELD_FIRST_NAME`, `FIELD_LAST_NAME` | Meta lead-form question labels | `zapier-sdk get-action-input-fields facebook-lead-ads read lead` for the target form — the form owner controls these labels |

## Discovery

```bash
# What stage names + custom fields does create_contact accept on my connection?
zapier-sdk list-actions follow-up-boss
zapier-sdk get-action-input-fields follow-up-boss write create_contact

# What field names does my Meta lead form use?
zapier-sdk list-actions facebook-lead-ads
zapier-sdk get-action-input-fields facebook-lead-ads read lead
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

