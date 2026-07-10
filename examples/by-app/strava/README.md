# Strava — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 2 · Read 3 · Search 1 · **Total:** 6 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app strava

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions strava
npx zapier-sdk list-actions strava --action-type write
npx zapier-sdk list-actions strava --action-type read
npx zapier-sdk list-actions strava --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action strava <action-type> <action-key>
npx zapier-sdk list-action-input-fields strava <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections strava
npx zapier-sdk create-connection strava   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices strava <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Create a new activity in Strava with a name, type, start time, and duration.
npx zapier-sdk run-action strava write create_activity --connection <connection-id> \
  --inputs '{"activity_name":"Morning Ride","activity_type":"Ride","start_date_local":"2024-06-01T06:30:00","activity_elapsed_time":"3600","activity_description":"Fast-paced ride through Central Park."}'

# Find an activity by name or ID in Strava.
npx zapier-sdk run-action strava search find_activity --connection <connection-id> \
  --inputs '{"activity_name":"Morning Ride"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`create-activity.ts`](./create-activity.ts) | Create a new activity in Strava with a name, type, start time, and duration. |
| [`find-activity.ts`](./find-activity.ts) | Find an activity by name or ID in Strava. |
