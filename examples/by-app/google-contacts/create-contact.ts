/**
 * GoogleContacts — Zapier SDK example.
 * Create a new contact in Google Contacts.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-contacts", owner: "me" });
  return zapier.apps["google-contacts"]({ connection: connection.id });
}

/**
 * Create Contact
 * Creates a new contact.
 */
export async function createContact() {
  const googleContacts = await connect();
  await googleContacts.write.contact({
    inputs: {
      first_name: "Jessica", // optional
      last_name: "Tanaka", // optional
      email: "jessica.tanaka@email.com", // optional — If updating an email, ensure the existing email has a type and the new email has the same type. O...
      email_type: "home", // optional — choices: home, work — Select a predefined option or enter any custom value.
      phone_type: "mobile", // optional — choices: mobile, work, home, main, workFax, homeFax, +2 more — Select a predefined option or enter any custom value.
      address_type: "home", // optional — choices: home, work — Select a predefined option or enter any custom value.
      event_type: "anniversary", // optional — choices: anniversary — Select a predefined option or enter any custom value.
      url_type: "home", // optional — choices: home, work, blog, profile, homePage, ftp, +2 more — Select a predefined option or enter any custom value.
      relationship_type: "spouse", // optional — choices: spouse, child, mother, father, parent, brother, +8 more — Their relationship to you. Select a predefined option or enter any custom value.
    },
  });
}
