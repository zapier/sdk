# inbound-lead-orchestration

A Zapier durable workflow that orchestrates the full inbound-lead pipeline: HubSpot lookup, decide, enrich + upsert (new leads) or notify (returning leads). This is the canonical **branching** pattern. The HubSpot lookup decides which arm runs. Every web lead is on a rep's plate within minutes, with the right context attached.

## What it does

- **Trigger:** a `{ responseId, email, company, region }` object delivered to the workflow input (validated by Zod).
- **Step 1: `hubspot-lookup-<responseId>`:** `HubSpotCLIAPI.contactSearch` on `email`. Does this person already exist as a Contact?
- **Step 2: `lookup-rep-<responseId>`:** Zapier Tables lookup. Which rep owns this region?
- **Branch A (existing contact):** Step 3 `dm-existing-<responseId>` DMs the rep on Discord. Done.
- **Branch B (new contact):**
  - Step 3: `clearbit-enrich-<responseId>` runs a raw HTTPS `sdk.fetch` to Clearbit for firmographic enrichment. Uses `sdk.fetch` because there's no first-class Clearbit action for person-by-email.
  - Step 4: `upsert-hubspot-contact-<responseId>` calls `HubSpotCLIAPI.upsert_contact` with enriched fields and rep as `hubspot_owner_id`.
  - Step 5: `dm-new-<responseId>` sends a Discord DM with the full context.

Per-response step names plus upsert-by-email mean the same submission cannot double-create a contact under retry.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `HUBSPOT_CONNECTION`, `CLEARBIT_CONNECTION`, `DISCORD_CONNECTION` | Deploy-time connection aliases | `zapier-sdk list-connections` |
| `REP_ROSTER_TABLE_ID` | Zapier Tables id for the rep roster | `zapier-sdk list-tables` |
| `LEAD_SOURCE` | Value written to HubSpot `hs_lead_source` | Check your HubSpot Contact property options for `hs_lead_source` |

The rep roster Table needs three columns: `region`, `discord_user_id`, `hubspot_owner_id`.

## Discovery

```bash
zapier-sdk list-tables
zapier-sdk list-actions hubspot
zapier-sdk list-action-input-fields hubspot search contactSearch
zapier-sdk list-action-input-fields hubspot write upsert_contact
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).
