/**
 * Intercom — Zapier SDK example.
 * Find a user by email address.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "intercom", owner: "me" });
  return zapier.apps.intercom({ connection: connection.id });
}

/**
 * Find User
 * Finds an existing user.
 */
export async function findUser() {
  const intercom = await connect();
  await intercom.search.find_user({
    inputs: {
      search_mode: "email", // required — choices: email, id, user_id — Which value would you like to search by? You can use an `Email`, `ID`, or `User ID` (which return...
      search_value: "jane.doe@example.com", // required — Put your desired search value here. *(e.g. If it's an email, make sure the Search Mode is set to ...
    },
  });
}
