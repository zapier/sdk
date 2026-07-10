/**
 * MailerLite — Zapier SDK example.
 * Add or update a subscriber by email.
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
 * Create or Update Subscriber
 * Create a new subscriber or Update an existing subscriber based on their email.
 */
export async function createUpdateSubscriber() {
  const mailerlite = await connect();
  await mailerlite.write.create_update_subscriber({
    inputs: {
      email: "jane.doe@example.com", // required
      resubscribe: false, // optional — Adding an email that was previously unsubscribed, junk or bouched, will update it's status to sub...
    },
  });
}
