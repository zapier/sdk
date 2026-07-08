import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

// Edit these two constants before deploying — see README.md for how to discover them.
const FUB_CONNECTION = "fub_primary";
const FUB_INITIAL_STAGE = "Lead";

const FUB_APP_KEY = "FollowUpBossCLIAPI";

// Meta lead field labels — set by the form owner. Edit if your form uses different names.
const FIELD_EMAIL = "email";
const FIELD_PHONE = "phone_number";
const FIELD_FIRST_NAME = "first_name";
const FIELD_LAST_NAME = "last_name";

const InputSchema = z.object({
  leadgen_id: z.string(),
  form_name: z.string().optional(),
  ad_name: z.string().optional(),
  field_data: z.array(
    z.object({ name: z.string(), values: z.array(z.string()) }),
  ),
});
type Input = z.infer<typeof InputSchema>;

function pickField(fd: Input["field_data"], key: string): string | undefined {
  return fd.find((f) => f.name.toLowerCase() === key.toLowerCase())?.values[0];
}

export default defineDurable<Input, { contactCreated: boolean }>(
  "facebook-lead-ads-to-follow-up-boss",
  async (ctx, rawInput) => {
    const lead = InputSchema.parse(rawInput);

    const email = pickField(lead.field_data, FIELD_EMAIL);
    const phone = pickField(lead.field_data, FIELD_PHONE);
    const firstName = pickField(lead.field_data, FIELD_FIRST_NAME) ?? "Lead";
    const lastName = pickField(lead.field_data, FIELD_LAST_NAME) ?? "";

    await ctx.step(`upsert-fub-contact-${lead.leadgen_id}`, async () =>
      sdk.runAction({
        appKey: FUB_APP_KEY,
        actionType: "write",
        // FollowUpBoss's plain create_contact is hidden. Use the non-hidden
        // variant, which is identical apart from not firing action-plan automations.
        actionKey: "create_contact_without_triggering_action_plans",
        connection: FUB_CONNECTION,
        inputs: {
          person_firstName: firstName,
          person_lastName: lastName,
          person_primaryEmail: email,
          person_primaryPhone: phone,
          person_source: `Meta Lead Ads. ${lead.ad_name ?? lead.form_name ?? "unknown campaign"}`,
          person_tags: ["meta-lead"],
          person_stage: FUB_INITIAL_STAGE,
        },
      }),
    );

    return { contactCreated: true };
  },
);
