/**
 * AcuityScheduling — Zapier SDK example.
 * Block off a specific time period in the Acuity Scheduling calendar.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "acuity-scheduling", owner: "me" });
  return zapier.apps["acuity-scheduling"]({ connection: connection.id });
}

/**
 * Add Blocked Off Time
 * Block off a new range of time on your schedule.
 */
export async function addBlockedOffTime() {
  const acuityScheduling = await connect();
  await acuityScheduling.write.block({
    inputs: {
      start: "2024-07-01T09:00:00-04:00", // required
      end: "2024-07-01T11:00:00-04:00", // required
      notes: "Vacation time", // optional — Any notes to attach to the blocked off time.
    },
  });
}
