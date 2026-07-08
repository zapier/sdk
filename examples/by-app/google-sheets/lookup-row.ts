/**
 * Look up a Google Sheets row by column value.
 *
 * JTBD: Fetch a single row from a sheet given the column to search and the
 * value to match. Read-only, no writes.
 * App: Google Sheets (search)
 * Run: npx tsx examples/by-app/google-sheets/lookup-row.ts
 *
 * Spreadsheet, worksheet, and column values are dynamic per connection.
 * Verify with:
 *   zapier.getActionInputFieldsSchema({ app: "GoogleSheetsV2CLIAPI", actionType: "search", action: "lookup_row" })
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const { data: connection } = await zapier.findFirstConnection({
    app: "google-sheets",
    owner: "me",
  });

  const result = await zapier.runAction({
    appKey: "GoogleSheetsV2CLIAPI",
    actionType: "search",
    actionKey: "lookup_row",
    connection: connection.id,
    inputs: {
      spreadsheet: process.env.GSHEETS_SPREADSHEET_ID,
      worksheet: process.env.GSHEETS_WORKSHEET_ID,
      lookup_key: "Email",
      lookup_value: "jane@example.com",
    },
  });

  console.log(result.data);
}

main().catch(console.error);
