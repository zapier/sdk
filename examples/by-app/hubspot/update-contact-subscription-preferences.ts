/**
 * HubSpot — Zapier SDK example.
 * Update a contact's email subscription preferences.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "hubspot", owner: "me" });
  return zapier.apps.hubspot({ connection: connection.id });
}

/**
 * Update Contact Subscription Preferences
 * Adds a contact to one or more subscription types in HubSpot.
 */
export async function updateContactSubscriptionPreferences() {
  const hubspot = await connect();
  await hubspot.write.add_contact_to_subscription({
    inputs: {
      subscription_type_ids: ["123"], // required — Select one or more subscription types to add the contact to.
      legal_basis_explanation: "Customer opted in via website form.", // optional — Provide an explanation for the legal basis of this subscription. This is required for GDPR compli...
    },
  });
}
