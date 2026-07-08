import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Edit these three constants before deploying. See README.md for how to discover them.
const DISCORD_CONNECTION = "discord_primary";
const DISCORD_HOT_LEADS_CHANNEL_ID = "1234567890";
const DISCORD_PIPELINE_CHANNEL_ID = "1234567891";

const DISCORD_APP_KEY = "DiscordCLIAPI";

const InputSchema = z.object({
  contactId: z.string(),
  name: z.string(),
  stage: z.string(),
  previousStage: z.string().optional(),
  ownerName: z.string().optional(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { posted: boolean }>(
  "follow-up-boss-stage-change-to-discord",
  async (ctx, rawInput) => {
    const change = InputSchema.parse(rawInput);
    const channelId = change.stage.toLowerCase().includes("hot")
      ? DISCORD_HOT_LEADS_CHANNEL_ID
      : DISCORD_PIPELINE_CHANNEL_ID;

    const owner = change.ownerName ? ` (owner: ${change.ownerName})` : "";
    const from = change.previousStage ? ` from **${change.previousStage}**` : "";

    await ctx.step(`post-stage-change-${change.contactId}`, async () =>
      sdk.runAction({
        appKey: DISCORD_APP_KEY,
        actionType: "write",
        actionKey: "send_channel_message",
        connection: DISCORD_CONNECTION,
        inputs: {
          channel_id: channelId,
          content: `:house_with_garden: **${change.name}** moved to **${change.stage}**${from}${owner}`,
        },
      }),
    );

    return { posted: true };
  },
);
