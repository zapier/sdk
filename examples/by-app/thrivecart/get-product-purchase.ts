/**
 * ThriveCart — Zapier SDK example.
 * Retrieve details about a completed product purchase.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "thrivecart", owner: "me" });
  return zapier.apps.thrivecart({ connection: connection.id });
}

/**
 * Product Purchase
 * Triggers when a specific product (or products) are purchased.
 */
export async function getProductPurchase() {
  const thrivecart = await connect();
  await thrivecart.read.order_payment_product({
    inputs: {
      customer__checkbox_confirmation: false, // optional — If your cart page has an opt-in checkbox added to it, only run if the customer checked it.
      mode_int: 1, // optional — choices: 1, 2 — Choose whether this should trigger if the purchase is done in test mode, live mode, or both. Leav...
    },
  });
}
