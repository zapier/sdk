import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const HUBSPOT_CONNECTION = "hubspot_primary";
const NOTION_CONNECTION = "notion_primary";
const NOTION_DB_ID = "REPLACE_WITH_YOUR_DATASOURCE_ID";

const NOTION_APP_KEY = "NotionCLIAPI";

// Triggered by Zapier's Schedule app (Every Day / Every Hour). The runtime
// hands over the scheduled-invocation payload; we only need the timestamp
// for idempotent per-run step names.
const InputSchema = z.object({
  triggered_at: z.string(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { mirrored: number }>(
  "hubspot-contacts-mirror",
  async (ctx, rawInput) => {
    const { triggered_at } = InputSchema.parse(rawInput);
    const runId = triggered_at;

    const contacts = await ctx.step(`fetch-contacts-${runId}`, async () => {
      // HubSpot's bulk get_all_contacts is hidden in the Zapier catalog (not stable),
      // and the non-hidden reads are event triggers, not bulk. Falling back to the
      // raw REST API here per AGENTS.md's sdk.fetch escape-hatch guidance.
      const response = await sdk.fetch(
        "https://api.hubapi.com/crm/v3/objects/contacts?limit=100&properties=email,firstname,lastname,company",
        { connection: HUBSPOT_CONNECTION, method: "GET" },
      );
      const body = (await response.json()) as {
        results: Array<{
          id: string;
          properties: { email?: string; firstname?: string; lastname?: string; company?: string };
        }>;
      };
      return body.results;
    });

    for (const contact of contacts) {
      await ctx.step(`upsert-notion-${contact.id}`, async () => {
        const { firstname, lastname, email, company } = contact.properties;
        return sdk.runAction({
          appKey: NOTION_APP_KEY,
          actionType: "write",
          actionKey: "create_database_item",
          connection: NOTION_CONNECTION,
          inputs: {
            datasource: NOTION_DB_ID,
            // properties is dynamic — shape depends on the target Notion data source.
            // Verify with getActionInputFieldsSchema against your connection.
            properties: {
              Name: {
                title: [
                  { text: { content: `${firstname ?? ""} ${lastname ?? ""}`.trim() } },
                ],
              },
              Email: { email: email ?? "" },
              Company: { rich_text: [{ text: { content: company ?? "" } }] },
            },
          },
        });
      });
    }

    return { mirrored: contacts.length };
  },
);
