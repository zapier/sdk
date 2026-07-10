/**
 * FacebookConversions — Zapier SDK example.
 * Send a purchase event with custom data to Facebook Conversions.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "facebook-conversions", owner: "me" });
  return zapier.apps["facebook-conversions"]({ connection: connection.id });
}

/**
 * Send Purchase Event
 * Publish purchase events to Conversions API
 */
export async function sendPurchaseEvent() {
  const facebookConversions = await connect();
  await facebookConversions.write.send_purchase_event({
    inputs: {
      source_and_destination: "website|facebook", // required
      custom_data: "{\"currency\":\"USD\",\"value\":199.99,\"content_name\":\"Zapier Automation Course\",\"content_category\":\"Online Education\"}", // required
    },
  });
}
