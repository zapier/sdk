/**
 * Webflow — Zapier SDK example.
 * Find an item by its name or slug.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "webflow", owner: "me" });
  return zapier.apps.webflow({ connection: connection.id });
}

/**
 * Find Item
 * Find an Item in a Collection.
 */
export async function findItem() {
  const webflow = await connect();
  await webflow.search.find_item({
    inputs: {
      name: "Spring Collection T-Shirt", // optional — The exact name of the Item to find
      slug: "spring-collection-tshirt", // optional — The exact slug of the Item to find
    },
  });
}
