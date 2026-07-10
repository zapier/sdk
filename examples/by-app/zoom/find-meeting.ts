/**
 * Zoom — Zapier SDK example.
 * Search for a Zoom meeting or webinar by type and topic.
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
 * Find Meeting/Webinar
 * Finds a find meeting/webinar based on id or topic name.
 */
export async function findMeeting() {
  const zoom = await connect();
  await zoom.search.find_meeting({
    inputs: {
      type: "scheduled", // required — choices: 1, 2
      topic: "Quarterly Planning", // optional — The meeting's/webinar's topic to search for.
      isExactMatch: false, // optional — If enabled, only the exact match of the topic will be considered.
    },
  });
}
