/**
 * Intercom conversation → enrich with HubSpot + Stripe context → create Zendesk ticket → alert Slack.
 *
 * JTBD: Every support ticket lands with the customer's HubSpot stage and Stripe
 * customer record already attached — so the agent isn't doing five lookups
 * before they can respond.
 *
 * Pattern: aggregation. Reads from three apps merge into one richer write.
 *
 * Apps: Intercom (search), HubSpot (search), Stripe (search), Zendesk (write), Slack (write)
 * Run: npx tsx examples/chained/support-ticket-with-context.ts <intercom_conversation_id>
 *
 * HubSpot contact-search inputs are dynamic and depend on the properties you've
 * configured — verify with:
 *   zapier.getInputFieldsSchema({ app: "hubspot", actionType: "search", action: "contactSearch" })
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function escalate(conversationId: string) {
  // 1. Pull the Intercom conversation by ID.
  const intercomConn = (await zapier.findFirstConnection({ app: "intercom", owner: "me" })).data;
  const { data: [convo] } = (await zapier.runAction({
    app: "intercom",
    actionType: "search",
    action: "retrieve_conversation",
    connection: intercomConn.id,
    inputs: { id: conversationId },
  })) as { data: any[] };

  const email = convo.user.email;

  // 2. In parallel: fetch HubSpot contact + Stripe customer record.
  const hsConn = (await zapier.findFirstConnection({ app: "hubspot", owner: "me" })).data;
  const stripeConn = (await zapier.findFirstConnection({ app: "stripe", owner: "me" })).data;

  const [hsResult, stripeResult] = await Promise.all([
    zapier.runAction({
      app: "hubspot",
      actionType: "search",
      action: "contactSearch",
      connection: hsConn.id,
      inputs: {
        first_search_property_name: "email",
        // dynamic: actual search-value field name depends on the property — verify with getInputFieldsSchema
        first_search_property_value: email,
      },
    }),
    zapier.runAction({
      app: "stripe",
      actionType: "search",
      action: "find_customer",
      connection: stripeConn.id,
      inputs: { selection: "email", query: email },
    }),
  ]);

  const contact = (hsResult as { data: any[] }).data[0];
  const customer = (stripeResult as { data: any[] }).data[0];

  // 3. Open a Zendesk ticket with everything attached.
  const zdConn = (await zapier.findFirstConnection({ app: "zendesk", owner: "me" })).data;
  const { data: [ticket] } = (await zapier.runAction({
    app: "zendesk",
    actionType: "write",
    action: "ticket",
    connection: zdConn.id,
    inputs: {
      subject: convo.source?.subject ?? `Intercom escalation from ${email}`,
      email,
      name: contact?.firstname ? `${contact.firstname} ${contact.lastname ?? ""}`.trim() : email,
      first_comment: convo.source?.body ?? "(no body)",
      priority: contact?.lifecyclestage === "customer" ? "high" : "normal",
      tags: ["from-intercom", `tier-${contact?.tier ?? "unknown"}`].join(","),
    },
  })) as { data: any[] };

  // 4. Slack the support team with the full context.
  const slackConn = (await zapier.findFirstConnection({ app: "slack", owner: "me" })).data;
  await zapier.runAction({
    app: "slack",
    actionType: "write",
    action: "channel_message",
    connection: slackConn.id,
    inputs: {
      channel: "#support-escalations",
      text: [
        `:rotating_light: Zendesk ticket #${ticket.id} for ${email}`,
        `HubSpot stage: ${contact?.lifecyclestage ?? "unknown"}`,
        customer ? `Stripe customer since: ${new Date(customer.created * 1000).toDateString()} (balance: $${(customer.balance / 100).toFixed(2)})` : "No Stripe customer record",
        `Intercom: ${convo.url ?? `(id ${convo.id})`}`,
      ].join("\n"),
    },
  });
}

escalate(process.argv[2] ?? "intercom_test_123").catch(console.error);
