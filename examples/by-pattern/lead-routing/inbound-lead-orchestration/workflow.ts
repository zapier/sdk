import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const HUBSPOT_CONNECTION = "hubspot_primary";
const CLEARBIT_CONNECTION = "clearbit_primary";
const DISCORD_CONNECTION = "discord_primary";
const REP_ROSTER_TABLE_ID = "REPLACE_WITH_YOUR_TABLE_ID";

const LEAD_SOURCE = "Web - Typeform";

const HUBSPOT_APP_KEY = "HubSpotCLIAPI";
const DISCORD_APP_KEY = "DiscordCLIAPI";

const InputSchema = z.object({
  responseId: z.string(),
  email: z.string().email(),
  company: z.string(),
  region: z.string(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { outcome: "notified" | "created" }>(
  "inbound-lead-orchestration",
  async (ctx, rawInput) => {
    const lead = InputSchema.parse(rawInput);

    const existing = await ctx.step(`hubspot-lookup-${lead.responseId}`, async () => {
      const result = (await sdk.runAction({
        appKey: HUBSPOT_APP_KEY,
        actionType: "search",
        actionKey: "contactSearch",
        connection: HUBSPOT_CONNECTION,
        inputs: {
          first_search_property_name: "email",
          // The value field for a chosen search property is dynamic. Its exact
          // key depends on the property picked. Verify with
          // getActionInputFieldsSchema against your HubSpot connection.
          first_search_property_value: lead.email,
        },
      })) as { data: Array<{ id: string }> };
      return result.data[0] ?? null;
    });

    const rep = await ctx.step(`lookup-rep-${lead.responseId}`, async () => {
      const { data: rows } = await sdk.listTableRecords({
        table: REP_ROSTER_TABLE_ID,
        keyMode: "names",
        filters: [{ fieldKey: "region", operator: "exact", value: lead.region }],
      });
      const row = rows[0];
      if (!row) throw new Error(`No rep configured for region ${lead.region}`);
      return {
        discordUserId: row.data.discord_user_id as string,
        hubspotOwnerId: row.data.hubspot_owner_id as string | undefined,
      };
    });

    if (existing) {
      await ctx.step(`dm-existing-${lead.responseId}`, async () =>
        sdk.runAction({
          appKey: DISCORD_APP_KEY,
          actionType: "write",
          actionKey: "send_direct_message",
          connection: DISCORD_CONNECTION,
          inputs: {
            user_id: rep.discordUserId,
            content: `${lead.email} (${lead.company}) submitted the form again. Existing HubSpot contact: ${existing.id}`,
          },
        }),
      );
      return { outcome: "notified" };
    }

    const enriched = await ctx.step(`clearbit-enrich-${lead.responseId}`, async () => {
      const response = await sdk.fetch(
        `https://person.clearbit.com/v2/people/find?email=${encodeURIComponent(lead.email)}`,
        { connection: CLEARBIT_CONNECTION, method: "GET" },
      );
      return (await response.json()) as {
        name?: { givenName?: string; familyName?: string };
        employment?: { title?: string };
      };
    });

    const newContact = await ctx.step(`upsert-hubspot-contact-${lead.responseId}`, async () => {
      const result = (await sdk.runAction({
        appKey: HUBSPOT_APP_KEY,
        actionType: "write",
        actionKey: "upsert_contact",
        connection: HUBSPOT_CONNECTION,
        inputs: {
          // email is the stable primary key for upsert. Every other property
          // is dynamic per HubSpot account schema. Verify names with
          // getActionInputFieldsSchema against your connection.
          email: lead.email,
          company: lead.company,
          firstname: enriched.name?.givenName,
          lastname: enriched.name?.familyName,
          jobtitle: enriched.employment?.title,
          hs_lead_source: LEAD_SOURCE,
          hubspot_owner_id: rep.hubspotOwnerId,
          lifecyclestage: "lead",
        },
      })) as { data: Array<{ id: string }> };
      return result.data[0];
    });

    await ctx.step(`dm-new-${lead.responseId}`, async () =>
      sdk.runAction({
        appKey: DISCORD_APP_KEY,
        actionType: "write",
        actionKey: "send_direct_message",
        connection: DISCORD_CONNECTION,
        inputs: {
          user_id: rep.discordUserId,
          content: `:wave: New ${lead.region.toUpperCase()} lead: ${lead.email} from ${lead.company} (${enriched.employment?.title ?? "title unknown"}). HubSpot: ${newContact.id}`,
        },
      }),
    );

    return { outcome: "created" };
  },
);
