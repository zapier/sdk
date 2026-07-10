/**
 * JotForm — Zapier SDK example.
 * Assign a Jotform form to a user by email with an optional message.
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
 * Assign Form
 * Invite assignees to complete your form
 */
export async function assignForm() {
  const jotform = await connect();
  await jotform.write.assign_form({
    inputs: {
      email: "jane.doe@example.com", // required — Enter your assignee’s email address
      message: "Please complete this survey by Friday.", // optional — Include an invitation message
      permission: "submit", // optional — default "submitAndEdit" — choices: submitAndEdit, submitOnly, submitAndView — Let assignees submit only, submit and view submissions later, or submit and edit submissions later
    },
  });
}
