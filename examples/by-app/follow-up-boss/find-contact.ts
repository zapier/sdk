/**
 * FollowUpBoss — Zapier SDK example.
 * Find a contact by name or email address.
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
 * Find a Contact
 * Search for a contact by email, phone number, or Follow Up Boss ID.
 */
export async function findContact() {
  const followUpBoss = await connect();
  await followUpBoss.search.find_contact({
    inputs: {
      person: "john.smith@example.com", // required — The contact's phone number, email address, or Follow Up Boss ID.
    },
  });
}
