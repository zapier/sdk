/**
 * SystemeIo — Zapier SDK example.
 * Trigger when a new sale occurs in your system.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "systemeio", owner: "me" });
  return zapier.apps.systemeio({ connection: connection.id });
}

/**
 * New Sale
 * Triggers when a new sale is made.
 */
export async function newSaleTrigger() {
  const systemeio = await connect();
  await systemeio.read.new_sale_trigger({
    inputs: {
      // no inputs
    },
  });
}
