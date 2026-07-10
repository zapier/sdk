/**
 * Discord — Zapier SDK example.
 * Find a Discord user by username.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "discord", owner: "me" });
  return zapier.apps.discord({ connection: connection.id });
}

/**
 * Find User
 * Find an existing user by name.
 */
export async function findUser() {
  const discord = await connect();
  await discord.search.find_user({
    inputs: {
      username: "discordUser123", // required
    },
  });
}
