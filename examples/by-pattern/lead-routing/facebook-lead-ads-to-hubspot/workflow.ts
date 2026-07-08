import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Edit these two constants before deploying. See README.md for how to discover them.
const HUBSPOT_CONNECTION = "hubspot_primary";
const LEAD_SOURCE_LABEL = "Meta Lead Ads";

const HUBSPOT_APP_KEY = "HubSpotCLIAPI";

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

export default defineDurable<Input, { leadCreated: boolean }>(
  "facebook-lead-ads-to-hubspot",
  async (ctx, rawInput) => {
    const lead = InputSchema.parse(rawInput);

    const email = pickField(lead.field_data, FIELD_EMAIL);
    const phone = pickField(lead.field_data, FIELD_PHONE);
    const firstName = pickField(lead.field_data, FIELD_FIRST_NAME) ?? "Lead";
    const lastName = pickField(lead.field_data, FIELD_LAST_NAME) ?? "(from Meta)";

    await ctx.step(`upsert-hubspot-contact-${lead.leadgen_id}`, async () =>
      sdk.runAction({
        appKey: HUBSPOT_APP_KEY,
        actionType: "write",
        actionKey: "upsert_contact",
        connection: HUBSPOT_CONNECTION,
        inputs: {
          // email is the stable primary key for upsert. Every other property
          // is dynamic per HubSpot account schema. Verify names with
          // getActionInputFieldsSchema against your connection.
          email,
          firstname: firstName,
          lastname: lastName,
          phone,
          lifecyclestage: "lead",
          hs_lead_source: LEAD_SOURCE_LABEL,
          hs_analytics_source_data_1: `Meta form: ${lead.form_name ?? "unknown"} / Ad: ${lead.ad_name ?? "unknown"} / Campaign: ${lead.campaign_name ?? "unknown"}`,
        },
      }),
    );

    return { leadCreated: true };
  },
);
