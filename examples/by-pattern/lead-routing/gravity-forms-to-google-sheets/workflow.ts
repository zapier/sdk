import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Edit these three constants before deploying. See README.md for how to discover them.
const GOOGLE_SHEETS_CONNECTION = "google_sheets_primary";
const SPREADSHEET = "Form Entries";
const WORKSHEET = "Sheet1";

const GOOGLE_SHEETS_APP_KEY = "GoogleSheetsV2CLIAPI";

const InputSchema = z.object({
  entryId: z.string(),
  formTitle: z.string(),
  // Flattened field-label -> value map. Gravity Forms' raw webhook payload
  // keys fields by numeric field id; flatten it to this shape before wiring
  // the trigger to this workflow.
  fields: z.record(z.string(), z.string()),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { rowAdded: boolean }>(
  "gravity-forms-to-google-sheets",
  async (ctx, rawInput) => {
    const { entryId, formTitle, fields } = InputSchema.parse(rawInput);

    await ctx.step(`append-row-${entryId}`, async () =>
      sdk.runAction({
        appKey: GOOGLE_SHEETS_APP_KEY,
        actionType: "write",
        actionKey: "add_row",
        connection: GOOGLE_SHEETS_CONNECTION,
        inputs: {
          drive: "My Drive",
          spreadsheet: SPREADSHEET,
          worksheet: WORKSHEET,
          "Entry ID": entryId,
          Form: formTitle,
          // Every other column is dynamic — one per Gravity Forms field
          // label. Must match your worksheet's header row exactly.
          ...fields,
        },
      }),
    );

    return { rowAdded: true };
  },
);
