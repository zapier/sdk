/**
 * Thinkific — Zapier SDK example.
 * Search for users by email address.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "thinkific", owner: "me" });
  return zapier.apps.thinkific({ connection: connection.id });
}

/**
 * Search Users
 * Triggers when searching for users in Thinkific by ID or email.
 */
export async function searchUsers() {
  const thinkific = await connect();
  await thinkific.search.users_list({
    inputs: {
      email: "jane.doe@example.com", // optional — The user's email address.
    },
  });
}
