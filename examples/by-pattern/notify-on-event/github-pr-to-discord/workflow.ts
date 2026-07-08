import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Edit these two constants before deploying. See README.md for how to discover them.
const DISCORD_CONNECTION = "discord_primary";
const DISCORD_CHANNEL_ID = "1234567890";

const DISCORD_APP_KEY = "DiscordCLIAPI";

const InputSchema = z.object({
  number: z.number(),
  title: z.string(),
  html_url: z.string(),
  user: z.object({ login: z.string() }).passthrough(),
  base: z.object({ repo: z.object({ full_name: z.string() }).passthrough() }).passthrough(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { posted: boolean }>(
  "github-pr-to-discord",
  async (ctx, rawInput) => {
    const pr = InputSchema.parse(rawInput);
    const repo = pr.base.repo.full_name;
    const author = pr.user.login;
    const content = `New PR in **${repo}** by ${author}: [#${pr.number} ${pr.title}](${pr.html_url})`;

    await ctx.step("post-to-discord", async () =>
      sdk.runAction({
        appKey: DISCORD_APP_KEY,
        actionType: "write",
        actionKey: "send_channel_message",
        connection: DISCORD_CONNECTION,
        inputs: {
          channel_id: DISCORD_CHANNEL_ID,
          content,
          username: "GitHub",
        },
      }),
    );

    return { posted: true };
  },
);
