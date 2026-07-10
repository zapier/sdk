/**
 * Flodesk — Zapier SDK example.
 * Create or update a subscriber in your Flodesk audience.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "flodesk", owner: "me" });
  return zapier.apps.flodesk({ connection: connection.id });
}

/**
 * Create/Update Subscriber
 * Creates a new subscriber or updates an existing one.
 */
export async function createOrUpdateSubscriber() {
  const flodesk = await connect();
  await flodesk.write.create_or_update_subscriber({
    inputs: {
      email: "jane.doe@example.com", // required
      firstName: "Jane", // optional
      lastName: "Doe", // optional
      doubleOptIn: false, // optional — default false — If set to "True", subscribers must confirm their subscription via the double opt-in email before ...
      optinTimestamp: "2024-06-10T09:15:00Z", // optional — The date and time when the subscriber opted in in ISO 8601 format (e.g., 2024-01-15T10:30:00Z). U...
    },
  });
}
