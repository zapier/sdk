/**
 * Send a direct message to a specific Discord user.
 *
 * JTBD: Notify one human, not a channel. The smallest unit of Discord-out.
 * App: Discord (write)
 * Run: npx tsx examples/by-app/discord/send-direct-message.ts
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
    actionKey: "send_direct_message",
    connection: connection.id,
    inputs: {
      user_id: "1234567890",
      content: "Hello from Zapier SDK",
    },
  });
}

main().catch(console.error);
