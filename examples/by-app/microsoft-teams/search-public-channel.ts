/**
 * MSTeams — Zapier SDK example.
 * Find public channels in Microsoft Teams by name.
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
 * Find Public Channels
 * Finds public channels by name within a team.
 */
export async function searchPublicChannel() {
  const microsoftTeams = await connect();
  await microsoftTeams.search.search_public_channel({
    inputs: {
      channel_name: "Marketing", // required — Enter the name of the channel you want to search for
      include_archived: false, // optional — default false — Set to true to include archived channels in the search results
    },
  });
}
