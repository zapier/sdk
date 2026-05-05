/**
 * Route an inbound form submission to the right rep based on the lead's region.
 *
 * JTBD: When someone fills out the contact form, the right person picks it up
 * within minutes — no shared inbox, no triage queue.
 * Apps: Zapier Tables (read — the rep roster), Slack (write — DM the rep)
 * Run: npx tsx examples/by-pattern/lead-routing/route-form-lead-by-region.ts
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

type Lead = { email: string; company: string; region: "amer" | "emea" | "apac" };

async function routeLead(lead: Lead) {
  const slackConn = (await zapier.findFirstConnection({ app: "slack", owner: "me" })).data;

  // Tables filters use the [{ fieldKey, operator, value }] shape.
  // keyMode: "names" addresses fields by their declared name.
  const { data: rows } = await zapier.listTableRecords({
    table: process.env.REP_ROSTER_TABLE_ID!,
    keyMode: "names",
    filters: [{ fieldKey: "region", operator: "exact", value: lead.region }],
  });

  const rep = rows[0];
  if (!rep) throw new Error(`No rep configured for region ${lead.region}`);

  // Row field values live under .data.
  const slackUserId = rep.data.slack_user_id as string;

  // direct_message is documented in the SDK reference — typed form is safe.
  const slack = zapier.apps.slack({ connection: slackConn.id });
  await slack.write.direct_message({
    inputs: {
      channel: slackUserId,
      text: `New ${lead.region.toUpperCase()} lead: ${lead.email} from ${lead.company}`,
    },
  });
}

routeLead({ email: "buyer@example.com", company: "ExampleCo", region: "amer" }).catch(console.error);
