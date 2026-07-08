/**
 * Find Notion pages by title.
 *
 * JTBD: Look up a page you know the title of. The simplest read-only Notion
 * call in the corpus. No database ID, no property schema — just a title
 * string and a fuzzy/exact flag.
 * App: Notion (search)
 * Run: npx tsx examples/by-app/notion/find-page-by-title.ts "Q2 Planning"
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const query = process.argv[2] ?? "Q2 Planning";

  const { data: connection } = await zapier.findFirstConnection({
    app: "notion",
    owner: "me",
  });

  const result = await zapier.runAction({
    appKey: "NotionCLIAPI",
    actionType: "search",
    actionKey: "page_by_title",
    connection: connection.id,
    inputs: {
      title: query,
      exact_match: "no",
    },
  });

  console.log(result.data);
}

main().catch(console.error);
