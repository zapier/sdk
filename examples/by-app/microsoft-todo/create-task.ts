/**
 * MSTodo — Zapier SDK example.
 * Create a new task with details like note, due date, and importance.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "microsoft-todo", owner: "me" });
  return zapier.apps["microsoft-todo"]({ connection: connection.id });
}

/**
 * Create Task
 * Creates a new task.
 */
export async function createTask() {
  const microsoftTodo = await connect();
  await microsoftTodo.write.task({
    inputs: {
      title: "Submit Q2 Budget Report", // required
      note: "Attach the final draft and email to finance", // optional
      due_date: "2024-07-15", // optional — **NOTE** that the time portion is assumed to be midnight.
      reminder_date: "2024-07-14T09:00:00Z", // optional
      is_reminder_on: false, // optional
      importance: "high", // optional — choices: low, normal, high
    },
  });
}
