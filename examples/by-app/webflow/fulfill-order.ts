/**
 * Webflow — Zapier SDK example.
 * Mark an order as fulfilled and optionally send a fulfillment email.
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
 * Fulfill Order
 * Fulfills an order.
 */
export async function fulfillOrder() {
  const webflow = await connect();
  await webflow.write.fulfill_order({
    inputs: {
      order_id: "ORD-102938", // required — The order identifier.
      sendOrderFulfilledEmail: true, // required — Whether or not the Order Fulfilled email should be sent.
    },
  });
}
