/**
 * MicrosoftSharePoint — Zapier SDK example.
 * Search for a file or folder in SharePoint by keyword.
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
 * Find File or Folder
 * Search for files or folders.
 */
export async function findFileOrFolder() {
  const sharepoint = await connect();
  await sharepoint.search.find_file_or_folder({
    inputs: {
      searchType: "file", // optional — default "files" — choices: files, folders, both — Choose what type of items to search for. Defaults to "Files only".
      searchMode: "default", // optional — default "all" — choices: name, all — "Name only" returns items where the search term appears in the name. "Name, content, or path" mat...
      query: "Quarterly Report Q2 2024", // required — Enter a search term. Results are limited to 50 items.
    },
  });
}
