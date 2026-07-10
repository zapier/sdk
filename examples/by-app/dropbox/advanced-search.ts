/**
 * DropBox — Zapier SDK example.
 * Search for files and folders using keywords.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "dropbox", owner: "me" });
  return zapier.apps.dropbox({ connection: connection.id });
}

/**
 * Advanced Search
 * Search for files and folders using advanced filters like file type, category, and content matching.
 */
export async function advancedSearch() {
  const dropbox = await connect();
  await dropbox.search.advanced_search({
    inputs: {
      query: "Q2 financial report", // required — The search string to match against file and folder names, and file content. Full-text search with...
      path: "/Reports/2024", // optional — Optional. Limit search to a specific folder path, e.g. `/Documents/Taxes`. Leave empty to search ...
      order_by: "relevance", // optional — choices: relevance, last_modified_time — How to order the search results. By default, results are sorted by relevance.
      file_status: "active", // optional — choices: active, deleted — Whether to include deleted files in search results. By default this will search for active files ...
      filename_only: false, // optional — default false — If true, search only file and folder names. If false, also search file content.
    },
  });
}
