# Engineering

Automations for engineering teams: ticketing, code-event broadcasts, bug intake, on-call plumbing.

## Recurring app stack

**Jira, GitHub, Discord, Google Forms.** An engineering team at a real-estate brokerage builds the same chat-ops / Jira flows as an engineering team at a bank.

## Canonical workflows

Each entry is a filesystem symlink to the canonical directory under `by-pattern/`. Follow it to read the workflow source and README.

| Shape | Workflow | Apps |
|---|---|---|
| Chat intake | [`discord-message-to-jira-issue/`](./discord-message-to-jira-issue) | Discord -> Jira Software Cloud |
| Code broadcast | [`github-pr-to-discord/`](./github-pr-to-discord) | GitHub -> Discord |
| Form intake | [`google-forms-to-jira-issue/`](./google-forms-to-jira-issue) | Google Forms -> Jira Software Cloud |

## Where engineering teams typically wire these

- **Chat intake**: `/bug` slash-command in Discord, `@triage` mentions, or a channel-scoped webhook that hands the workflow `{ content, user_id, channel_id }`.
- **Code broadcast**: GitHub webhook (`pull_request` event). The workflow receives the parsed PR payload.
- **Form intake**: Google Forms `updated_form_response` trigger. The workflow receives the response id and looks up the full response inside the first `ctx.step`.

## Patterns not yet covered

Common shapes an engineering team would want that don't have workflows yet:

- **Jira -> Discord notification on issue status change**: the return leg of chat intake. Post a formatted message to a project channel when a ticket transitions to In Review or Done.
- **GitHub -> Notion release-notes log**: every merged PR appends a row to a Notion database as a lightweight change log.
- **HubSpot ticket -> Jira issue**: customer-reported bug in HubSpot Service becomes a linked Jira ticket with a `hubspot_ticket_id` custom field.
- **PagerDuty incident -> Jira issue**: on-call incident opens a postmortem ticket automatically.

PRs welcome.
