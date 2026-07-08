import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const DISCORD_CONNECTION = "discord_primary";
const REP_ROSTER_TABLE_ID = "REPLACE_WITH_YOUR_TABLE_ID";

const DISCORD_APP_KEY = "DiscordCLIAPI";

const InputSchema = z.object({
  leadId: z.string(),
  email: z.string().email(),
  company: z.string(),
  region: z.enum(["amer", "emea", "apac"]),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { routed: boolean }>(
  "route-form-lead-by-region",
  async (ctx, rawInput) => {
    const lead = InputSchema.parse(rawInput);

    const rep = await ctx.step(`lookup-rep-${lead.leadId}`, async () => {
      const { data: rows } = await sdk.listTableRecords({
        table: REP_ROSTER_TABLE_ID,
        keyMode: "names",
        filters: [{ fieldKey: "region", operator: "exact", value: lead.region }],
      });
      const row = rows[0];
      if (!row) throw new Error(`No rep configured for region ${lead.region}`);
      return { discordUserId: row.data.discord_user_id as string };
    });

    await ctx.step(`dm-rep-${lead.leadId}`, async () =>
      sdk.runAction({
        appKey: DISCORD_APP_KEY,
        actionType: "write",
        actionKey: "send_direct_message",
        connection: DISCORD_CONNECTION,
        inputs: {
          user_id: rep.discordUserId,
          content: `New ${lead.region.toUpperCase()} lead: ${lead.email} from ${lead.company}`,
        },
      }),
    );

    return { routed: true };
  },
);
