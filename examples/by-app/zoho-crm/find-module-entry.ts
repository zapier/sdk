/**
 * ZohoCRM — Zapier SDK example.
 * Find a module entry by a specific value in Zoho CRM.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "zoho-crm", owner: "me" });
  return zapier.apps["zoho-crm"]({ connection: connection.id });
}

/**
 * Find Module Entry
 * Finds an entry in a module
 */
export async function findModuleEntry() {
  const zohoCrm = await connect();
  await zohoCrm.search.search_module_entry({
    inputs: {
      value: "john.doe@email.com", // required — Connection should be of 'Administrator' privilege to fetch all entries in the module, otherwise t...
      value_2: "Leads", // optional — Connection should be of 'Administrator' privilege to fetch all entries in the module, otherwise t...
    },
  });
}
