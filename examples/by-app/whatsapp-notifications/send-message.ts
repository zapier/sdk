/**
 * WhatsAppNotifications — Zapier SDK example.
 * Send a WhatsApp message using a specific template.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "whatsapp-notifications", owner: "me" });
  return zapier.apps["whatsapp-notifications"]({ connection: connection.id });
}

/**
 * Send Message
 * Sends a message to a WhatsApp user.
 */
export async function sendMessage() {
  const whatsappNotifications = await connect();
  await whatsappNotifications.write.send_message({
    inputs: {
      template: "order_confirmation", // required — choices: lead_reminder, message_reminder, payment_confirmation, order_confirmation, shipping, calendar_reminder, +1 more
    },
  });
}
