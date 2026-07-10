# Skool — Zapier SDK

> Product and company names used in these examples are trademarks of their respective owners
> and are used only to identify the service each example integrates with. These examples are
> not affiliated with, endorsed by, or sponsored by those companies.

**Catalog:** Write 2 · Read 2 · Search 0 · **Total:** 4 actions

## Discovery flow

Run these commands to explore this app's available actions and input schemas at runtime.

```bash
# 1. Confirm the app slug
npx zapier-sdk list-apps

# 2. App metadata
npx zapier-sdk get-app skool

# 3. List all actions (or filter by type: write | read | search)
npx zapier-sdk list-actions skool
npx zapier-sdk list-actions skool --action-type write
npx zapier-sdk list-actions skool --action-type read
npx zapier-sdk list-actions skool --action-type search

# 4. Full definition and input schema for any action
npx zapier-sdk get-action skool <action-type> <action-key>
npx zapier-sdk list-action-input-fields skool <action-type> <action-key>

# 5. Manage connections
npx zapier-sdk list-connections skool
npx zapier-sdk create-connection skool   # human completes OAuth
```

For dynamic input fields, list the valid choices (requires a connection):

```bash
npx zapier-sdk list-action-input-field-choices skool <action-type> <action-key> <field-key> \
  --connection <connection-id>
```

## CLI examples

```bash
# Invite a new member to a Skool group.
npx zapier-sdk run-action skool write invite_member --connection <connection-id> \
  --inputs '{"email":"jane.doe@gmail.com"}'

# Unlock a course for a specific member.
npx zapier-sdk run-action skool write unlock_course_for_member --connection <connection-id> \
  --inputs '{"email":"jane.doe@gmail.com"}'
```

## SDK examples

| File | JTBD |
|---|---|
| [`invite-member.ts`](./invite-member.ts) | Invite a new member to a Skool group. |
| [`unlock-course-for-member.ts`](./unlock-course-for-member.ts) | Unlock a course for a specific member. |
