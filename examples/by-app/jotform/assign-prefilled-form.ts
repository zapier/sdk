/**
 * JotForm — Zapier SDK example.
 * Assign a prefilled Jotform form to a user by email with an optional message.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "jotform", owner: "me" });
  return zapier.apps.jotform({ connection: connection.id });
}

/**
 * Assign Prefilled Form
 * Invite assignees to complete your pre-populated form
 */
export async function assignPrefilledForm() {
  const jotform = await connect();
  await jotform.write.assign_prefilled_form({
    inputs: {
      email: "john.smith@example.com", // required — Enter your assignee’s email address
      message: "Here is your personalized onboarding form.", // optional — Include an invitation message
      fieldBehaviour: "readonly", // optional — default "edit" — choices: edit, readonly — Make pre-populated fields read only or editable
    },
  });
}
