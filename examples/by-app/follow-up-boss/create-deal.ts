/**
 * FollowUpBoss — Zapier SDK example.
 * Create a new deal for a contact.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "follow-up-boss", owner: "me" });
  return zapier.apps["follow-up-boss"]({ connection: connection.id });
}

/**
 * Create Deal
 * Creates a deal on a contact.
 */
export async function createDeal() {
  const followUpBoss = await connect();
  await followUpBoss.write.create_deal({
    inputs: {
      person: "john.smith@example.com", // required — The contact's phone number, email address, or Follow Up Boss ID.
      name: "Home Purchase - Maple Ave", // required — The name of the deal
      teamMembers: "jane.agent@example.com", // required
      description: "Residential home purchase for John Smith on Maple Ave.", // optional — Description of the deal
      projectedCloseDate: "2024-08-15", // optional — The projected close date of this deal
    },
  });
}
