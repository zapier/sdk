/**
 * HoneyBook — Zapier SDK example.
 * Create a new project with client details and event information.
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
 * Create Project
 * Create a new project in HoneyBook
 */
export async function createProject() {
  const honeybook = await connect();
  await honeybook.write.create_project({
    inputs: {
      full_name: "Jessica Smith", // required
      email: "jessica.smith@email.com", // required
      phone_number: "555-1234", // optional
      event_type: "Wedding", // optional
      event_date: "2024-09-14", // optional
      event_details: "Outdoor ceremony at Central Park", // optional
      event_location: "Central Park, NYC", // optional
    },
  });
}
