# typeform-submission-to-gmail

A Zapier durable workflow that sends a confirmation email whenever a Typeform response is submitted. Wire Typeform's `new_response` webhook (or Zapier's `updated_form_response` polling trigger) to this workflow's endpoint; the workflow receives one response at a time and emails the respondent.

## What it does

- **Trigger:** a `{ responseId, respondentEmail }` object delivered to the workflow input (validated by Zod).
- **Step 1 — `send-confirmation-<responseId>`:** calls `GmailCLIAPI.message` to send a thank-you email to the respondent. Per-response step name keeps retries idempotent.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `GMAIL_CONNECTION` | Deploy-time alias for the Gmail connection | `zapier-sdk list-connections` |
| `EMAIL_SUBJECT` | Subject line | Edit inline |
| `EMAIL_BODY` | Plain-text body | Edit inline; for HTML/templating, extend the workflow and store the template inline |

## Discovery

```bash
zapier-sdk list-actions gmail
zapier-sdk get-action-input-fields gmail write message

zapier-sdk list-actions typeform
zapier-sdk get-action-input-fields typeform read updated_form_response
```

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).
