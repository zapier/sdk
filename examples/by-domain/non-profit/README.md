# Non-Profit

Automations for non-profit and NGO teams: donor and volunteer intake, event registration, donor follow-up.

## Recurring app stack

**Gravity Forms, Eventbrite, Typeform, Google Sheets, Gmail.** Non-profits skew WordPress-native for their donation and volunteer forms, and lean on Eventbrite for fundraisers and galas more than any other vertical.

## Canonical workflows

Each entry is a filesystem symlink to the canonical directory under `by-pattern/`. Follow it to read the workflow source and README.

| Shape | Workflow | Apps |
|---|---|---|
| WordPress intake | [`gravity-forms-to-google-sheets/`](./gravity-forms-to-google-sheets) | Gravity Forms -> Google Sheets |
| Event registration | [`eventbrite-to-google-sheets/`](./eventbrite-to-google-sheets) | Eventbrite -> Google Sheets |
| Chain | [`typeform-submission-to-gmail/`](./typeform-submission-to-gmail) | Typeform -> Gmail |

## Where non-profit teams typically wire these

- **WordPress intake**: a donation or volunteer-signup Gravity Form on the org's site logs every entry to a shared sheet the program team already works from.
- **Event registration**: a fundraiser or gala's Eventbrite listing feeds the same log-to-sheet shape, giving the events team one roster view.
- **Chain**: a Typeform intake or interest form (volunteer application, newsletter signup) sends an immediate thank-you email to the respondent.

## Patterns not yet covered

Common shapes a non-profit team would want that don't have workflows yet:

- **Gravity Forms -> CRM upsert**: donation/volunteer form entry creates or updates a donor record in the org's CRM, with a donor-stage field set.
- **Google Sheets donor roster -> scheduled Gmail digest**: weekly summary of new donors/volunteers to the program lead.
- **CRM record change -> CRM update (donor lifecycle)**: donor-stage transitions triggering related record updates — a strong signal in non-profit usage data, but the CRM in question (Salesforce) is outside this corpus's current app coverage.

PRs welcome.
