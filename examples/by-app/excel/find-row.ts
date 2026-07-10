/**
 * Excel — Zapier SDK example.
 * Find a row in an Excel worksheet by a specific value.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "excel", owner: "me" });
  return zapier.apps.excel({ connection: connection.id });
}

/**
 * Find Row
 * Finds a row that matches a column and value.
 */
export async function findRow() {
  const excel = await connect();
  await excel.search.find_row({
    inputs: {
      storage_source: "OneDrive", // optional — default "one_drive" — choices: one_drive, sharepoint — Defaults to OneDrive. If Sharepoint is selected, subsequent folders that are listed are only fold...
      folder_id: "root", // optional, dynamic — default "root" — Defaults to the root of the drive. Files shared with you are only supported via OneDrive.
      lookup_value: "Acme Corp", // required
    },
  });
}
