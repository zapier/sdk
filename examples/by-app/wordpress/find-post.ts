/**
 * WordPress — Zapier SDK example.
 * Find a post by its title.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "wordpress", owner: "me" });
  return zapier.apps.wordpress({ connection: connection.id });
}

/**
 * Find Post
 * Finds a post.
 */
export async function findPost() {
  const wordpress = await connect();
  await wordpress.search.post({
    inputs: {
      title: "How to Start a WordPress Blog", // required
    },
  });
}
