/**
 * Thinkific — Zapier SDK example.
 * Enroll a user in a Thinkific course.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "thinkific", owner: "me" });
  return zapier.apps.thinkific({ connection: connection.id });
}

/**
 * Enroll User
 * Creates or finds a user in your Thinkific site, and enrolls them in a course or bundle. Available on our Grow plan and above.
 */
export async function enrollUser() {
  const thinkific = await connect();
  await thinkific.write.enroll_user({
    inputs: {
      first_name: "Jane", // required — The user's first name.
      last_name: "Doe", // required — The user's last name.
      email: "jane.doe@example.com", // required — The user's email address.
      expiry_date: "2024-12-31", // optional — The date upon which the enrollment expires.
      company: "Acme Corp", // optional — The name of the company that user belongs to.
    },
  });
}
