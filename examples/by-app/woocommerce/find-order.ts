/**
 * WooCommerce — Zapier SDK example.
 * Find an order by searching with customer email or order number.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "woocommerce", owner: "me" });
  return zapier.apps.woocommerce({ connection: connection.id });
}

/**
 * Find Order
 * Finds an Order by searching.
 */
export async function findOrder() {
  const woocommerce = await connect();
  await woocommerce.search.orderSearch({
    inputs: {
      // no inputs
    },
  });
}
