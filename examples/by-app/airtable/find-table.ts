/**
 * Airtable — Zapier SDK example.
 * Find a table in Airtable matching a keyword.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "airtable", owner: "me" });
  return zapier.apps.airtable({ connection: connection.id });
}

/**
 * Find Table
 * Find tables by searching for a keyword in table name or description.
 */
export async function findTable() {
  const airtable = await connect();
  await airtable.search.findTable({
    inputs: {
      keyword: "Tasks", // required — Enter a keyword to search for in table names or descriptions. The search is case-insensitive.
      searchField: "name", // optional — default "both" — choices: title, description, both — Choose where to search for the keyword.
    },
  });
}
