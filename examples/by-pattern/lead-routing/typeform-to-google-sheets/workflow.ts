import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Edit these three constants before deploying. See README.md for how to discover them.
const GOOGLE_SHEETS_CONNECTION = "google_sheets_primary";
const SPREADSHEET = "Form Responses";
const WORKSHEET = "Sheet1";

const GOOGLE_SHEETS_APP_KEY = "GoogleSheetsV2CLIAPI";

const InputSchema = z.object({
  responseId: z.string(),
  formTitle: z.string(),
  submittedAt: z.string(),
  // Flattened question-title -> answer-text map. Typeform's raw webhook
  // payload nests each answer under `field` + a type-specific value key;
  // flatten it to this shape before wiring the trigger to this workflow.
  answers: z.record(z.string(), z.string()),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { rowAdded: boolean }>(
  "typeform-to-google-sheets",
  async (ctx, rawInput) => {
    const { responseId, formTitle, submittedAt, answers } = InputSchema.parse(rawInput);

    await ctx.step(`append-row-${responseId}`, async () =>
      sdk.runAction({
        appKey: GOOGLE_SHEETS_APP_KEY,
        actionType: "write",
        actionKey: "add_row",
        connection: GOOGLE_SHEETS_CONNECTION,
        inputs: {
          drive: "My Drive",
          spreadsheet: SPREADSHEET,
          worksheet: WORKSHEET,
          "Response ID": responseId,
          Form: formTitle,
          "Submitted At": submittedAt,
          // Every other column is dynamic — one per Typeform question title.
          // Must match your worksheet's header row exactly.
          ...answers,
        },
      }),
    );

    return { rowAdded: true };
  },
);
