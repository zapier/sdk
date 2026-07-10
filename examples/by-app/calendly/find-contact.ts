/**
 * Calendly — Zapier SDK example.
 * Find a contact in Calendly by unique identifier.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "calendly", owner: "me" });
  return zapier.apps.calendly({ connection: connection.id });
}

/**
 * Find Contact
 * Finds a contact by UUID. Requires a paid Calendly plan.
 */
export async function findContact() {
  const calendly = await connect();
  await calendly.search.find_contact({
    inputs: {
      uuid: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // required — The contact's unique identifier
    },
  });
}
