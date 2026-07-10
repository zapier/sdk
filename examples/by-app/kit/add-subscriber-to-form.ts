/**
 * ConvertKit — Zapier SDK example.
 * Add a subscriber to a form.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "kit", owner: "me" });
  return zapier.apps.kit({ connection: connection.id });
}

/**
 * Add Subscriber to Form
 * Subscribe someone to a specific form.
 */
export async function addSubscriberToForm() {
  const kit = await connect();
  await kit.write.formCreate({
    inputs: {
      email: "jane.doe@example.com", // required — If a subscriber with this email doesn't exist, one will be created.
      name: "Jane Doe", // optional
      course_opted: true, // optional — default true — If this form has a sequence attached to it, would you like the subscriber to be opted into the se...
      subscriber_state: "active", // optional — choices: active, inactive — Choose "active" for single opt-in (subscriber is immediately active) or "inactive" for double opt...
    },
  });
}
