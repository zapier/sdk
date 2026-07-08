import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const STRIPE_CONNECTION = "stripe_primary";
const GMAIL_CONNECTION = "gmail_primary";
const DIGEST_RECIPIENTS = ["leadership@example.com"];
const WINDOW_HOURS = 24;

const GMAIL_APP_KEY = "GoogleMailV2CLIAPI";

// Triggered by Zapier's Schedule app. The runtime hands us the invocation
// timestamp, which we use as the idempotency key so a retried invocation for
// the same scheduled tick doesn't double-send.
const InputSchema = z.object({
  triggered_at: z.string(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { charges: number; totalUsd: number }>(
  "daily-revenue-summary",
  async (ctx, rawInput) => {
    const { triggered_at } = InputSchema.parse(rawInput);
    const runId = triggered_at;

    const summary = await ctx.step(`aggregate-charges-${runId}`, async () => {
      const since = Math.floor(new Date(triggered_at).getTime() / 1000) - WINDOW_HOURS * 60 * 60;
      const response = await sdk.fetch(
        `https://api.stripe.com/v1/charges?created[gte]=${since}&limit=100`,
        { connection: STRIPE_CONNECTION, method: "GET" },
      );
      const body = (await response.json()) as {
        data: Array<{ amount: number; status: string }>;
      };
      const succeeded = body.data.filter((c) => c.status === "succeeded");
      const totalCents = succeeded.reduce((sum, c) => sum + c.amount, 0);
      return { charges: succeeded.length, totalUsd: totalCents / 100 };
    });

    await ctx.step(`email-digest-${runId}`, async () =>
      sdk.runAction({
        appKey: GMAIL_APP_KEY,
        actionType: "write",
        actionKey: "message",
        connection: GMAIL_CONNECTION,
        inputs: {
          to: DIGEST_RECIPIENTS,
          subject: `Daily revenue: $${summary.totalUsd.toLocaleString()} across ${summary.charges} charges`,
          body: `Today's revenue: $${summary.totalUsd.toLocaleString()} across ${summary.charges} succeeded charges.\n\nWindow: last ${WINDOW_HOURS} hours ending ${triggered_at}.`,
        },
      }),
    );

    return summary;
  },
);
