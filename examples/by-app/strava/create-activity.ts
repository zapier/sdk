/**
 * Strava — Zapier SDK example.
 * Create a new activity in Strava with a name, type, start time, and duration.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "strava", owner: "me" });
  return zapier.apps.strava({ connection: connection.id });
}

/**
 * Create Activity
 * Creates an activity.
 */
export async function createActivity() {
  const strava = await connect();
  await strava.write.create_activity({
    inputs: {
      activity_name: "Morning Ride", // required
      activity_type: "Ride", // required — choices: AlpineSki, BackcountrySki, Canoeing, Crossfit, EBikeRide, Elliptical, +31 more
      start_date_local: "2024-06-01T06:30:00", // required
      activity_elapsed_time: "3600", // required
      activity_description: "Fast-paced ride through Central Park.", // optional
    },
  });
}
