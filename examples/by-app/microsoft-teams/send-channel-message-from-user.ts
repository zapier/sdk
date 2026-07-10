/**
 * MSTeams — Zapier SDK example.
 * Send a message to a Microsoft Teams channel as a user.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "microsoft-teams", owner: "me" });
  return zapier.apps["microsoft-teams"]({ connection: connection.id });
}

/**
 * Send Channel Message
 * Sends a message to an existing channel.
 */
export async function sendChannelMessageFromUser() {
  const microsoftTeams = await connect();
  await microsoftTeams.write.send_channel_message_from_user({
    inputs: {
      message: "Quarterly review meeting is scheduled for Friday at 10am.", // required — To mention team members, channels or teams put their display name or ID between tags (&lt;user&gt...
      format: "text", // optional — choices: plain, xml, markdown
      importance: "high", // optional — choices: normal, high, urgent — Set the importance level of the message.
    },
  });
}
