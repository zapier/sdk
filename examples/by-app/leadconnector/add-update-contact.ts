/**
 * HighLevel — Zapier SDK example.
 * Add or update a contact with provided details.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "leadconnector", owner: "me" });
  return zapier.apps.leadconnector({ connection: connection.id });
}

/**
 * Add/Update Contact
 * Adds or updates an existing contact.
 */
export async function addUpdateContact() {
  const leadconnector = await connect();
  await leadconnector.write.add_update_contact({
    inputs: {
      firstName: "Jane", // optional
      lastName: "Doe", // optional
      name: "Jane Doe", // optional
      phone: "555-123-4567", // optional
      email: "jane.doe@example.com", // optional
      lead: "12345", // required
    },
  });
}
