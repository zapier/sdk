# meeting-to-action-items

A Zapier durable workflow that turns a completed meeting into action items filed in Asana, then digested to Discord. Wire Google Calendar's `event_ended` trigger (or your own post-meeting hook) at this workflow's endpoint and every meeting produces its own clean paper trail without anyone taking notes.

This is the canonical **transform pipeline**. The data shape changes at every step: meeting -> transcript -> structured action items -> tasks -> digest.

## What it does

- **Trigger:** a `{ eventId }` object delivered to the workflow input (validated by Zod).
- **Step 1: `fetch-event-<eventId>`:** `GoogleCalendarCLIAPI.event_by_id`. Meeting title and time window.
- **Step 2: `fetch-transcript-<eventId>`:** `FirefliesCLIAPI.search_meeting`. Transcript with pre-extracted `action_items`.
- **Step 3: `create-task-<eventId>-<i>`:** one `AsanaCLIAPI.create_task_v2` call per action item. Per-index step name keeps each task idempotent.
- **Step 4: `post-digest-<eventId>`:** `DiscordCLIAPI.send_channel_message` posts a formatted digest linking each task.

## Parameters to edit before deploy

| Constant | Purpose | How to determine the value |
|---|---|---|
| `GCAL_CONNECTION`, `FIREFLIES_CONNECTION`, `ASANA_CONNECTION`, `DISCORD_CONNECTION` | Deploy-time connection aliases | `zapier-sdk list-connections` |
| `GOOGLE_CALENDAR_ID` | Which calendar to read from | `zapier-sdk list-action-input-fields google-calendar search event_by_id` and inspect the `calendarid` dropdown |
| `ASANA_WORKSPACE` | Asana workspace id | `zapier-sdk list-action-input-fields asana write create_task_v2` and inspect the `workspace` dropdown |
| `DISCORD_CHANNEL_ID` | Discord digest channel (snowflake id) | Enable Developer Mode in Discord, right-click the channel, "Copy Channel ID" |

## Discovery

```bash
zapier-sdk list-actions google-calendar
zapier-sdk list-actions fireflies
zapier-sdk list-actions asana
zapier-sdk list-action-input-fields asana write create_task_v2

zapier-sdk list-actions discord
zapier-sdk list-action-input-fields discord write send_channel_message
```

If your team doesn't have Fireflies, swap the transcript step for any other meeting-transcription vendor with a Zapier integration (Otter, Grain, Fathom). The `action_items` extraction stays the same.

## Deploy

See [`../../README.md#deploying-a-durable-workflow`](../../README.md#deploying-a-durable-workflow).
