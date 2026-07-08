# notify-on-event

**Trigger → message.** Something happens in system A; someone (or something) finds out in system B.

## What belongs here

- Single trigger event (webhook, poll, integration trigger) → one or more downstream writes/notifications.
- Fan-out patterns (one event → multiple destinations) live here too, under the trigger that fires them.

## What doesn't belong here

- Recurring digests on a timer → [`../scheduled-report/`](../scheduled-report/).
- Bulk mirror of records between systems → [`../data-sync/`](../data-sync/).
- Inbound thing that needs a lookup + decision before it lands → [`../lead-routing/`](../lead-routing/).
