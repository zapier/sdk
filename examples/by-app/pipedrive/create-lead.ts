/**
 * Pipedrive — Zapier SDK example.
 * Create a new sales lead with a title and optional details.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "pipedrive", owner: "me" });
  return zapier.apps.pipedrive({ connection: connection.id });
}

/**
 * Create Lead
 * Creates a new lead.
 */
export async function createLead() {
  const pipedrive = await connect();
  await pipedrive.write.create_lead({
    inputs: {
      title: "Acme Corp Expansion", // required
      note: "Potential deal for new office setup.", // optional — Use HTML to format your text with bold, italics, or links. Other formatting options are not suppo...
      pinned_note: false, // optional — Select "Yes" to pin note to the top of this lead.
      expected_close_date: "2024-08-01", // optional
      channel_id: "webform-123", // optional — The optional ID to further distinguish the Marketing channel.
    },
  });
}
