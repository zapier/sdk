/**
 * Circle — Zapier SDK example.
 * Create a new contact in the community.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "circle", owner: "me" });
  return zapier.apps.circle({ connection: connection.id });
}

/**
 * Create Contact
 * Creates a new contact in your community
 */
export async function createContact() {
  const circle = await connect();
  await circle.write.create_contact({
    inputs: {
      first_name: "Jane", // optional
      last_name: "Doe", // optional
      email: "jane.doe@example.com", // required
    },
  });
}
