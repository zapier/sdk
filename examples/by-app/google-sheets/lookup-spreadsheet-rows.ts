/**
 * GoogleSheets — Zapier SDK example.
 * Find spreadsheet rows matching a specific value.
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
 * Lookup Spreadsheet Rows (Advanced)
 * Find up to 500 rows based on a column and value as line items.
 */
export async function lookupSpreadsheetRows() {
  const googleSheets = await connect();
  await googleSheets.search.find_many_rows({
    inputs: {
      lookup_value: "Acme Corp", // required — Enter the value to search for in the lookup column. If looking for empty values, type `[:empty:]`...
      lookup_value_support: "contains", // optional — Enter the value to search for in the supporting lookup column. This value, combined with the look...
      bottom_up: false, // optional — Search from the last row of the spreadsheet up. Select “True” to enable.
      row_count: 10, // optional — default 10 — Enter the number of rows you want to retrieve. Maximum of 500 rows.
    },
  });
}
