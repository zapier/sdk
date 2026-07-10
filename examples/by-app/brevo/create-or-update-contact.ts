/**
 * Sendinbluev2 — Zapier SDK example.
 * Create or update a contact in your Brevo account.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "brevo", owner: "me" });
  return zapier.apps.brevo({ connection: connection.id });
}

/**
 * Contact Create or Update
 * Creates or updates a contact
 */
export async function createOrUpdateContact() {
  const brevo = await connect();
  await brevo.write.contactAddorupdate({
    inputs: {
      updateOnExisting: true, // required — default true — Enable this option if you want existing contacts with the same identifier to be updated. If disab...
      emailBlacklisted: false, // optional — default false — Enable this if you have not received the contact's explicit consent to send email campaigns
      smsBlacklisted: false, // optional — default false — Enable this if you have not received the contact's explicit consent to send SMS campaigns
      listsUpdateType: "add", // optional — default "add" — choices: add, reassign — The new contact will be added to the list(s) selected above. In case _Add_ an existing Brevo cont...
      attribcategoryIsID: false, // optional — default false — You should enable this option if you plan to provide category-type attribute values as category I...
      contact_key_identification: {"email":"susan.chan@acmecorp.com"}, // required
    },
  });
}
