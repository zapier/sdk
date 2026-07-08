# Discord

Single-action Discord examples. One authenticated call, no orchestration.

| File | JTBD |
|---|---|
| [`send-channel-message.ts`](./send-channel-message.ts) | Broadcast to a channel. The most common Discord-out pattern. |
| [`send-direct-message.ts`](./send-direct-message.ts) | Notify one human, not a channel. |

## Run

```bash
npx tsx examples/by-app/discord/send-channel-message.ts
npx tsx examples/by-app/discord/send-direct-message.ts
```

## Discovery

```bash
zapier-sdk list-actions discord
zapier-sdk list-action-input-fields discord write send_channel_message
zapier-sdk list-action-input-fields discord write send_direct_message
```

`channel_id` and `user_id` are the Discord snowflake IDs (numeric strings). Enable Developer Mode in Discord and right-click any channel or user to copy the ID.
