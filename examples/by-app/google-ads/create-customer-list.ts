/**
 * GoogleAds — Zapier SDK example.
 * Create a new customer list for targeted advertising.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-ads", owner: "me" });
  return zapier.apps["google-ads"]({ connection: connection.id });
}

/**
 * Create Customer List
 * Creates a customer list in Google Ads Audience Manager.
 */
export async function createCustomerList() {
  const googleAds = await connect();
  await googleAds.write.create_customer_list({
    inputs: {
      name: "Holiday Shoppers 2024", // required
      description: "List of customers who purchased during the 2024 holiday season.", // optional
    },
  });
}
