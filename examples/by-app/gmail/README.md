# Gmail

Single-action Gmail examples. One authenticated call, no orchestration.

| File | JTBD |
|---|---|
| [`find-message.ts`](./find-message.ts) | Search messages using Gmail's query syntax. Read-only. |

## Run

```bash
npx tsx examples/by-app/gmail/find-message.ts "from:receipts@stripe.com"
```

## Discovery

```bash
zapier-sdk list-actions gmail
zapier-sdk list-action-input-fields gmail search message
```

The `query` field accepts Gmail's full search syntax: `from:`, `to:`, `subject:`, `has:attachment`, date operators, etc. See [Gmail search help](https://support.google.com/mail/answer/7190).
