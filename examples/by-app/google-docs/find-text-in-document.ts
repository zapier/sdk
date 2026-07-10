/**
 * GoogleDocs — Zapier SDK example.
 * Find specific text within a Google Doc.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-docs", owner: "me" });
  return zapier.apps["google-docs"]({ connection: connection.id });
}

/**
 * Find Text in Document
 * Find text in a Google Doc and return its start and end position indexes. Use with Format Text to apply formatting or links to specific text.
 */
export async function findTextInDocument() {
  const googleDocs = await connect();
  await googleDocs.search.find_text({
    inputs: {
      searchText: "Q2 financial results", // required — The text to search for in the document. Returns the start and end position indexes.
      matchCase: false, // optional — default false — If enabled, the search will be case-sensitive.
      returnAllMatches: false, // optional — default false — If enabled, returns all occurrences of the text. Otherwise, returns only the first match.
    },
  });
}
