/**
 * Mirror HubSpot contacts into Notion as pages, for a sales-ops dashboard.
 *
 * JTBD: Sales-ops wants Notion to be the working surface for contact research,
 * but HubSpot is the source of truth.
 *
 * HubSpot doesn't expose a "list all contacts" action, so this example uses
 * `zapier.fetch` against HubSpot's REST API directly — same auth, same audit
 * trail, but escapes the action catalog when there's no first-class action.
 *
 * Apps: HubSpot (raw HTTP via zapier.fetch), Notion (write)
 * Run: npx tsx examples/by-pattern/data-sync/hubspot-contacts-mirror.ts
 *
 * Notion field shape depends on your database schema. Verify with:
 *   zapier.getActionInputFieldsSchema({ app: "notion", actionType: "write", action: "create_database_item" })
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const hsConn = (await zapier.findFirstConnection({ app: "hubspot", owner: "me" })).data;
  const notionConn = (await zapier.findFirstConnection({ app: "notion", owner: "me" })).data;

  const response = await zapier.fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts?limit=100&properties=email,firstname,lastname,company",
    { connection: hsConn.id, method: "GET" }
  );
  const { results: contacts } = (await response.json()) as { results: any[] };

  for (const contact of contacts) {
    const { firstname, lastname, email, company } = contact.properties;
    await zapier.runAction({
      app: "notion",
      actionType: "write",
      action: "create_database_item",
      connection: notionConn.id,
      inputs: {
        database_id: process.env.NOTION_DB_ID, // dynamic — pick your contacts database
        properties: {
          // Property names below match a Notion database with Name/Email/Company columns.
          // Adjust to your schema.
          Name: { title: [{ text: { content: `${firstname ?? ""} ${lastname ?? ""}`.trim() } }] },
          Email: { email },
          Company: { rich_text: [{ text: { content: company ?? "" } }] },
        },
      },
    });
  }
}

main().catch(console.error);
