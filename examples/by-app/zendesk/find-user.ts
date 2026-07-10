/**
 * Zendesk — Zapier SDK example.
 * Find a user by name or email address.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "zendesk", owner: "me" });
  return zapier.apps.zendesk({ connection: connection.id });
}

/**
 * Find a User
 * Finds an existing user.
 */
export async function findUser() {
  const zendesk = await connect();
  await zendesk.search.user({
    inputs: {
      query: "jane.doe@example.com", // required — Write a search string to determine how we'll look up the user in Zendesk. For more information, v...
    },
  });
}
