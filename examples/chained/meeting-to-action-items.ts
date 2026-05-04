/**
 * Meeting ends → fetch transcript → extract action items → create Asana tasks → digest to Slack.
 *
 * JTBD: Every meeting produces a clean list of action items in the right tool
 * automatically. No one has to be the note-taker, no one has to remember to
 * file the tasks afterward.
 *
 * Pattern: transform pipeline. The data shape changes at every step —
 * meeting → transcript → structured action items → tasks → human-readable digest.
 *
 * Apps: Google Calendar (search), Fireflies (search), Asana (write), Slack (write)
 * Run: npx tsx examples/chained/meeting-to-action-items.ts <calendar_event_id>
 */

import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

type ActionItem = { assignee_email: string; description: string; due: string };

async function processMeeting(eventId: string) {
  // 1. Pull the calendar event so we know the meeting title and time window.
  const gcalConn = (await zapier.findFirstConnection({ app: "google-calendar", owner: "me" })).data;
  const { data: [event] } = (await zapier.runAction({
    app: "google-calendar",
    actionType: "search",
    action: "event_by_id",
    connection: gcalConn.id,
    inputs: {
      calendarid: process.env.GOOGLE_CALENDAR_ID, // dynamic — pick the calendar
      event_id: eventId,
    },
  })) as { data: any[] };

  // 2. Find the matching Fireflies meeting by title.
  const ffConn = (await zapier.findFirstConnection({ app: "fireflies", owner: "me" })).data;
  const { data: [transcript] } = (await zapier.runAction({
    app: "fireflies",
    actionType: "search",
    action: "search_meeting",
    connection: ffConn.id,
    inputs: {
      title: event.summary,
      date: event.start,
    },
  })) as { data: any[] };

  // 3. Extract structured action items. In production this is an LLM call
  //    against transcript.text; for the example, assume Fireflies returned
  //    `transcript.action_items` already shaped.
  const actionItems: ActionItem[] = transcript.action_items ?? [];

  // 4. Create one Asana task per action item.
  const asanaConn = (await zapier.findFirstConnection({ app: "asana", owner: "me" })).data;
  const tasks = await Promise.all(
    actionItems.map((item) =>
      zapier.runAction({
        app: "asana",
        actionType: "write",
        action: "create_task_v2",
        connection: asanaConn.id,
        inputs: {
          workspace: process.env.ASANA_WORKSPACE, // dynamic enum — pick the workspace
          task_name: item.description,
          description: `From meeting: ${event.summary}\nTranscript: ${transcript.url}`,
          assignee: item.assignee_email,
          dueDate: item.due,
        },
      })
    )
  );

  // 5. Post a Slack digest with the meeting context + linked tasks.
  const slackConn = (await zapier.findFirstConnection({ app: "slack", owner: "me" })).data;
  const lines = tasks.map((t, i) => {
    const created = (t as { data: any[] }).data[0];
    return `• ${actionItems[i].description} → ${actionItems[i].assignee_email} (due ${actionItems[i].due}) — ${created?.url ?? "(task created)"}`;
  });
  await zapier.runAction({
    app: "slack",
    actionType: "write",
    action: "channel_message",
    connection: slackConn.id,
    inputs: {
      channel: "#meeting-digest",
      text: `*${event.summary}* — ${actionItems.length} action item(s):\n${lines.join("\n")}\n_Transcript:_ ${transcript.url}`,
    },
  });
}

processMeeting(process.argv[2] ?? "evt_test_123").catch(console.error);
