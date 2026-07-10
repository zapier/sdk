/**
 * Todoist — Zapier SDK example.
 * Find a project by name in Todoist.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "todoist", owner: "me" });
  return zapier.apps.todoist({ connection: connection.id });
}

/**
 * Find Project
 * Finds a project (by name/title).
 */
export async function findProject() {
  const todoist = await connect();
  await todoist.search.find_project({
    inputs: {
      name: "Product Launch", // required
    },
  });
}
