/**
 * ConvertKit — Zapier SDK example.
 * Find a subscriber by email address.
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
 * Find Subscriber
 * Finds an existing confirmed subscriber by email.
 */
export async function findSubscriber() {
  const kit = await connect();
  await kit.search.subscriberSearch({
    inputs: {
      emailAddress: "jane.doe@example.com", // required
    },
  });
}
