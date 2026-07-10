/**
 * GoogleMyBusiness — Zapier SDK example.
 * Reply to a customer review on a Google Business Profile.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-business-profile", owner: "me" });
  return zapier.apps["google-business-profile"]({ connection: connection.id });
}

/**
 * Create Reply
 * Creates a reply for a specified review or updates the reply if one already exists. This action is best used with the Google My Business New Review trigger.
 */
export async function createReply() {
  const googleBusinessProfile = await connect();
  await googleBusinessProfile.write.create_reply({
    inputs: {
      review_name: "John Doe", // required — Review Name returned from the __Google My Business New Review trigger__. This value should be in ...
      reply: "Thank you for your kind words, John! We look forward to serving you again soon.", // required — Your reply may be truncated if it's too long - learn more [here](https://developers.google.com/my...
    },
  });
}
