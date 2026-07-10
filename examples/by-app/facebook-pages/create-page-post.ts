/**
 * Facebook — Zapier SDK example.
 * Create a new post on a Facebook Page's timeline.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "facebook-pages", owner: "me" });
  return zapier.apps["facebook-pages"]({ connection: connection.id });
}

/**
 * Create Page Post
 * Create a new page "stream" post on a page.
 */
export async function createPagePost() {
  const facebookPages = await connect();
  await facebookPages.write.page_stream({
    inputs: {
      message: "Grand opening this Saturday! Join us for free coffee and prizes.", // required
      link_url: "https://acmecoffee.com/grand-opening", // optional — Optional link URL attached to this post.
    },
  });
}
