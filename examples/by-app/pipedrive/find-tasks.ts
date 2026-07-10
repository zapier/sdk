/**
 * Pipedrive — Zapier SDK example.
 * Find tasks matching a search term.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "pipedrive", owner: "me" });
  return zapier.apps.pipedrive({ connection: connection.id });
}

/**
 * Find Tasks
 * Find tasks by title, description, or other criteria.
 */
export async function findTasks() {
  const pipedrive = await connect();
  await pipedrive.search.search_task({
    inputs: {
      term: "Follow up with Acme Corp", // required — Enter text to search in task titles and descriptions
      isExactMatch: false, // optional — default false — Should the search term match exactly? (Case insensitive)
      done: false, // optional — Filter tasks by completion status
    },
  });
}
