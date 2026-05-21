/**
 * New customer onboarding kicked off by a Stripe charge.
 *
 * JTBD: When a customer pays for the first time, run the entire onboarding
 * sequence — CRM record, welcome email, internal docs, team alert — without
 * manual handoffs.
 *
 * Pattern: fan-out. One inbound event drives writes across multiple apps.
 *
 * Apps: Stripe (search), HubSpot (write), Gmail (write), Notion (write), Slack (write)
 * Run: npx tsx examples/chained/stripe-charge-to-onboarding.ts ch_test_123
 *
 * Inputs marked `// dynamic` depend on the connection's specific config —
 * verify with: zapier.getActionInputFieldsSchema({ app, actionType, action }).
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function onboard(chargeId: string) {
  // 1. Pull the charge from Stripe.
  const stripeConn = (await zapier.findFirstConnection({ app: "stripe", owner: "me" })).data;
  const { data: [charge] } = (await zapier.runAction({
    app: "stripe",
    actionType: "search",
    action: "find_charge",
    connection: stripeConn.id,
    inputs: { query: chargeId },
  })) as { data: any[] };

  // 2. Upsert the contact in HubSpot.
  //    Only `email` is a static field — additional contact properties (firstname,
  //    lastname, lifecyclestage, etc.) flow through dynamic properties keyed by
  //    your HubSpot account's property names.
  const hsConn = (await zapier.findFirstConnection({ app: "hubspot", owner: "me" })).data;
  const { data: [contact] } = (await zapier.runAction({
    app: "hubspot",
    actionType: "write",
    action: "upsert_contact",
    connection: hsConn.id,
    inputs: {
      email: charge.customer_email,
      // dynamic properties — names depend on your HubSpot setup:
      firstname: charge.billing_details?.name?.split(" ")[0],
      lastname: charge.billing_details?.name?.split(" ").slice(1).join(" "),
      lifecyclestage: "customer",
    },
  })) as { data: any[] };

  // 3. Send a welcome email via Gmail.
  const gmailConn = (await zapier.findFirstConnection({ app: "gmail", owner: "me" })).data;
  await zapier.runAction({
    app: "gmail",
    actionType: "write",
    action: "message",
    connection: gmailConn.id,
    inputs: {
      to: [charge.customer_email],
      subject: "Welcome aboard",
      body: "Thanks for becoming a customer. Here's what to expect in your first week...",
    },
  });

  // 4. Spin up an onboarding doc in Notion.
  const notionConn = (await zapier.findFirstConnection({ app: "notion", owner: "me" })).data;
  const { data: [doc] } = (await zapier.runAction({
    app: "notion",
    actionType: "write",
    action: "create_database_item",
    connection: notionConn.id,
    inputs: {
      database_id: process.env.NOTION_ONBOARDING_DB_ID, // dynamic
      properties: {
        Name: { title: [{ text: { content: charge.customer_email } }] },
        Status: { select: { name: "Day 0" } },
        ContactId: { rich_text: [{ text: { content: contact.id } }] },
      },
    },
  })) as { data: any[] };

  // 5. Notify the team so a CSM picks up.
  const slackConn = (await zapier.findFirstConnection({ app: "slack", owner: "me" })).data;
  await zapier.runAction({
    app: "slack",
    actionType: "write",
    action: "channel_message",
    connection: slackConn.id,
    inputs: {
      channel: "#new-customers",
      text: `:tada: New customer: ${charge.customer_email} ($${(charge.amount / 100).toFixed(2)}). HubSpot: ${contact.id}. Onboarding doc: ${doc.url}`,
    },
  });
}

onboard(process.argv[2] ?? "ch_test_123").catch(console.error);
