/**
 * CloseIO — Zapier SDK example.
 * Find WhatsApp messages matching specific criteria.
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
 * Find WhatsApp Messages
 * Find existing WhatsApp Messages.
 */
export async function searchWhatsappMessages() {
  const close = await connect();
  await close.search.search_whatsapp_messages({
    inputs: {
      result_limit: 5, // required — default "single_result" — choices: single_result, multiple_results — Choose whether this step should yield multiple WhatsApp Messages or just a single one (the best m...
      search_direction: "incoming", // optional — choices: incoming, outgoing — Filter by message direction.
      search_text: "appointment reminder", // optional — Search for messages containing specific text.
      search_local_phone: "+14155551234", // optional — Search by local phone number.
      search_remote_phone: "+14155559876", // optional — Search by remote phone number.
    },
  });
}
