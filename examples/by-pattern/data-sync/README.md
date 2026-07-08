# data-sync

**Read → write.** Records in system A are mirrored or upserted into system B on a recurring basis.

## What belongs here

- Bulk mirrors (list all records in A, upsert into B) on a schedule.
- Per-record streaming syncs (change event in A → upsert in B) where the intent is to keep two systems consistent.

## What doesn't belong here

- One-off notifications on an event → [`../notify-on-event/`](../notify-on-event/).
- Inbound leads that need a lookup + routing decision → [`../lead-routing/`](../lead-routing/).
- Aggregate digests on a timer → [`../scheduled-report/`](../scheduled-report/).
