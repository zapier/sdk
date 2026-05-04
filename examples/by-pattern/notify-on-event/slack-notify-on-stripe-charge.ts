/**
 * Given a Stripe charge ID, fetch it and post a formatted message to Slack.
 *
 * JTBD: When your webhook handler receives a `charge.succeeded` event, hand
 * the charge id to this function and the team sees it in #revenue.
 *
 * Apps: Stripe (search), Slack (write)
 * Run: npx tsx examples/by-pattern/notify-on-event/slack-notify-on-stripe-charge.ts ch_test_123
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function notifyOnCharge(chargeId: string) {
  const stripeConn = (await zapier.findFirstConnection({ app: "stripe", owner: "me" })).data;
  const slackConn = (await zapier.findFirstConnection({ app: "slack", owner: "me" })).data;

  // runAction returns { data: unknown[] }. Search-style actions return one
  // result inside the array — destructure the first element.
  const { data: [charge] } = (await zapier.runAction({
    app: "stripe",
    actionType: "search",
    action: "find_charge",
    connection: stripeConn.id,
    inputs: { query: chargeId },
  })) as { data: any[] };

  await zapier.runAction({
    app: "slack",
    actionType: "write",
    action: "channel_message",
    connection: slackConn.id,
    inputs: {
      channel: "#revenue",
      text: `:moneybag: $${(charge.amount / 100).toFixed(2)} from ${charge.customer_email ?? "anonymous"}`,
    },
  });
}

notifyOnCharge(process.argv[2] ?? "ch_test_123").catch(console.error);
