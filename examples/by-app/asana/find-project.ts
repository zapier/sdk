/**
 * Asana — Zapier SDK example.
 * Find a project by its name.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "asana", owner: "me" });
  return zapier.apps.asana({ connection: connection.id });
}

/**
 * Find Project
 * Finds an existing project.
 */
export async function findProject() {
  const asana = await connect();
  await asana.search.find_project({
    inputs: {
      name: "Product Launch Plan", // required — The name of the project to find (exact match first, fuzzy match second).
    },
  });
}
