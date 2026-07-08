import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const STRIPE_CONNECTION = "stripe_primary";
const DISCORD_CONNECTION = "discord_primary";
const DISCORD_CHANNEL_ID = "1234567890";

const STRIPE_APP_KEY = "StripeCLIAPI";
const DISCORD_APP_KEY = "DiscordCLIAPI";

const InputSchema = z.object({
  chargeId: z.string(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { posted: boolean }>(
  "stripe-charge-to-discord",
  async (ctx, rawInput) => {
    const { chargeId } = InputSchema.parse(rawInput);

    const charge = await ctx.step(`find-charge-${chargeId}`, async () => {
      const result = (await sdk.runAction({
        appKey: STRIPE_APP_KEY,
        actionType: "search",
        actionKey: "find_charge",
        connection: STRIPE_CONNECTION,
        inputs: { query: chargeId },
      })) as { data: Array<{ amount: number; customer_email?: string }> };
      return result.data[0];
    });

    await ctx.step(`post-charge-${chargeId}`, async () =>
      sdk.runAction({
        appKey: DISCORD_APP_KEY,
        actionType: "write",
        actionKey: "send_channel_message",
        connection: DISCORD_CONNECTION,
        inputs: {
          channel_id: DISCORD_CHANNEL_ID,
          content: `:moneybag: $${(charge.amount / 100).toFixed(2)} from ${charge.customer_email ?? "anonymous"}`,
        },
      }),
    );

    return { posted: true };
  },
);
