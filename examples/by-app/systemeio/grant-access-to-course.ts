/**
 * SystemeIo — Zapier SDK example.
 * Grant a contact access to a specific course.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "systemeio", owner: "me" });
  return zapier.apps.systemeio({ connection: connection.id });
}

/**
 * Create or Update a Contact and Grant Access to Course
 * Creates or updates a contact and grant access to course
 */
export async function grantAccessToCourse() {
  const systemeio = await connect();
  await systemeio.write.grantAccessToCourse({
    inputs: {
      access_type: "full", // required — choices: full_access, dripping_content
    },
  });
}
