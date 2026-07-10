/**
 * GoogleMyBusiness — Zapier SDK example.
 * Create a new post on a Google Business Profile with a summary and topic type.
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
 * Create Post
 * Creates a post for a specified location.
 */
export async function createPost() {
  const googleBusinessProfile = await connect();
  await googleBusinessProfile.write.create_post({
    inputs: {
      post_summary: "We're excited to announce our new weekend brunch hours!", // required — Description of the local post
      topic_type: "EVENT", // required — choices: STANDARD, ALERT, EVENT, OFFER — The topic type of the local post, which is used to select different templates to create and rende...
    },
  });
}
