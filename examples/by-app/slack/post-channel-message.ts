/**
 * Post a message to a Slack channel.
 *
 * JTBD: Broadcast to a team — the most common Slack-out pattern.
 * App: Slack (write)
 * Run: npx tsx examples/by-app/slack/post-channel-message.ts
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const { data: connection } = await zapier.findFirstConnection({
    app: "slack",
    owner: "me",
  });

  await zapier.runAction({
    app: "slack",
    actionType: "write",
    action: "channel_message",
    connection: connection.id,
    inputs: {
      channel: "#general",
      text: "Deploy finished — release v2.4 is live.",
    },
  });
}

main().catch(console.error);
