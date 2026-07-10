/**
 * GoogleContacts — Zapier SDK example.
 * Find a contact by name, email, or phone number.
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
 * Find Contact
 * Finds a contact by name, email, or phone number.
 */
export async function findContact() {
  const googleContacts = await connect();
  await googleContacts.search.contact({
    inputs: {
      search_by: "jessica.tanaka@email.com", // required — choices: email, name, phone
    },
  });
}
