# lead-routing

**Read → decide → write.** An inbound thing (form, ad lead, chat message, ticket) gets inspected, enriched, or looked up — then routed to the right place.

## What belongs here

- Inbound event → CRM lookup → branch (existing vs. new).
- Inbound event → enrichment call → typed write with the enriched fields.
- Inbound event → aggregate reads from multiple systems → single richer write.

The distinguishing move is the **decision step** between the trigger and the write.

## What doesn't belong here

- Trigger → straight-through notification with no lookup → [`../notify-on-event/`](../notify-on-event/).
- Bulk mirror of records → [`../data-sync/`](../data-sync/).
- Scheduled digests → [`../scheduled-report/`](../scheduled-report/).
