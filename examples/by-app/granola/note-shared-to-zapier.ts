/**
 * Granola — Zapier SDK example.
 * Trigger when a note is shared to Zapier from Granola.
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
 * Note Shared to Zapier
 * Triggers when a meeting note is sent to Zapier from Granola.
 */
export async function noteSharedToZapier() {
  const granola = await connect();
  await granola.read.new_meeting_note_shared({
    inputs: {
      name: "Team Meeting Notes", // required — This is the name that this workflow will show up as in Granola.
      visibility: "public", // required — default true — Sharing lets other people in your Granola workspace use this workflow.
    },
  });
}
