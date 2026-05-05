/**
 * Send a direct message to a specific Slack user.
 *
 * JTBD: Notify one human, not a channel — the smallest unit of Slack-out.
 * App: Slack (write)
 * Run: npx tsx examples/by-app/slack/send-direct-message.ts
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const { data: connection } = await zapier.findFirstConnection({
    app: "slack",
    owner: "me",
  });

  const slack = zapier.apps.slack({ connection: connection.id });

  await slack.write.direct_message({
    inputs: {
      channel: "U12345",
      text: "Hello from the Zapier SDK",
    },
  });
}

main().catch(console.error);
