/**
 * Asana — Zapier SDK example.
 * Create a new project with a name and description.
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
 * Create Project
 * Adds a new project.
 */
export async function createProject() {
  const asana = await connect();
  await asana.write.project({
    inputs: {
      name: "Product Launch Plan", // required
      notes: "Detailed plan and timeline for launching the new app in Q3.", // required
    },
  });
}
