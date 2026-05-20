/**
 * Create a Salesforce Lead from external data.
 *
 * JTBD: Push an inbound prospect into Salesforce so the SDR motion can pick it up.
 * App: Salesforce (write)
 * Run: npx tsx examples/by-app/salesforce/create-lead.ts
 *
 * Lead field names depend on your Salesforce org schema (standard fields below
 * assume an unmodified Lead object). Verify with:
 *   zapier.getActionInputFieldsSchema({ app: "salesforce", actionType: "write", action: "create_lead" })
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const { data: connection } = await zapier.findFirstConnection({
    app: "salesforce",
    owner: "me",
  });

  await zapier.runAction({
    app: "salesforce",
    actionType: "write",
    action: "create_lead",
    connection: connection.id,
    inputs: {
      FirstName: "Jane",
      LastName: "Doe",
      Email: "jane@example.com",
      Company: "ExampleCo",
      LeadSource: "Web",
      useAssignmentRules: true,
    },
  });
}

main().catch(console.error);
