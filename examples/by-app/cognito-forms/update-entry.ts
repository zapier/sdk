/**
 * CognitoForms — Zapier SDK example.
 * Update an existing Cognito Forms entry with new information.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "cognito-forms", owner: "me" });
  return zapier.apps["cognito-forms"]({ connection: connection.id });
}

/**
 * Update Entry
 * Updates an entry.
 */
export async function updateEntry() {
  const cognitoForms = await connect();
  await cognitoForms.write.edit_entry({
    inputs: {
      entry_id: "f3a1b9c2-45d7-4a2e-9a72-2e4d6b7c8c9d", // required
    },
  });
}
