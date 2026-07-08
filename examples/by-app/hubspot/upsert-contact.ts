/**
 * Upsert a HubSpot contact from external data.
 *
 * JTBD: Push an inbound prospect into HubSpot so the sales motion can pick it
 * up. Upsert-by-email means the same call is safe to retry.
 * App: HubSpot (write)
 * Run: npx tsx examples/by-app/hubspot/upsert-contact.ts
 *
 * Every property beyond `email` is dynamic per account schema (firstname,
 * lastname, lifecyclestage, custom fields). Verify with:
 *   zapier.getActionInputFieldsSchema({ app: "HubSpotCLIAPI", actionType: "write", action: "upsert_contact" })
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const { data: connection } = await zapier.findFirstConnection({
    app: "hubspot",
    owner: "me",
  });

  await zapier.runAction({
    appKey: "HubSpotCLIAPI",
    actionType: "write",
    actionKey: "upsert_contact",
    connection: connection.id,
    inputs: {
      email: "jane@example.com",
      firstname: "Jane",
      lastname: "Doe",
      lifecyclestage: "lead",
    },
  });
}

main().catch(console.error);
