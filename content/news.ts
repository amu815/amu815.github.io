import { papers, type PaperVenue } from "./papers";
import { kaggleEntries, percentile, type KaggleEntry } from "./kaggle";

export type PaperEventKind = "submitted" | "accepted" | "rejected" | "presented";
export type NewsKind = PaperEventKind | "milestone" | "kaggle";

export type PaperNewsItem = {
  date: string;
  kind: PaperEventKind;
  paper: PaperVenue;
  highlight?: boolean;
};

export type MilestoneNewsItem = {
  date: string;
  kind: "milestone";
  textEn: string;
  textJa: string;
  href?: string;
  highlight?: boolean;
};

export type KaggleNewsItem = {
  date: string;
  kind: "kaggle";
  entry: KaggleEntry;
  highlight?: boolean;
};

export type NewsItem = PaperNewsItem | MilestoneNewsItem | KaggleNewsItem;

const KIND_PRIORITY: Record<NewsKind, number> = {
  presented: 4,
  milestone: 3,
  kaggle: 3,
  accepted: 2,
  rejected: 2,
  submitted: 1,
};

const milestones: MilestoneNewsItem[] = [
  {
    date: "2026-02-09",
    kind: "milestone",
    textEn:
      "Selected as a 2026 candidate of the Kyushu University WISE Program for Sustainability in the Dynamic Earth (K2-SPRING), Health-Tech Unit.",
    textJa:
      "九州大学未来を拓く博士人財育成プログラム (K2-SPRING) ヘルステックユニット 2026 年度コース候補生に採用されました。",
    href: "https://k2-spring.kyushu-u.ac.jp/",
  },
];

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

  for (const m of milestones) {
    if (m.date <= today) items.push(m);
  }

  for (const k of kaggleEntries) {
    if (k.status === "completed" && k.endDate && k.endDate <= today) {
      items.push({ date: k.endDate, kind: "kaggle", entry: k });
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

function paperNewsText(item: PaperNewsItem, lang: "en" | "ja"): string {
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

export function newsText(item: NewsItem, lang: "en" | "ja"): string {
  if (item.kind === "milestone") {
    return lang === "ja" ? item.textJa : item.textEn;
  }
  if (item.kind === "kaggle") {
    const e = item.entry;
    const series = e.series ?? e.title;
    if (e.rank != null && e.teams != null) {
      const pct = percentile(e.rank, e.teams).toFixed(1);
      const teamsStr = e.teams.toLocaleString();
      if (lang === "ja") {
        return `Kaggle ${series} で ${e.rank} / ${teamsStr} 位（上位 ${pct}%）で終了。`;
      }
      return `Finished Kaggle ${series} at ${e.rank} / ${teamsStr} (top ${pct}%).`;
    }
    return lang === "ja" ? `Kaggle ${series} に参加。` : `Entered Kaggle ${series}.`;
  }
  return paperNewsText(item, lang);
}

export function newsHref(item: NewsItem): string | undefined {
  if (item.kind === "milestone") return item.href;
  if (item.kind === "kaggle") return item.entry.href;
  return item.paper.href;
}
