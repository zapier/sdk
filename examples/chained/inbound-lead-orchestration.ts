/**
 * Inbound Typeform lead → check Salesforce → enrich → assign rep → notify.
 *
 * JTBD: Every web lead is on a rep's plate within minutes, with the right
 * context attached. No manual triage, no leads lost in a shared inbox.
 *
 * Pattern: conditional branching. The Salesforce lookup decides whether this
 * is a new lead (full enrichment + creation flow) or an existing contact
 * (lighter "they're back" notification).
 *
 * Apps: Typeform (search), Salesforce (search + write), Clearbit (HTTP fetch
 *       via zapier.fetch), Zapier Tables (read — rep roster), Slack (write)
 * Run: npx tsx examples/chained/inbound-lead-orchestration.ts
 *
 * Salesforce field names below assume standard Lead fields — verify with:
 *   zapier.getActionInputFieldsSchema({ app: "salesforce", actionType: "write", action: "create_lead" })
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function processLead(formId: string) {
  // 1. Pull the most recent Typeform response.
  const tfConn = (await zapier.findFirstConnection({ app: "typeform", owner: "me" })).data;
  const tfResult = (await zapier.runAction({
    app: "typeform",
    actionType: "search",
    action: "lookup_responses",
    connection: tfConn.id,
    inputs: { formId, size: 1 },
  })) as { data: any[] };
  const response = tfResult.data[0];
  if (!response) return;

  const email = response.answers.email;
  const company = response.answers.company;
  const region = response.answers.region;

  // 2. Check Salesforce — does this person already exist?
  const sfConn = (await zapier.findFirstConnection({ app: "salesforce", owner: "me" })).data;
  const { data: [existing] } = (await zapier.runAction({
    app: "salesforce",
    actionType: "search",
    action: "find_record",
    connection: sfConn.id,
    inputs: {
      object: "Lead",
      searchValue: email,
      // searchField is dynamic — defaults to Email when searching Leads. Verify
      // with: zapier.getActionInputFieldsSchema({ app: "salesforce", actionType: "search", action: "find_record" })
    },
  })) as { data: any[] };

  // 3. Look up the rep from the Tables-based roster.
  const { data: rosterRows } = await zapier.listTableRecords({
    table: process.env.REP_ROSTER_TABLE_ID!,
    keyMode: "names",
    filters: [{ fieldKey: "region", operator: "exact", value: region }],
  });
  const rep = rosterRows[0];
  if (!rep) throw new Error(`No rep configured for region ${region}`);
  const repSlack = rep.data.slack_user_id as string;
  const repSalesforce = rep.data.salesforce_user_id as string | undefined;

  const slackConn = (await zapier.findFirstConnection({ app: "slack", owner: "me" })).data;
  const slack = zapier.apps.slack({ connection: slackConn.id });

  if (existing) {
    await slack.write.direct_message({
      inputs: {
        channel: repSlack,
        text: `${email} (${company}) submitted the form again. Existing Salesforce lead: ${existing.Id}`,
      },
    });
    return;
  }

  // 4a. New lead — enrich via Clearbit (raw HTTP through Zapier auth).
  const clearbitConn = (await zapier.findFirstConnection({ app: "clearbit", owner: "me" })).data;
  const enriched = await zapier
    .fetch(`https://person.clearbit.com/v2/people/find?email=${encodeURIComponent(email)}`, {
      connection: clearbitConn.id,
      method: "GET",
    })
    .then((r) => r.json() as Promise<any>);

  // 4b. Create the Salesforce lead with the enriched data.
  const { data: [newLead] } = (await zapier.runAction({
    app: "salesforce",
    actionType: "write",
    action: "create_lead",
    connection: sfConn.id,
    inputs: {
      Email: email,
      Company: company,
      FirstName: enriched.name?.givenName,
      LastName: enriched.name?.familyName,
      Title: enriched.employment?.title,
      LeadSource: "Web - Typeform",
      OwnerId: repSalesforce,
      useAssignmentRules: false,
    },
  })) as { data: any[] };

  // 4c. DM the rep with full context.
  await slack.write.direct_message({
    inputs: {
      channel: repSlack,
      text: `:wave: New ${region.toUpperCase()} lead: ${email} from ${company} (${enriched.employment?.title ?? "title unknown"}). Salesforce: ${newLead.Id}`,
    },
  });
}

processLead(process.argv[2] ?? process.env.TYPEFORM_ID ?? "").catch(console.error);
