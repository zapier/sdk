/**
 * AcuityScheduling — Zapier SDK example.
 * Find all appointments for a client using their name or email address.
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
 * Find Appointments by Client Info
 * Find existing appointments from client info.
 */
export async function findAppointmentsByClientInfo() {
  const acuityScheduling = await connect();
  await acuityScheduling.search.appointmentsFind({
    inputs: {
      firstName: "Emily", // optional
      lastName: "Johnson", // optional
      email: "emily.johnson@example.com", // optional
    },
  });
}
