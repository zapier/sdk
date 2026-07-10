/**
 * ConstantContact — Zapier SDK example.
 * Create a new contact in Constant Contact.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "constant-contact", owner: "me" });
  return zapier.apps["constant-contact"]({ connection: connection.id });
}

/**
 * Create Contact
 * Creates a contact on a specific list in your account.
 */
export async function createContact() {
  const constantContact = await connect();
  await constantContact.write.contact({
    inputs: {
      create_source: "Sign-up Form", // required — choices: Account, Contact — Describes who added the contact.
      email: "jane.doe@example.com", // required
      first_name: "Jane", // optional
      last_name: "Doe", // optional
      job_title: "Marketing Manager", // optional
      company_name: "Acme Corp", // optional
      sms_consent_type: "Explicit", // optional — choices: Explicit, Implicit — Type of consent given by the contact for SMS communications. Explicit is required by Constant Con...
      address_kind: "home", // optional — choices: home, work, other
    },
  });
}
