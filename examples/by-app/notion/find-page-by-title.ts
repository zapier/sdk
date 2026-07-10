/**
 * Notion — Zapier SDK example.
 * Find a Notion page by its exact title.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "notion", owner: "me" });
  return zapier.apps.notion({ connection: connection.id });
}

/**
 * Find Page (By Title)
 * Searches for a page by title.
 */
export async function findPageByTitle() {
  const notion = await connect();
  await notion.search.page_by_title({
    inputs: {
      title: "Q2 Planning", // required — If you don’t see your expected page, please check that it is shared with the [same integration](h...
      exact_match: true, // required — default false — If you want to search for an exact match, enable this option. If you disable this option, the sea...
    },
  });
}
