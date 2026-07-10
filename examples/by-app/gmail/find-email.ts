/**
 * GoogleMail — Zapier SDK example.
 * Find an email matching a specific search query.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "gmail", owner: "me" });
  return zapier.apps.gmail({ connection: connection.id });
}

/**
 * Find Email
 * Finds an email message.
 */
export async function findEmail() {
  const gmail = await connect();
  await gmail.search.message({
    inputs: {
      query: "from:ceo@company.com is:unread", // required — Use words or symbols as [search operators](https://support.google.com/mail/answer/7190?hl=en) to ...
    },
  });
}
