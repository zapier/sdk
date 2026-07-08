import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const HUBSPOT_CONNECTION = "hubspot_primary";
const DESTINATION_TABLE_NAME = "hubspot-contacts-mirror";

const InputSchema = z.object({
  triggered_at: z.string(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { mirrored: number }>(
  "hubspot-contacts-to-zapier-table",
  async (ctx, rawInput) => {
    const { triggered_at } = InputSchema.parse(rawInput);
    const runId = triggered_at;

    const table = await ctx.step("resolve-destination-table", async () => {
      for await (const t of sdk.listTables({ search: DESTINATION_TABLE_NAME }).items()) {
        return t;
      }
      const created = await sdk.createTable({ name: DESTINATION_TABLE_NAME });
      await sdk.createTableFields({
        table: created.data.id,
        fields: [
          { name: "contact_id", type: "string" },
          { name: "email", type: "string" },
          { name: "first_name", type: "string" },
          { name: "last_name", type: "string" },
          { name: "company", type: "string" },
          { name: "created_at", type: "datetime" },
        ],
      });
      return created.data;
    });

    const contacts = await ctx.step(`fetch-contacts-${runId}`, async () => {
      // HubSpot's bulk get_all_contacts action is hidden in the Zapier catalog
      // (not on the stable surface), and the non-hidden reads are event
      // triggers, not bulk. Falling back to the raw REST API here per
      // AGENTS.md's sdk.fetch escape-hatch guidance.
      const response = await sdk.fetch(
        "https://api.hubapi.com/crm/v3/objects/contacts?limit=100&properties=email,firstname,lastname,company,createdate",
        { connection: HUBSPOT_CONNECTION, method: "GET" },
      );
      const body = (await response.json()) as {
        results: Array<{
          id: string;
          properties: {
            email?: string;
            firstname?: string;
            lastname?: string;
            company?: string;
            createdate?: string;
          };
        }>;
      };
      return body.results;
    });

    await ctx.step(`write-table-${runId}`, async () =>
      sdk.createTableRecords({
        table: table.id,
        keyMode: "names",
        records: contacts.map((c) => ({
          data: {
            contact_id: c.id,
            email: c.properties.email ?? "",
            first_name: c.properties.firstname ?? "",
            last_name: c.properties.lastname ?? "",
            company: c.properties.company ?? "",
            created_at: c.properties.createdate ?? "",
          },
        })),
      }),
    );

    return { mirrored: contacts.length };
  },
);
