/**
 * ClickUp — Zapier SDK example.
 * Find a user by name or email.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "clickup", owner: "me" });
  return zapier.apps.clickup({ connection: connection.id });
}

/**
 * Find User by Name or Email
 * Find an existing user by their name or their email.
 */
export async function findUser() {
  const clickup = await connect();
  await clickup.search.findUser({
    inputs: {
      field: "email", // required — choices: username, email
      value: "alice.jones@acme.com", // required
      include_shared: true, // optional — default true — If true, it will provide the IDs of all Folders, Lists, and Tasks that the user has access to.
    },
  });
}
