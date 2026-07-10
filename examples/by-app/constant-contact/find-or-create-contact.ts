/**
 * ConstantContact — Zapier SDK example.
 * Find an existing contact by email or create a new one if none exists.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "constant-contact", owner: "me" });
  return zapier.apps["constant-contact"]({ connection: connection.id });
}

/**
 * Find or Create Contact
 * Find Contact by email or create a new one.
 */
export async function findOrCreateContact() {
  const constantContact = await connect();
  await constantContact.search.find_contact({
    inputs: {
      email: "jane.doe@example.com", // required
      status: "active", // optional — choices: all, active, deleted, not_set, pending_confirmation, temp_hold, +1 more — Leave empty to filter for Contacts that are **not deleted**, select **all** to filter for all Con...
    },
  });
}
