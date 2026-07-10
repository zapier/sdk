/**
 * MicrosoftSharePoint — Zapier SDK example.
 * Create a new text file with specified content in a SharePoint folder.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "sharepoint", owner: "me" });
  return zapier.apps.sharepoint({ connection: connection.id });
}

/**
 * Create Text File
 * Create a new text file with custom content.
 */
export async function createTextFile() {
  const sharepoint = await connect();
  await sharepoint.write.create_text_file({
    inputs: {
      fileName: "Quarterly-Report-Q2-2024.txt", // required — The name for the text file. The .txt extension is added automatically if not provided.
      content: "Q2 revenue exceeded forecasts by 14%. See attached charts for details.", // required — The text content to write to the file.
      conflictBehavior: "replace", // optional — default "rename" — choices: rename, replace — What to do if a file with the same name already exists in the folder. "Rename automatically" adds...
    },
  });
}
