/**
 * OpenPhone — Zapier SDK example.
 * Retrieve a list of recent messages.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "quo", owner: "me" });
  return zapier.apps.quo({ connection: connection.id });
}

/**
 * List Messages
 * Retrieve a chronological list of messages exchanged between your Quo number and specified participants, with support for filtering and pagination.
 */
export async function listMessages() {
  const quo = await connect();
  await quo.search.list_messages({
    inputs: {
      maxResults: 5, // required — default "10" — Maximum number of results to return per page. (1 - 100)
    },
  });
}
