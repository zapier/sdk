/**
 * HubSpot — Zapier SDK example.
 * Retrieve owner details using their email address.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "hubspot", owner: "me" });
  return zapier.apps.hubspot({ connection: connection.id });
}

/**
 * Get Owner by Email
 * Gets an existing owner by email.
 */
export async function getOwnerByEmail() {
  const hubspot = await connect();
  await hubspot.search.find_owner_by_email({
    inputs: {
      owner_email: "jane.doe@acme.com", // required
      search_archived: false, // optional — Should the owner also be searched among archived (deactivated) owners?
    },
  });
}
