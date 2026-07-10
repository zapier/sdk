/**
 * Eventbrite — Zapier SDK example.
 * Find an event by keyword or phrase.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "eventbrite", owner: "me" });
  return zapier.apps.eventbrite({ connection: connection.id });
}

/**
 * Find Event
 * Finds an event within an organization.
 */
export async function findEvent() {
  const eventbrite = await connect();
  await eventbrite.search.eventSearch({
    inputs: {
      query: "Networking Mixer", // required
    },
  });
}
