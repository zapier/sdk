/**
 * Eventbrite — Zapier SDK example.
 * Create a new event with specific details.
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
 * Create Event
 * Creates an event within an organization.
 */
export async function createEvent() {
  const eventbrite = await connect();
  await eventbrite.write.eventCreate({
    inputs: {
      name: "Summer Networking Mixer", // required
      description: "An evening of networking for local professionals at Rooftop Bar.", // optional
      start: "2024-08-15T18:00:00Z", // required
      end: "2024-08-15T21:00:00Z", // required
      currency: "USD", // required — choices: USD, EUR, GBP, CAD, AUD, NZD, +6 more
      listed: false, // optional — Is this event publicly searchable on Eventbrite?
    },
  });
}
