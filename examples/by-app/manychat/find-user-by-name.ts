/**
 * ManyChat — Zapier SDK example.
 * Find a ManyChat user by their name.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "manychat", owner: "me" });
  return zapier.apps.manychat({ connection: connection.id });
}

/**
 * Find User by Name
 * Finds a user by name.
 */
export async function findUserByName() {
  const manychat = await connect();
  await manychat.search.user_by_name({
    inputs: {
      name: "Jessica Taylor", // required
    },
  });
}
