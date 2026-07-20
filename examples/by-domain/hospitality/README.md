# Hospitality

Automations for hotels, restaurants, and event venues: lead-capture ingest, sheet-native intake, guest follow-up.

## Recurring app stack

**Facebook Lead Ads, Typeform, Google Sheets, Gmail.** Hospitality accounts run lighter-weight ops than an enterprise CRM shop — a spreadsheet is often the CRM, and Gmail is often the notification layer.

## Canonical workflows

Each entry is a filesystem symlink to the canonical directory under `by-pattern/`. Follow it to read the workflow source and README.

| Shape | Workflow | Apps |
|---|---|---|
| Flagship intake | [`facebook-lead-ads-to-google-sheets/`](./facebook-lead-ads-to-google-sheets) | Facebook Lead Ads -> Google Sheets |
| Sheet-as-trigger | [`google-sheets-row-to-gmail/`](./google-sheets-row-to-gmail) | Google Sheets -> Gmail |
| Chain | [`typeform-submission-to-gmail/`](./typeform-submission-to-gmail) | Typeform -> Gmail |

## Where hospitality teams typically wire these

- **Flagship intake**: Meta lead-ads webhook (booking inquiry, event inquiry forms). Every lead lands in a shared sheet the front-desk or events team already checks.
- **Sheet-as-trigger**: a booking or waitlist sheet gets a new row (added by staff, a POS integration, or another Zap), and the workflow emails the guest or the on-duty manager.
- **Chain**: a Typeform booking or feedback form triggers an immediate confirmation email to the respondent.

## Patterns not yet covered

Common shapes a hospitality team would want that don't have workflows yet:

- **Facebook Lead Ads -> Mailchimp**: warm up event/booking inquiries in a nurture sequence — Mailchimp is hospitality's #5 app by usage.
- **Calendly/booking-tool -> Google Sheets + Discord**: reservation booked triggers a row plus a staff ping.
- **Guest checkout (Stripe/Square) -> feedback-request email**: post-stay NPS or review-request follow-up.

PRs welcome.
