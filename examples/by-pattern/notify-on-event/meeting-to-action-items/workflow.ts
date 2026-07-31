import { defineDurable } from "@zapier/zapier-durable";
import { createZapierSdk } from "@zapier/zapier-sdk";
import { z } from "zod";

const sdk = createZapierSdk();

const GCAL_CONNECTION = "google_calendar_primary";
const FIREFLIES_CONNECTION = "fireflies_primary";
const ASANA_CONNECTION = "asana_primary";
const DISCORD_CONNECTION = "discord_primary";

const GOOGLE_CALENDAR_ID = "primary";
const ASANA_WORKSPACE = "REPLACE_WITH_YOUR_WORKSPACE_ID";
const DISCORD_CHANNEL_ID = "1234567890";

const GCAL_APP_KEY = "GoogleCalendarCLIAPI";
const FIREFLIES_APP_KEY = "FirefliesCLIAPI";
const ASANA_APP_KEY = "AsanaCLIAPI";
const DISCORD_APP_KEY = "DiscordCLIAPI";

const InputSchema = z.object({
  eventId: z.string(),
});
type Input = z.infer<typeof InputSchema>;

type ActionItem = { assignee_email: string; description: string; due: string };

export default defineDurable<Input, { itemsFiled: number }>(
  "meeting-to-action-items",
  async (ctx, rawInput) => {
    const { eventId } = InputSchema.parse(rawInput);

    const event = await ctx.step(`fetch-event-${eventId}`, async () => {
      const result = (await sdk.runAction({
        appKey: GCAL_APP_KEY,
        actionType: "search",
        actionKey: "event_by_id",
        connection: GCAL_CONNECTION,
        inputs: {
          calendarid: GOOGLE_CALENDAR_ID,
          event_id: eventId,
        },
      })) as { data: Array<{ summary: string; start: string }> };
      return result.data[0];
    });

    const transcript = await ctx.step(`fetch-transcript-${eventId}`, async () => {
      const result = (await sdk.runAction({
        appKey: FIREFLIES_APP_KEY,
        actionType: "search",
        actionKey: "search_meeting",
        connection: FIREFLIES_CONNECTION,
        inputs: { title: event.summary, start_time: event.start },
      })) as { data: Array<{ url: string; action_items?: ActionItem[] }> };
      return result.data[0];
    });

    const actionItems: ActionItem[] = transcript.action_items ?? [];

    const tasks: Array<{ url: string }> = [];
    for (const [i, item] of actionItems.entries()) {
      const task = await ctx.step(`create-task-${eventId}-${i}`, async () => {
        const result = (await sdk.runAction({
          appKey: ASANA_APP_KEY,
          actionType: "write",
          actionKey: "create_task_v2",
          connection: ASANA_CONNECTION,
          inputs: {
            workspace: ASANA_WORKSPACE,
            task_name: item.description,
            description: `From meeting: ${event.summary}\nTranscript: ${transcript.url}`,
            assignee: item.assignee_email,
            dueDate: item.due,
          },
        })) as { data: Array<{ url: string }> };
        return result.data[0];
      });
      tasks.push(task);
    }

    await ctx.step(`post-digest-${eventId}`, async () => {
      const lines = actionItems.map((item, i) =>
        `- ${item.description} -> ${item.assignee_email} (due ${item.due}): ${tasks[i]?.url ?? "(task created)"}`,
      );
      return sdk.runAction({
        appKey: DISCORD_APP_KEY,
        actionType: "write",
        actionKey: "send_channel_message",
        connection: DISCORD_CONNECTION,
        inputs: {
          channel_id: DISCORD_CHANNEL_ID,
          content: `**${event.summary}** (${actionItems.length} action item(s)):\n${lines.join("\n")}\n_Transcript:_ ${transcript.url}`,
        },
      });
    });

    return { itemsFiled: actionItems.length };
  },
);
