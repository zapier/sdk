/**
 * GoogleCalendar — Zapier SDK example.
 * Find calendar events matching a search term.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "google-calendar", owner: "me" });
  return zapier.apps["google-calendar"]({ connection: connection.id });
}

/**
 * New or Updated Event Matching Search
 * Triggers when an event is created or updated to match the search.
 */
export async function searchEvents() {
  const googleCalendar = await connect();
  await googleCalendar.read.search({
    inputs: {
      search_term: "Kickoff Meeting", // required — Triggers only on events containing the search term. **Note**: Search operators such as `AND` or `...
      only_new_events: false, // optional — default false — When enabled, only events that were just created will trigger this Zap. Updated events will be ig...
    },
  });
}
