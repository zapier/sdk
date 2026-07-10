/**
 * Flodesk — Zapier SDK example.
 * Find a subscriber by their email address.
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
 * Find a Subscriber by Email Address
 * Find a Subscriber by email address
 */
export async function searchSubscriberByEmail() {
  const flodesk = await connect();
  await flodesk.search.search_subscriber_by_email({
    inputs: {
      email: "jane.doe@example.com", // required — The email address of the subscriber you want to find.
    },
  });
}
