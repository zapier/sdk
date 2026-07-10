/**
 * ThriveCart — Zapier SDK example.
 * Retrieve information about a cancelled recurring payment subscription.
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
 * Recurring Payments Cancelled
 * Triggers when a recurring payment for a subscription or a split pay is cancelled.
 */
export async function getRecurringPaymentsCancelled() {
  const thrivecart = await connect();
  await thrivecart.read.order_rebill_cancelled({
    inputs: {
      subscription__type: "monthly", // optional — choices: product, upsell, downsell — Choose which item you want to trigger this Zap for.
      mode_int: 1, // optional — choices: 1, 2 — Choose whether this should trigger if the cancellation is made in test mode, live mode, or both. ...
    },
  });
}
