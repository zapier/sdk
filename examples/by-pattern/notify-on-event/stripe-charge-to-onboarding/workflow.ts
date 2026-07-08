import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const STRIPE_CONNECTION = "stripe_primary";
const HUBSPOT_CONNECTION = "hubspot_primary";
const GMAIL_CONNECTION = "gmail_primary";
const NOTION_CONNECTION = "notion_primary";
const DISCORD_CONNECTION = "discord_primary";

const NOTION_ONBOARDING_DB_ID = "REPLACE_WITH_YOUR_DATASOURCE_ID";
const DISCORD_CHANNEL_ID = "1234567890";
const WELCOME_SUBJECT = "Welcome aboard";
const WELCOME_BODY = "Thanks for becoming a customer. Here's what to expect in your first week...";

const STRIPE_APP_KEY = "StripeCLIAPI";
const HUBSPOT_APP_KEY = "HubSpotCLIAPI";
const GMAIL_APP_KEY = "GoogleMailV2CLIAPI";
const NOTION_APP_KEY = "NotionCLIAPI";
const DISCORD_APP_KEY = "DiscordCLIAPI";

const InputSchema = z.object({
  chargeId: z.string(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { onboarded: boolean }>(
  "stripe-charge-to-onboarding",
  async (ctx, rawInput) => {
    const { chargeId } = InputSchema.parse(rawInput);

    const charge = await ctx.step(`find-charge-${chargeId}`, async () => {
      const result = (await sdk.runAction({
        appKey: STRIPE_APP_KEY,
        actionType: "search",
        actionKey: "find_charge",
        connection: STRIPE_CONNECTION,
        inputs: { query: chargeId },
      })) as {
        data: Array<{
          amount: number;
          customer_email: string;
          billing_details?: { name?: string };
        }>;
      };
      return result.data[0];
    });

    const [firstName, ...rest] = (charge.billing_details?.name ?? "").split(" ");
    const lastName = rest.join(" ");

    const contact = await ctx.step(`upsert-hubspot-${chargeId}`, async () => {
      const result = (await sdk.runAction({
        appKey: HUBSPOT_APP_KEY,
        actionType: "write",
        actionKey: "upsert_contact",
        connection: HUBSPOT_CONNECTION,
        inputs: {
          email: charge.customer_email,
          // firstname, lastname, lifecyclestage are dynamic. The HubSpot schema
          // enumerates these per connection. Verify with getActionInputFieldsSchema.
          firstname: firstName,
          lastname: lastName,
          lifecyclestage: "customer",
        },
      })) as { data: Array<{ id: string }> };
      return result.data[0];
    });

    await ctx.step(`send-welcome-${chargeId}`, async () =>
      sdk.runAction({
        appKey: GMAIL_APP_KEY,
        actionType: "write",
        actionKey: "message",
        connection: GMAIL_CONNECTION,
        inputs: {
          to: [charge.customer_email],
          subject: WELCOME_SUBJECT,
          body: WELCOME_BODY,
        },
      }),
    );

    const doc = await ctx.step(`create-notion-doc-${chargeId}`, async () => {
      const result = (await sdk.runAction({
        appKey: NOTION_APP_KEY,
        actionType: "write",
        actionKey: "create_database_item",
        connection: NOTION_CONNECTION,
        inputs: {
          datasource: NOTION_ONBOARDING_DB_ID,
          // properties is dynamic. Shape depends on the target Notion data source.
          // Verify with getActionInputFieldsSchema against your connection.
          properties: {
            Name: { title: [{ text: { content: charge.customer_email } }] },
            Status: { select: { name: "Day 0" } },
            ContactId: { rich_text: [{ text: { content: contact.id } }] },
          },
        },
      })) as { data: Array<{ url: string }> };
      return result.data[0];
    });

    await ctx.step(`notify-team-${chargeId}`, async () =>
      sdk.runAction({
        appKey: DISCORD_APP_KEY,
        actionType: "write",
        actionKey: "send_channel_message",
        connection: DISCORD_CONNECTION,
        inputs: {
          channel_id: DISCORD_CHANNEL_ID,
          content: `:tada: New customer: ${charge.customer_email} ($${(charge.amount / 100).toFixed(2)}). HubSpot: ${contact.id}. Onboarding doc: ${doc.url}`,
        },
      }),
    );

    return { onboarded: true };
  },
);
