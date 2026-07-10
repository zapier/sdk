/**
 * Monday — Zapier SDK example.
 * Create a new board for project management or tracking.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "monday", owner: "me" });
  return zapier.apps.monday({ connection: connection.id });
}

/**
 * Create Board
 * Creates a new board
 */
export async function createBoard() {
  const monday = await connect();
  await monday.write.create_board({
    inputs: {
      board_name: "Marketing Campaign Q3", // required
      board_kind: "public", // required — default "public" — choices: public, private, share
    },
  });
}
