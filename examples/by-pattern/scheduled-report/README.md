# scheduled-report

**Cron → read → summarize.** On a recurring timer, gather data from one or more systems and emit a digest.

## What belongs here

- Zapier Schedule trigger, fetch a window of data, post a formatted summary to Discord, email, or a doc.
- Any recurring aggregate output: leaderboards, revenue rollups, on-call handoff notes, weekly stand-ups.

## What doesn't belong here

- Mirroring records between systems on a schedule (the intent is consistency, not summary) → [`../data-sync/`](../data-sync/).
- Notifications tied to a specific event, not a timer → [`../notify-on-event/`](../notify-on-event/).
- Inbound leads that need routing → [`../lead-routing/`](../lead-routing/).
