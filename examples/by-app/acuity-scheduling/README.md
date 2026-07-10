# AcuityScheduling — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 3 · Read 5 · Search 2 · **Total:** 10 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app acuity-scheduling

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions acuity-scheduling
npx zapier-sdk list-actions acuity-scheduling --action-type write
npx zapier-sdk list-actions acuity-scheduling --action-type read
npx zapier-sdk list-actions acuity-scheduling --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action acuity-scheduling <action-type> <action-key>
npx zapier-sdk list-action-input-fields acuity-scheduling <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections acuity-scheduling
npx zapier-sdk create-connection acuity-scheduling   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices acuity-scheduling <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Block off a specific time period in the Acuity Scheduling calendar.
npx zapier-sdk run-action acuity-scheduling write block --connection <connection-id> \
  --inputs '{"start":"2024-07-01T09:00:00-04:00","end":"2024-07-01T11:00:00-04:00","notes":"Vacation time"}'

# Find all appointments for a client using their name or email address.
npx zapier-sdk run-action acuity-scheduling search appointmentsFind --connection <connection-id> \
  --inputs '{"firstName":"Emily","lastName":"Johnson","email":"emily.johnson@example.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`add-blocked-off-time.ts`](./add-blocked-off-time.ts) | Block off a specific time period in the Acuity Scheduling calendar. |
| [`find-appointments-by-client-info.ts`](./find-appointments-by-client-info.ts) | Find all appointments for a client using their name or email address. |
