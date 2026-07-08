/**
 * Post a message to a Discord channel.
 *
 * JTBD: Broadcast to a team. The most common Discord-out pattern.
 * App: Discord (write)
 * Run: npx tsx examples/by-app/discord/send-channel-message.ts
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const { data: connection } = await zapier.findFirstConnection({
    app: "discord",
    owner: "me",
  });

  await zapier.runAction({
    appKey: "DiscordCLIAPI",
    actionType: "write",
    actionKey: "send_channel_message",
    connection: connection.id,
    inputs: {
      channel_id: "1234567890",
      content: "Deploy finished. Release v2.4 is live.",
    },
  });
}

main().catch(console.error);
