# google-forms-to-jira-issue

A Zapier durable workflow that turns a customer-facing Google Forms bug-report response into a Jira ticket with the reporter's fields mapped. Wire your form's `onFormSubmit` trigger (or the Google Forms `updated_form_response` trigger polling on a schedule) to this workflow's endpoint and engineering's Jira project fills without a manual triage step.

## What it does

- **Trigger:** a Google Forms response id delivered to the workflow input (validated by Zod).
- **Step 1 — `fetch-form-response-<responseId>`:** calls `GoogleFormsCLIAPI.updated_form_response` to look up the full response by id, so we get the field labels the form owner configured.
- **Step 2 — `create-jira-issue-<responseId>`:** calls `JiraSoftwareCloudCLIAPI.create_issue` with the parsed summary, description, and reporter email.

Both steps are idempotent per response id — the same response cannot double-create a ticket.

## Parameters to edit before deploy

Constants at the top of `workflow.ts`:

| Constant | Purpose | How to determine the value |
|---|---|---|
| `FORMS_CONNECTION` | Deploy-time alias for the Google Forms connection | `zapier-sdk list-connections` |
| `GOOGLE_FORM_ID` | The specific form to read from | Copy from the form's edit URL, or `zapier-sdk get-action-input-fields google-forms read updated_form_response` and inspect the `form` dropdown |
| `JIRA_CONNECTION` | Deploy-time alias for the Jira connection | `zapier-sdk list-connections` |
| `JIRA_PROJECT_KEY` | Jira project key (e.g. `SUP`, `ENG`) | Read from Jira URL, or `zapier-sdk get-action-input-fields jira-software-cloud write create_issue` and inspect the `project` dropdown |
| `JIRA_ISSUE_TYPE` | Jira issue type name (e.g. `Bug`, `Task`) | Depends on the project schema — same `get-action-input-fields` call, `issuetype` field |
| `FIELD_SUMMARY`, `FIELD_DETAILS`, `FIELD_EMAIL` | Google Forms question labels — the form owner's declared strings | Open the form or the response spreadsheet; each column heading is a field label |

## Discovery

```bash
# What input fields does updated_form_response need?
zapier-sdk list-actions google-forms
zapier-sdk get-action-input-fields google-forms read updated_form_response

# What input fields does create_issue need on my connection?
zapier-sdk list-actions jira-software-cloud
zapier-sdk get-action-input-fields jira-software-cloud write create_issue
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).

