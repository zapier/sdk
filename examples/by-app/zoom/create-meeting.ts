/**
 * Zoom — Zapier SDK example.
 * Create a new Zoom meeting for a scheduled event.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "zoom", owner: "me" });
  return zapier.apps.zoom({ connection: connection.id });
}

/**
 * Create Meeting
 * Creates a new Zoom Meeting. (Options not available here will default to user/account Zoom settings.)
 */
export async function createMeeting() {
  const zoom = await connect();
  await zoom.write.create_meeting({
    inputs: {
      type: "scheduled", // required — choices: 1, 2
    },
  });
}
