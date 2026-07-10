/**
 * Circle — Zapier SDK example.
 * Find a community member by their email address.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "circle", owner: "me" });
  return zapier.apps.circle({ connection: connection.id });
}

/**
 * Find Member
 * Find a member using email
 */
export async function findMember() {
  const circle = await connect();
  await circle.search.find_member({
    inputs: {
      email: "jane.doe@example.com", // required
    },
  });
}
