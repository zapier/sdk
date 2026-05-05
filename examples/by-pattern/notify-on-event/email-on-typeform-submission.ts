/**
 * Send a confirmation email for every recent Typeform response.
 *
 * JTBD: Forms get instant acknowledgement without standing up a backend.
 * Apps: Typeform (search), Gmail (write)
 * Run: npx tsx examples/by-pattern/notify-on-event/email-on-typeform-submission.ts
 *
 * Inputs marked with `// dynamic` depend on the connection's specific config —
 * verify shape with: zapier.getInputFieldsSchema({ app, actionType, action }).
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function main() {
  const tfConn = (await zapier.findFirstConnection({ app: "typeform", owner: "me" })).data;
  const gmailConn = (await zapier.findFirstConnection({ app: "gmail", owner: "me" })).data;

  const result = (await zapier.runAction({
    app: "typeform",
    actionType: "search",
    action: "lookup_responses",
    connection: tfConn.id,
    inputs: {
      formId: process.env.TYPEFORM_ID, // dynamic enum — pick the form to read from
      size: 25,
    },
  })) as { data: any[] };

  for (const r of result.data) {
    await zapier.runAction({
      app: "gmail",
      actionType: "write",
      action: "message",
      connection: gmailConn.id,
      inputs: {
        to: [r.respondent_email],
        subject: "Thanks for your submission",
        body: "Hi — we got your response and will follow up within one business day.",
      },
    });
  }
}

main().catch(console.error);
