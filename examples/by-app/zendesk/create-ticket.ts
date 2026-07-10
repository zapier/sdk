/**
 * Zendesk — Zapier SDK example.
 * Create a new support ticket with an initial comment.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "zendesk", owner: "me" });
  return zapier.apps.zendesk({ connection: connection.id });
}

/**
 * Create Ticket
 * Create a new ticket.
 */
export async function createTicket() {
  const zendesk = await connect();
  await zendesk.write.ticket({
    inputs: {
      subject: "Login issue on mobile app", // required
      name: "Jane Doe", // optional — To set the Requester, you must specify the Requester Name in this field AND the Requestor Email i...
      email: "jane.doe@example.com", // optional — To set the Requester, you must specify the Requester Email in this field AND the Requestor Name i...
      comment_format: "Plain Text", // optional — default "Plain Text" — choices: Plain Text, HTML
      first_comment: "User cannot log in with correct credentials. Error message: 'Invalid username or password.'", // required
      first_comment_public: "yes", // optional — default "yes" — choices: yes, no
      tags: "mobile,login,urgent", // optional — A comma separated list of tags.
      status: "new", // optional — choices: new, open, pending, hold, solved, closed
      type: "problem", // optional — choices: problem, incident, question, task
      priority: "urgent", // optional — choices: urgent, high, normal, low
    },
  });
}
