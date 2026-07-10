/**
 * CloseIO — Zapier SDK example.
 * Send a WhatsApp message to a contact.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "close", owner: "me" });
  return zapier.apps.close({ connection: connection.id });
}

/**
 * Create WhatsApp Message
 * Creates a new WhatsApp message.
 */
export async function createWhatsappMessage() {
  const close = await connect();
  await close.write.create_whatsapp_message({
    inputs: {
      contact_id: "12345", // required — The contact ID associated with this WhatsApp message.
      direction: "outgoing", // required — choices: incoming, outgoing — The direction of the WhatsApp message.
      message_markdown: "Hello, this is your appointment reminder for 3pm today!", // required — The body of the message in WhatsApp Markdown format.
      local_phone: "+14155551234", // required — The local phone number (your WhatsApp business number).
      remote_phone: "+14155559876", // required — The remote phone number (recipient/sender phone number).
      external_whatsapp_message_id: "msg-20240612-001", // required — The external WhatsApp message ID from WhatsApp system.
      integration_link: "https://crm.example.com/lead/12345", // optional — Optional URL linking back to the message in the external system.
      activity_at: "2024-06-12T14:30:00Z", // optional — The timestamp when the activity occurred (defaults to current time).
      send_to_inbox: false, // optional — Create a corresponding Inbox Notification for incoming messages.
    },
  });
}
