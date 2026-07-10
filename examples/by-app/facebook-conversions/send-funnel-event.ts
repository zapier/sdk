/**
 * FacebookConversions — Zapier SDK example.
 * Send a funnel event to track user progress in the sales funnel.
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
 * Send Funnel Event
 * Publish lead updates from your funnel.
 */
export async function sendFunnelEvent() {
  const facebookConversions = await connect();
  await facebookConversions.write.send_funnel_event({
    inputs: {
      destination: "facebook", // required
      sales_info: "{\"stage\":\"Lead Qualified\",\"user_email\":\"user@example.com\"}", // required
    },
  });
}
