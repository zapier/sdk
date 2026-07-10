/**
 * Fathom — Zapier SDK example.
 * Retrieve the full transcript of a recorded meeting for review or documentation.
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
 * New Transcript
 * Triggers when there's a new transcript from a meeting.
 */
export async function getMeetingTranscript() {
  const fathom = await connect();
  await fathom.read.transcript({
    inputs: {
      // no inputs
    },
  });
}
