/**
 * Kajabi — Zapier SDK example.
 * Revoke access to an offer for a user.
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
 * Revoke Access to an Offer
 * Revokes access to an offer from the specified member.
 */
export async function revokeAccessToOffer() {
  const kajabi = await connect();
  await kajabi.write.deactivate_offer({
    inputs: {
      external_user_id: "user_12345", // required — The ID that was sent when granting access to this offer.
    },
  });
}
