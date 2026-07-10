/**
 * WooCommerce — Zapier SDK example.
 * Create a new WooCommerce order with customer details and products.
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
 * Create Order
 * Creates a new Order.
 */
export async function createOrder() {
  const woocommerce = await connect();
  await woocommerce.write.orderCreate({
    inputs: {
      // no inputs
    },
  });
}
