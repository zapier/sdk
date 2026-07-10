# GoogleCalendar — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 8 · Read 7 · Search 5 · **Total:** 20 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app google-calendar

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions google-calendar
npx zapier-sdk list-actions google-calendar --action-type write
npx zapier-sdk list-actions google-calendar --action-type read
npx zapier-sdk list-actions google-calendar --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action google-calendar <action-type> <action-key>
npx zapier-sdk list-action-input-fields google-calendar <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections google-calendar
npx zapier-sdk create-connection google-calendar   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices google-calendar <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a calendar event with specific details including time, title, description, and location.
npx zapier-sdk run-action google-calendar write detailed_event --connection <connection-id> \
  --inputs '{"summary":"Project Kickoff Meeting","description":"Initial meeting to discuss project scope and deliverables.","location":"123 Main St, San Francisco, CA","conferencing":false,"start__dateTime":"2024-07-15T09:00:00-07:00","end__dateTime":"2024-07-15T10:00:00-07:00","recurrence_frequency":"weekly","recurrence_until":"2024-09-15","all_day":false,"visibility":"default","reminders__useDefault":true,"transparency":"transparent","guestsCanModify":false,"eventType":"default"}'

# Find calendar events matching a search term.
npx zapier-sdk run-action google-calendar read search --connection <connection-id> \
  --inputs '{"search_term":"Kickoff Meeting","only_new_events":false}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-detailed-event.ts`](./create-detailed-event.ts) | Create a calendar event with specific details including time, title, description, and location. |
| [`search-events.ts`](./search-events.ts) | Find calendar events matching a search term. |
