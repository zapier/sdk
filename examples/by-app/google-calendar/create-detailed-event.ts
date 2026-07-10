/**
 * GoogleCalendar — Zapier SDK example.
 * Create a calendar event with specific details including time, title, description, and location.
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
 * Create Detailed Event
 * Create an event by defining each field.
 */
export async function createDetailedEvent() {
  const googleCalendar = await connect();
  await googleCalendar.write.detailed_event({
    inputs: {
      summary: "Project Kickoff Meeting", // optional — Summary of the new event
      description: "Initial meeting to discuss project scope and deliverables.", // optional — Description of the new event
      location: "123 Main St, San Francisco, CA", // optional — Location of the new event
      conferencing: false, // optional — default false — If "Yes," automatically creates a video meeting link for the event.
      start__dateTime: "2024-07-15T09:00:00-07:00", // required — Date and time of when this event starts.
      end__dateTime: "2024-07-15T10:00:00-07:00", // required — Date and time of when this event ends.
      recurrence_frequency: "weekly", // optional — choices: daily, weekly, monthly, yearly — Select a frequency to make this event repeating.
      recurrence_until: "2024-09-15", // optional — The event will repeat only until this date, if set.
      all_day: false, // optional — default false
      visibility: "default", // optional — default "default" — choices: default, public, private
      reminders__useDefault: true, // optional — default true — Use your calendar's default reminders, or set specific below (can be empty).
      transparency: "transparent", // optional — choices: transparent, opaque
      guestsCanModify: false, // optional
      eventType: "default", // optional — default "default" — choices: default, outOfOffice — The type of event to create. Default is a standard calendar event.
    },
  });
}
