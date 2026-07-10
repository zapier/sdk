/**
 * CognitoForms — Zapier SDK example.
 * Retrieve all entries from a specific Cognito Forms view.
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
 * Get Form Entries
 * Retrieves entries from a form using a specific entry view via OData.
 */
export async function getFormEntries() {
  const cognitoForms = await connect();
  await cognitoForms.search.get_form_entries({
    inputs: {
      entryViewId: "view-2024-open-applications", // required — The entry view that defines which fields to retrieve.
      maxResults: 1000, // optional — default 1000 — Maximum number of entries to return per request (1-10000).
      selectIdOnly: false, // optional — default false — Return only entry IDs instead of full entry data.
    },
  });
}
