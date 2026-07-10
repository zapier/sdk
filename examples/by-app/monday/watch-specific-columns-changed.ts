/**
 * Monday — Zapier SDK example.
 * Monitor specific columns in a board for any changes.
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
 * Specific Columns Values Changed in Board
 * Triggers when one of the specified columns' value is changed in the selected board.
 */
export async function watchSpecificColumnsChanged() {
  const monday = await connect();
  await monday.read.specific_columns_values_changed_in_board({
    inputs: {
      column_ids: "status,date", // required
    },
  });
}
