import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Edit these three constants before deploying. See README.md for how to discover them.
const GOOGLE_SHEETS_CONNECTION = "google_sheets_primary";
const SPREADSHEET = "Leads";
const WORKSHEET = "Sheet1";

const GOOGLE_SHEETS_APP_KEY = "GoogleSheetsV2CLIAPI";

// Meta lead field labels are set by the form owner. Edit if your form uses different names.
const FIELD_EMAIL = "email";
const FIELD_PHONE = "phone_number";
const FIELD_FIRST_NAME = "first_name";
const FIELD_LAST_NAME = "last_name";

const InputSchema = z.object({
  leadgen_id: z.string(),
  form_name: z.string().optional(),
  ad_name: z.string().optional(),
  campaign_name: z.string().optional(),
  field_data: z.array(
    z.object({ name: z.string(), values: z.array(z.string()) }),
  ),
});
type Input = z.infer<typeof InputSchema>;

function pickField(fd: Input["field_data"], key: string): string | undefined {
  return fd.find((f) => f.name.toLowerCase() === key.toLowerCase())?.values[0];
}

export default defineDurable<Input, { rowAdded: boolean }>(
  "facebook-lead-ads-to-google-sheets",
  async (ctx, rawInput) => {
    const lead = InputSchema.parse(rawInput);

    const email = pickField(lead.field_data, FIELD_EMAIL);
    const phone = pickField(lead.field_data, FIELD_PHONE);
    const firstName = pickField(lead.field_data, FIELD_FIRST_NAME) ?? "Lead";
    const lastName = pickField(lead.field_data, FIELD_LAST_NAME) ?? "(from Meta)";

    await ctx.step(`append-row-${lead.leadgen_id}`, async () =>
      sdk.runAction({
        appKey: GOOGLE_SHEETS_APP_KEY,
        actionType: "write",
        actionKey: "add_row",
        connection: GOOGLE_SHEETS_CONNECTION,
        inputs: {
          drive: "My Drive",
          spreadsheet: SPREADSHEET,
          worksheet: WORKSHEET,
          // Row columns are dynamic — they must match your worksheet's header
          // row exactly. Verify names with list-action-input-fields against
          // your connection (worksheet header changes alter this shape).
          "First Name": firstName,
          "Last Name": lastName,
          Email: email,
          Phone: phone,
          Form: lead.form_name,
          Ad: lead.ad_name,
          Campaign: lead.campaign_name,
        },
      }),
    );

    return { rowAdded: true };
  },
);
