import { papers, type PaperVenue } from "./papers";

export type NewsKind = "submitted" | "accepted" | "rejected" | "presented";

export type NewsItem = {
  date: string;
  kind: NewsKind;
  paper: PaperVenue;
  highlight?: boolean;
};

const KIND_PRIORITY: Record<NewsKind, number> = {
  presented: 3,
  accepted: 2,
  rejected: 2,
  submitted: 1,
};

function buildNews(today = new Date().toISOString().slice(0, 10)): NewsItem[] {
  const items: NewsItem[] = [];

  for (const p of papers) {
    if (p.submissionDeadline && p.submissionDeadline <= today) {
      items.push({ date: p.submissionDeadline, kind: "submitted", paper: p });
    }
    if (p.notificationDate && p.notificationDate <= today) {
      if (p.status === "rejected") {
        items.push({ date: p.notificationDate, kind: "rejected", paper: p });
      } else if (p.status === "accepted" || p.status === "presented") {
        items.push({ date: p.notificationDate, kind: "accepted", paper: p });
      }
    }
    if (p.conferenceStart && p.conferenceStart <= today && p.status === "presented") {
      items.push({ date: p.conferenceStart, kind: "presented", paper: p });
    }
  }

  items.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return KIND_PRIORITY[b.kind] - KIND_PRIORITY[a.kind];
  });

  if (items[0]) items[0].highlight = true;

  return items;
}

export const news: NewsItem[] = buildNews();

export function newsText(item: NewsItem, lang: "en" | "ja"): string {
  const v = item.paper.shortName;
  const titleJa = item.paper.paperTitleJa ?? item.paper.paperTitle;
  const titleEn = item.paper.paperTitle;

  if (lang === "ja") {
    switch (item.kind) {
      case "submitted":
        return `${v} に論文を投稿しました。`;
      case "accepted":
        return `${v} に採択されました。`;
      case "rejected":
        return `${v} の査読結果が通知されました(不採択)。`;
      case "presented": {
        const loc = item.paper.location ? `(${item.paper.location})` : "";
        const title = titleJa ? `「${titleJa}」` : "";
        return `${v}${loc} にて発表${title}。`;
      }
    }
  }
  switch (item.kind) {
    case "submitted":
      return `Submitted to ${v}.`;
    case "accepted":
      return `${v} — paper accepted.`;
    case "rejected":
      return `${v} — paper not accepted.`;
    case "presented": {
      const loc = item.paper.location ? ` (${item.paper.location})` : "";
      const title = titleEn ? ` — ${titleEn}` : "";
      return `Presented at ${v}${loc}${title}.`;
    }
  }
}
