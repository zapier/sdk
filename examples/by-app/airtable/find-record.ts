/**
 * Find an Airtable record by field value.
 *
 * JTBD: Look up a record in a base's table by matching against one field.
 * Read-only, no writes.
 * App: Airtable (search)
 * Run: npx tsx examples/by-app/airtable/find-record.ts
 *
 * Base id, table name, and search field are dynamic per connection.
 * Verify with:
 *   zapier.getActionInputFieldsSchema({ app: "AirtableCLIAPI", actionType: "search", action: "findRecord" })
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const { data: connection } = await zapier.findFirstConnection({
    app: "airtable",
    owner: "me",
  });

  const result = await zapier.runAction({
    appKey: "AirtableCLIAPI",
    actionType: "search",
    actionKey: "findRecord",
    connection: connection.id,
    inputs: {
      applicationId: process.env.AIRTABLE_BASE_ID,
      tableName: "Leads",
      searchByField: "Email",
      searchByValue: "jane@example.com",
    },
  });

  console.log(result.data);
}

main().catch(console.error);
