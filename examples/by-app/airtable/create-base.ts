/**
 * Airtable — Zapier SDK example.
 * Create a new Airtable base in a specific workspace.
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
 * Create Base
 * Create a new Airtable base in your workspace.
 */
export async function createBase() {
  const airtable = await connect();
  await airtable.write.create_base({
    inputs: {
      baseName: "Project Tracker", // required — Enter the name for the new base.
      workspaceId: "wspc12345", // required — Enter the workspace ID where the base will be created. Find this in your Airtable workspace URL (...
      tableCount: 2, // required — default 1 — choices: 1, 2, 3, 4, 5 — How many tables would you like to create?
    },
  });
}
