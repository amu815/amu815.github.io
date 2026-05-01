import { papers, type PaperVenue, type PaperStatus } from "./papers";

export type TimelineEventKind =
  | "submitted"
  | "rejected"
  | "accepted"
  | "presented"
  | "conference";

export type TimelineEvent = {
  date: string;
  kind: TimelineEventKind;
  paper: PaperVenue;
};

const decisionKindFromStatus = (status: PaperStatus): TimelineEventKind | null => {
  if (status === "rejected") return "rejected";
  if (status === "accepted" || status === "presented") return "accepted";
  return null;
};

export function buildTimeline(today = new Date()): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const todayIso = today.toISOString().slice(0, 10);

  for (const p of papers) {
    if (p.submissionDeadline) {
      events.push({ date: p.submissionDeadline, kind: "submitted", paper: p });
    }
    if (p.notificationDate) {
      const decision = decisionKindFromStatus(p.status);
      if (decision && p.notificationDate <= todayIso) {
        events.push({ date: p.notificationDate, kind: decision, paper: p });
      }
    }
    if (p.conferenceStart && p.status !== "rejected") {
      const kind: TimelineEventKind =
        p.status === "presented" ? "presented" : "conference";
      events.push({ date: p.conferenceStart, kind, paper: p });
    }
  }

  return events.sort((a, b) => b.date.localeCompare(a.date));
}

export const timeline = buildTimeline();
