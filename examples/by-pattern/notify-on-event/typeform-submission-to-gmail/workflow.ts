import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const GMAIL_CONNECTION = "gmail_primary";
const EMAIL_SUBJECT = "Thanks for your submission";
const EMAIL_BODY = "Hi — we got your response and will follow up within one business day.";

const GMAIL_APP_KEY = "GoogleMailV2CLIAPI";

const InputSchema = z.object({
  responseId: z.string(),
  respondentEmail: z.string().email(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { sent: boolean }>(
  "typeform-submission-to-gmail",
  async (ctx, rawInput) => {
    const { responseId, respondentEmail } = InputSchema.parse(rawInput);

    await ctx.step(`send-confirmation-${responseId}`, async () =>
      sdk.runAction({
        appKey: GMAIL_APP_KEY,
        actionType: "write",
        actionKey: "message",
        connection: GMAIL_CONNECTION,
        inputs: {
          to: [respondentEmail],
          subject: EMAIL_SUBJECT,
          body: EMAIL_BODY,
        },
      }),
    );

    return { sent: true };
  },
);
