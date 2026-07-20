import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const GMAIL_CONNECTION = "gmail_primary";
const EMAIL_SUBJECT = "New row added";

const GMAIL_APP_KEY = "GoogleMailV2CLIAPI";

const InputSchema = z.object({
  rowId: z.string(),
  recipientEmail: z.string().email(),
  // Formatted "Column: value" text assembled upstream (a Formatter/Code step
  // ahead of this workflow, or equivalent transform on your trigger).
  rowSummary: z.string(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { sent: boolean }>(
  "google-sheets-row-to-gmail",
  async (ctx, rawInput) => {
    const { rowId, recipientEmail, rowSummary } = InputSchema.parse(rawInput);

    await ctx.step(`send-notification-${rowId}`, async () =>
      sdk.runAction({
        appKey: GMAIL_APP_KEY,
        actionType: "write",
        actionKey: "message",
        connection: GMAIL_CONNECTION,
        inputs: {
          to: [recipientEmail],
          subject: EMAIL_SUBJECT,
          body: rowSummary,
        },
      }),
    );

    return { sent: true };
  },
);
