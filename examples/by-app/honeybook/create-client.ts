/**
 * HoneyBook — Zapier SDK example.
 * Add a new client with contact information.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "honeybook", owner: "me" });
  return zapier.apps.honeybook({ connection: connection.id });
}

/**
 * Create Client
 * Create a new client in HoneyBook
 */
export async function createClient() {
  const honeybook = await connect();
  await honeybook.write.new_contact({
    inputs: {
      full_name: "Michael Johnson", // required
      email: "michael.johnson@email.com", // required
      address: "456 Oak Street, Springfield", // optional
      phone_number: "555-5678", // optional
    },
  });
}
