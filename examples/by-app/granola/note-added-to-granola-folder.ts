/**
 * Granola — Zapier SDK example.
 * Trigger when a note is added to a Granola folder.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "granola", owner: "me" });
  return zapier.apps.granola({ connection: connection.id });
}

/**
 * Note Added to Granola Folder
 * Triggers when a new note is added to a folder.
 */
export async function noteAddedToGranolaFolder() {
  const granola = await connect();
  await granola.read.new_meeting({
    inputs: {
      name: "Product Roadmap", // required — This is the name that this workflow will show up as in Granola.
      visibility: "private", // required — default true — Sharing lets other people in your Granola workspace use this workflow.
    },
  });
}
