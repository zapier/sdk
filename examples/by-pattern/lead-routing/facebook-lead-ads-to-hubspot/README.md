# facebook-lead-ads-to-hubspot

A Zapier durable workflow that routes a Meta lead-ads submission into HubSpot as a Contact record with campaign attribution captured via `hs_lead_source` and `hs_analytics_source_data_1`. Wire the Meta Lead Ads webhook to this workflow's endpoint and the SDR queue populates before the ad spend has finished settling.

## What it does

- **Trigger:** a Meta lead payload (with `field_data` array) delivered to the workflow input (validated by Zod).
- **Step 1: `upsert-hubspot-contact-<leadgen_id>`:** calls `HubSpotCLIAPI.upsert_contact` keyed on `email`, with mapped names and contact info. Attribution rides on `hs_lead_source` (label) and `hs_analytics_source_data_1` (form / ad / campaign). Per-lead step name plus upsert-by-email means the same leadgen id cannot create a duplicate contact under retry.

Pairs with [`../facebook-lead-ads-to-follow-up-boss/`](../facebook-lead-ads-to-follow-up-boss/): same intake shape, different CRM destination.

## Parameters to edit before deploy

Constants at the top of `workflow.ts`:

| Constant | Purpose | How to determine the value |
|---|---|---|
| `HUBSPOT_CONNECTION` | Deploy-time alias for the HubSpot connection | `zapier-sdk list-connections` |
| `LEAD_SOURCE_LABEL` | Value written to the HubSpot `hs_lead_source` property | Check your HubSpot Contact property options for `hs_lead_source`, or `zapier-sdk list-action-input-fields hubspot write upsert_contact` |
| `FIELD_EMAIL`, `FIELD_PHONE`, `FIELD_FIRST_NAME`, `FIELD_LAST_NAME` | Meta lead-form question labels | `zapier-sdk list-action-input-fields facebook-lead-ads read lead` for the target form. The form owner controls these labels. |

HubSpot does not require a company field on Contact. If your form captures company, add another `pickField` line and pass it as `company` on the upsert payload.

## Discovery

```bash
# What input fields does upsert_contact need on my connection (includes custom properties)?
zapier-sdk list-actions hubspot
zapier-sdk list-action-input-fields hubspot write upsert_contact

# What field names does my Meta lead form use?
zapier-sdk list-actions facebook-lead-ads
zapier-sdk list-action-input-fields facebook-lead-ads read lead
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

