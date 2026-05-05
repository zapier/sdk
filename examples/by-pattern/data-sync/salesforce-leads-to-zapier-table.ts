/**
 * Mirror Salesforce leads into a Zapier Table for downstream tooling.
 *
 * JTBD: Give the data team a queryable lead feed without building a Salesforce
 * connector themselves. Tables become the integration boundary.
 * Apps: Salesforce (search), Zapier Tables (write)
 * Run: npx tsx examples/by-pattern/data-sync/salesforce-leads-to-zapier-table.ts
 *
 * Salesforce field names depend on your org's schema. The output below assumes
 * standard Lead fields (Id, Email, Company, CreatedDate). Verify with:
 *   zapier.getInputFieldsSchema({ app: "salesforce", actionType: "search", action: "find_records_v2" })
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const sfConn = (await zapier.findFirstConnection({ app: "salesforce", owner: "me" })).data;

  // Find or create the destination table.
  let table: any = null;
  for await (const t of zapier.listTables({ search: "salesforce-leads-mirror" }).items()) {
    table = t;
    break;
  }
  if (!table) {
    const created = await zapier.createTable({ name: "salesforce-leads-mirror" });
    await zapier.createTableFields({
      table: created.data.id,
      fields: [
        { name: "lead_id", type: "string" },
        { name: "email", type: "string" },
        { name: "company", type: "string" },
        { name: "created_at", type: "datetime" },
      ],
    });
    table = created.data;
  }

  // Pull leads. Cast the runAction result because action-key result shapes
  // are resolved at runtime — the SDK types `data` as unknown[].
  const result = (await zapier.runAction({
    app: "salesforce",
    actionType: "search",
    action: "find_records_v2",
    connection: sfConn.id,
    inputs: { object: "Lead" },
  })) as { data: any[] };

  await zapier.createTableRecords({
    table: table.id,
    keyMode: "names",
    records: result.data.map((l: any) => ({
      data: {
        lead_id: l.Id,
        email: l.Email,
        company: l.Company,
        created_at: l.CreatedDate,
      },
    })),
  });
}

main().catch(console.error);
