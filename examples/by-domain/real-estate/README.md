# Real Estate

Automations for real-estate teams: lead-capture ingest, CRM writes, SDR notifications.

## Recurring app stack

**Follow Up Boss, Facebook Lead Ads, HubSpot, Discord.** Real estate has its own vertical-native CRM (Follow Up Boss) with stage vocabulary and agent-owner assignment that a generic lead-routing example would miss. Teams that need a broader CRM run HubSpot alongside.

## Canonical workflows

Each entry is a filesystem symlink to the canonical directory under `by-pattern/`. Follow it to read the workflow source and README.

| Shape | Workflow | Apps |
|---|---|---|
| Vertical-native CRM ingest | [`facebook-lead-ads-to-follow-up-boss/`](./facebook-lead-ads-to-follow-up-boss) | Facebook Lead Ads -> Follow Up Boss |
| Stage-change broadcast | [`follow-up-boss-stage-change-to-discord/`](./follow-up-boss-stage-change-to-discord) | Follow Up Boss -> Discord |
| General-purpose CRM ingest | [`facebook-lead-ads-to-hubspot/`](./facebook-lead-ads-to-hubspot) | Facebook Lead Ads -> HubSpot |

Brokerages typically run one of the two CRM paths, not both.

## Where real-estate teams typically wire these

- **Meta lead -> Follow Up Boss**: Meta lead-ads webhook. Runtime hands the lead payload (with `field_data` array) to the workflow. Filter by `form_name` inside the workflow to route buyer vs. seller vs. investor forms to different FUB stages or tags.
- **Stage change -> Discord**: Follow Up Boss webhook. Payload delivered to the workflow. Routing by stage name lives inside `workflow.ts`; the seed sends Hot leads to one channel and everything else to another.
- **Meta lead -> HubSpot**: same intake shape as the FUB variant, but writes to HubSpot Contact records with campaign attribution captured on `hs_lead_source` and `hs_analytics_source_data_1`.

## Patterns not yet covered

Common shapes a real-estate team would want that don't have workflows yet:

- **Meta lead -> SMS / WhatsApp reply within 60 seconds**: the "text them before they close the tab" pattern.
- **Follow Up Boss -> Gmail sequence**: templated follow-ups triggered by pipeline stage.
- **Showing scheduled -> FUB contact + Discord**: showing booked via Calendly triggers a FUB stage change and a Discord ping to the listing agent.
- **Zillow / Realtor.com lead -> FUB**: direct-portal lead sources beyond Meta.

PRs welcome.
