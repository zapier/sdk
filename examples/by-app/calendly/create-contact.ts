/**
 * Calendly — Zapier SDK example.
 * Create a new contact in Calendly with name and email.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "calendly", owner: "me" });
  return zapier.apps.calendly({ connection: connection.id });
}

/**
 * Create Contact
 * Creates a new contact. Requires a paid Calendly plan.
 */
export async function createContact() {
  const calendly = await connect();
  await calendly.write.create_contact({
    inputs: {
      name: "Jordan Smith", // required — Contact display name.
      emails_email: "jordan.smith@example.com", // required — At least one email address. Add multiple rows for more (max 10). Pairs with “Email Is Primary” in...
      timezone: "America/New_York", // optional — IANA timezone (e.g., America/Los_Angeles).
      job_title: "Head of Marketing", // optional
      company: "Acme Corp", // optional
      country: "United States", // optional
      state: "NY", // optional
    },
  });
}
