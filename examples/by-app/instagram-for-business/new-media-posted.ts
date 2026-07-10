/**
 * InstagramBusiness — Zapier SDK example.
 * Get notified when new media is posted to your Instagram for Business account.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "instagram-for-business", owner: "me" });
  return zapier.apps["instagram-for-business"]({ connection: connection.id });
}

/**
 * New Media Posted in my Account
 * Triggers when a photo or video is posted to your selected account.
 */
export async function newMediaPosted() {
  const instagramForBusiness = await connect();
  await instagramForBusiness.read.new_media({
    inputs: {
      // no inputs
    },
  });
}
