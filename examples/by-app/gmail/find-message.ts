/**
 * Search Gmail for messages matching a query.
 *
 * JTBD: Look up messages by Gmail's search syntax (`from:`, `subject:`,
 * `has:attachment`, etc.). Read-only, no writes.
 * App: Gmail (search)
 * Run: npx tsx examples/by-app/gmail/find-message.ts "from:receipts@stripe.com"
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const query = process.argv[2] ?? "from:receipts@stripe.com";

  const { data: connection } = await zapier.findFirstConnection({
    app: "gmail",
    owner: "me",
  });

  const result = await zapier.runAction({
    appKey: "GoogleMailV2CLIAPI",
    actionType: "search",
    actionKey: "message",
    connection: connection.id,
    inputs: {
      query,
    },
  });

  console.log(result.data);
}

main().catch(console.error);
