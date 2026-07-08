import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const INTERCOM_CONNECTION = "intercom_primary";
const HUBSPOT_CONNECTION = "hubspot_primary";
const STRIPE_CONNECTION = "stripe_primary";
const ZENDESK_CONNECTION = "zendesk_primary";
const DISCORD_CONNECTION = "discord_primary";

const DISCORD_CHANNEL_ID = "1234567890";

const INTERCOM_APP_KEY = "IntercomV2CLIAPI";
const HUBSPOT_APP_KEY = "HubSpotCLIAPI";
const STRIPE_APP_KEY = "StripeCLIAPI";
const ZENDESK_APP_KEY = "ZendeskV2CLIAPI";
const DISCORD_APP_KEY = "DiscordCLIAPI";

const InputSchema = z.object({
  conversationId: z.string(),
});
type Input = z.infer<typeof InputSchema>;

export default defineDurable<Input, { ticketId: string | null }>(
  "support-ticket-with-context",
  async (ctx, rawInput) => {
    const { conversationId } = InputSchema.parse(rawInput);

    const convo = await ctx.step(`fetch-conversation-${conversationId}`, async () => {
      const result = (await sdk.runAction({
        appKey: INTERCOM_APP_KEY,
        actionType: "search",
        actionKey: "retrieve_conversation",
        connection: INTERCOM_CONNECTION,
        inputs: { id: conversationId },
      })) as {
        data: Array<{
          id: string;
          user: { email: string };
          source?: { subject?: string; body?: string };
          url?: string;
        }>;
      };
      return result.data[0];
    });

    const email = convo.user.email;

    const contact = await ctx.step(`fetch-hubspot-${conversationId}`, async () => {
      const result = (await sdk.runAction({
        appKey: HUBSPOT_APP_KEY,
        actionType: "search",
        actionKey: "contactSearch",
        connection: HUBSPOT_CONNECTION,
        inputs: {
          first_search_property_name: "email",
          // The value field for a chosen search property is dynamic — its exact
          // key depends on the property picked. Verify with
          // getActionInputFieldsSchema against your HubSpot connection.
          first_search_property_value: email,
        },
      })) as {
        data: Array<{
          firstname?: string;
          lastname?: string;
          lifecyclestage?: string;
          tier?: string;
        }>;
      };
      return result.data[0] ?? null;
    });

    const customer = await ctx.step(`fetch-stripe-${conversationId}`, async () => {
      const result = (await sdk.runAction({
        appKey: STRIPE_APP_KEY,
        actionType: "search",
        actionKey: "find_customer",
        connection: STRIPE_CONNECTION,
        inputs: { selection: "email", query: email },
      })) as { data: Array<{ created: number; balance: number }> };
      return result.data[0] ?? null;
    });

    const ticket = await ctx.step(`create-zendesk-ticket-${conversationId}`, async () => {
      const result = (await sdk.runAction({
        appKey: ZENDESK_APP_KEY,
        actionType: "write",
        actionKey: "ticket",
        connection: ZENDESK_CONNECTION,
        inputs: {
          subject: convo.source?.subject ?? `Intercom escalation from ${email}`,
          email,
          name: contact?.firstname
            ? `${contact.firstname} ${contact.lastname ?? ""}`.trim()
            : email,
          first_comment: convo.source?.body ?? "(no body)",
          priority: contact?.lifecyclestage === "customer" ? "high" : "normal",
          tags: ["from-intercom", `tier-${contact?.tier ?? "unknown"}`].join(","),
        },
      })) as { data: Array<{ id: string }> };
      return result.data[0];
    });

    await ctx.step(`notify-discord-${conversationId}`, async () => {
      const lines = [
        `:rotating_light: Zendesk ticket #${ticket.id} for ${email}`,
        `HubSpot stage: ${contact?.lifecyclestage ?? "unknown"}`,
        customer
          ? `Stripe customer since: ${new Date(customer.created * 1000).toDateString()} (balance: $${(customer.balance / 100).toFixed(2)})`
          : "No Stripe customer record",
        `Intercom: ${convo.url ?? `(id ${convo.id})`}`,
      ];
      return sdk.runAction({
        appKey: DISCORD_APP_KEY,
        actionType: "write",
        actionKey: "send_channel_message",
        connection: DISCORD_CONNECTION,
        inputs: {
          channel_id: DISCORD_CHANNEL_ID,
          content: lines.join("\n"),
        },
      });
    });

    return { ticketId: ticket.id };
  },
);
