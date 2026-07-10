/**
 * Trello — Zapier SDK example.
 * Create a comment on a Trello card.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "trello", owner: "me" });
  return zapier.apps.trello({ connection: connection.id });
}

/**
 * Create Comment
 * Writes a new comment on a specific card.
 */
export async function createCardComment() {
  const trello = await connect();
  await trello.write.comment({
    inputs: {
      text: "Reviewed the Q2 roadmap and approved changes.", // required
    },
  });
}
