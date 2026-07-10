/**
 * Kajabi — Zapier SDK example.
 * Grant access to an offer for a user.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "kajabi", owner: "me" });
  return zapier.apps.kajabi({ connection: connection.id });
}

/**
 * Grant Access to an Offer
 * Grants a new or existing member access to an Offer and its Products.
 */
export async function grantAccessToOffer() {
  const kajabi = await connect();
  await kajabi.write.activate_offer({
    inputs: {
      name: "Email Marketing Bootcamp", // required
      email: "jane.doe@gmail.com", // required
      external_user_id: "user_12345", // required — An ID to uniquely identify the user. This is used to grant or revoke access later.
      send_offer_grant_email: true, // optional — default true — Send member an Offer Grant Confirmation email?
    },
  });
}
