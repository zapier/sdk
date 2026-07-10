/**
 * HighLevel — Zapier SDK example.
 * Add a task with a title and description for a lead.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "leadconnector", owner: "me" });
  return zapier.apps.leadconnector({ connection: connection.id });
}

/**
 * Add Task
 * Adds a task to the account.
 */
export async function addTask() {
  const leadconnector = await connect();
  await leadconnector.write.task({
    inputs: {
      title: "Follow up with new lead", // required
      body: "Call to discuss project requirements.", // required
      dueDate: "2024-07-01", // optional
      firstName: "Jane", // optional
      lastName: "Doe", // optional
      phone: "555-123-4567", // optional
      email: "jane.doe@example.com", // optional
    },
  });
}
