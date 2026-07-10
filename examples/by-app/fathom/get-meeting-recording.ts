/**
 * Fathom — Zapier SDK example.
 * Retrieve a meeting recording to access or share the audio or video file.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "fathom", owner: "me" });
  return zapier.apps.fathom({ connection: connection.id });
}

/**
 * New Recording
 * Triggers when there's a new meeting recording.
 */
export async function getMeetingRecording() {
  const fathom = await connect();
  await fathom.read.recording({
    inputs: {
      // no inputs
    },
  });
}
