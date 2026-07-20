# E-Learning

Automations for online course providers and training platforms: enrollment-lead intake, CRM handoff, form-based signups.

## Recurring app stack

**Facebook Lead Ads, Typeform, Google Sheets, HubSpot.** E-learning marketers run heavy paid-acquisition funnels (course-interest ads, webinar signups) that need both a lightweight log and a CRM handoff for the sales/enrollment team.

## Canonical workflows

Each entry is a filesystem symlink to the canonical directory under `by-pattern/`. Follow it to read the workflow source and README.

| Shape | Workflow | Apps |
|---|---|---|
| Flagship intake | [`facebook-lead-ads-to-google-sheets/`](./facebook-lead-ads-to-google-sheets) | Facebook Lead Ads -> Google Sheets |
| CRM routing | [`facebook-lead-ads-to-hubspot/`](./facebook-lead-ads-to-hubspot) | Facebook Lead Ads -> HubSpot |
| Trigger swap | [`typeform-to-google-sheets/`](./typeform-to-google-sheets) | Typeform -> Google Sheets |

## Where e-learning teams typically wire these

- **Flagship intake**: Meta lead-ads webhook (course-interest, webinar, free-trial forms). Marketing keeps a running log independent of the CRM.
- **CRM routing**: the same lead, upserted into HubSpot for the enrollment/sales team to work — HubSpot ranks in e-learning's top-5 apps.
- **Trigger swap**: quiz results, application forms, or webinar-registration Typeforms feed the same sheet-log destination as the Meta path.

## Patterns not yet covered

Common shapes an e-learning team would want that don't have workflows yet:

- **Course-completion event -> certificate email**: platform webhook triggers a Gmail send with a completion certificate attached.
- **Google Sheets waitlist -> Gmail cohort-start reminder**: scheduled digest to everyone on a cohort's waitlist sheet.
- **Webinar-attendee (chat-triggered) -> Google Sheets log**: a chat-message trigger logging attendance for follow-up, per the AI-agent-adjacent pattern seen in e-learning's usage data.

PRs welcome.
