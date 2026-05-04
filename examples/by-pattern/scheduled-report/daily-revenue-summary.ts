/**
 * Post a daily revenue digest to Slack at end-of-day.
 *
 * JTBD: Leadership wants a consistent end-of-day pulse without anyone manually
 * pulling Stripe numbers into a Slack message.
 *
 * Stripe doesn't expose a "list charges over a window" action, so this example
 * uses `zapier.fetch` against Stripe's REST API directly — same auth and audit
 * trail, but escapes the action catalog when there's no first-class action.
 *
 * Apps: Stripe (raw HTTP via zapier.fetch), Slack (write)
 * Schedule: run as a cron job (GitHub Actions, Cloud Scheduler) at 23:00 UTC.
 * Run: npx tsx examples/by-pattern/scheduled-report/daily-revenue-summary.ts
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const stripeConn = (await zapier.findFirstConnection({ app: "stripe", owner: "me" })).data;
  const slackConn = (await zapier.findFirstConnection({ app: "slack", owner: "me" })).data;

  const since = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
  const response = await zapier.fetch(
    `https://api.stripe.com/v1/charges?created[gte]=${since}&limit=100`,
    { connection: stripeConn.id, method: "GET" }
  );
  const body = (await response.json()) as { data: Array<{ amount: number; status: string }> };
  const succeeded = body.data.filter((c) => c.status === "succeeded");
  const total = succeeded.reduce((sum, c) => sum + c.amount, 0) / 100;

  await zapier.runAction({
    app: "slack",
    actionType: "write",
    action: "channel_message",
    connection: slackConn.id,
    inputs: {
      channel: "#revenue",
      text: `:bar_chart: *Today's revenue:* $${total.toLocaleString()} across ${succeeded.length} charges.`,
    },
  });
}

main().catch(console.error);
