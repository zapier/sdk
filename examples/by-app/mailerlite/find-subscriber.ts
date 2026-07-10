/**
 * MailerLite — Zapier SDK example.
 * Find a subscriber by email or name.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "mailerlite", owner: "me" });
  return zapier.apps.mailerlite({ connection: connection.id });
}

/**
 * Find a Subscriber
 * Search for a subscriber by email or name
 */
export async function findSubscriber() {
  const mailerlite = await connect();
  await mailerlite.search.find_subscriber({
    inputs: {
      email_or_name: "jane.doe@example.com", // required
    },
  });
}
