/**
 * Create a new page (item) in a Notion database.
 *
 * JTBD: Drop a structured record into Notion (e.g. a meeting note, a customer
 * profile) from your code or agent.
 * App: Notion (write)
 * Run: npx tsx examples/by-app/notion/create-page.ts
 *
 * Notion property shape depends on your database's schema. Verify with:
 *   zapier.getInputFieldsSchema({ app: "notion", actionType: "write", action: "create_database_item" })
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const { data: connection } = await zapier.findFirstConnection({
    app: "notion",
    owner: "me",
  });

  await zapier.runAction({
    app: "notion",
    actionType: "write",
    action: "create_database_item",
    connection: connection.id,
    inputs: {
      database_id: process.env.NOTION_DB_ID, // dynamic — pick the target database
      properties: {
        Name: { title: [{ text: { content: "Q2 Planning Notes" } }] },
        Status: { select: { name: "Draft" } },
      },
    },
  });
}

main().catch(console.error);
