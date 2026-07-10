/**
 * GoogleSheets — Zapier SDK example.
 * Create a new spreadsheet with a specific title.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-sheets", owner: "me" });
  return zapier.apps["google-sheets"]({ connection: connection.id });
}

/**
 * Create Spreadsheet
 * Creates a new spreadsheet. Choose from a blank spreadsheet, a copy of an existing one, or one with headers.
 */
export async function createSpreadsheet() {
  const googleSheets = await connect();
  await googleSheets.write.create_spreadsheet({
    inputs: {
      title: "Q2 Financial Report", // required — Enter the name of the new spreadsheet.
    },
  });
}
