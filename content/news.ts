import { papers, type PaperVenue } from "./papers";
import { kaggleEntries, percentile, type KaggleEntry } from "./kaggle";
import { awards, type Award } from "./awards";

export type PaperEventKind = "submitted" | "accepted" | "rejected" | "presented";
export type NewsKind =
  | PaperEventKind
  | "milestone"
  | "kaggle"
  | "application"
  | "passed"
  | "award";

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
  displayKind?: NewsKind;
};

export type ApplicationNewsItem = {
  date: string;
  kind: "application";
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

export type AwardNewsItem = {
  date: string;
  kind: "award";
  award: Award;
  highlight?: boolean;
};

export type NewsItem =
  | PaperNewsItem
  | MilestoneNewsItem
  | KaggleNewsItem
  | ApplicationNewsItem
  | AwardNewsItem;

const KIND_PRIORITY: Record<NewsKind, number> = {
  award: 5,
  presented: 4,
  milestone: 3,
  kaggle: 3,
  accepted: 2,
  rejected: 2,
  passed: 2,
  application: 1,
  submitted: 1,
};

const applications: ApplicationNewsItem[] = [
  {
    date: "2026-06-05",
    kind: "application",
    textEn:
      "Submitted application to the Fukuoka Mitou 2026 Pro course.",
    textJa:
      "福岡未踏 2026 Pro コースに申請しました。",
    href: "https://mitou-fukuoka.org/",
  },
  {
    date: "2026-05-11",
    kind: "application",
    textEn:
      "Submitted application to the MEXT AI for Science Pioneering and Exploratory Research Creation Project (SPReAD).",
    textJa:
      "文部科学省「AI for Science 萌芽的挑戦研究創出事業（SPReAD）」に申請しました。",
    href: "https://www.mext.go.jp/aifors_spread/",
  },
  {
    date: "2026-05-07",
    kind: "application",
    textEn:
      "Submitted application for the JSPS Research Fellowship for Young Scientists (DC1).",
    textJa:
      "日本学術振興会特別研究員 DC1 に申請しました。",
    href: "https://www.jsps.go.jp/j-pd/pd_sin.html",
  },
];

const milestones: MilestoneNewsItem[] = [
  {
    date: "2026-06-22",
    kind: "milestone",
    displayKind: "accepted",
    textEn:
      "Selected for the Fukuoka Mitou 2026 Pro course with “LabAgent — Companion Local Agent Framework” (up to ¥1.25M in development support).",
    textJa:
      "福岡未踏2026 Pro コースに「LabAgent — 伴走ローカルエージェントフレームワーク」で採択されました（開発支援金 最大125万円）。",
    href: "https://mitou-fukuoka.org/",
  },
  {
    date: "2026-06-10",
    kind: "milestone",
    displayKind: "passed",
    textEn:
      "Passed the first-stage screening of the Fukuoka Mitou 2026 Pro course.",
    textJa:
      "福岡未踏 2026 Pro コースの一次審査を通過しました。",
    href: "https://mitou-fukuoka.org/",
  },
  {
    date: "2026-05-10",
    kind: "milestone",
    displayKind: "accepted",
    textEn:
      "Submitted the camera-ready version of the DICOMO 2026 paper “GRoFA: Learning Fair and Robust Face Image Embeddings via Noise-Gated Adapters”.",
    textJa:
      "DICOMO 2026 採択論文「GRoFA: ノイズゲート付きアダプタによる公平でロバストな顔画像埋め込みの学習」のカメラレディ版を提出しました。",
    href: "https://dicomo.org/2026/",
  },
  {
    date: "2026-05-06",
    kind: "milestone",
    textEn:
      "Selected for the Xiaomi MiMo Orbit: 100T Token Grant for Builders — awarded 700,000,000 credits on the MiMo API Platform (≈ ¥85,000).",
    textJa:
      "Xiaomi MiMo Orbit「100T Token Grant for Builders」に採択されました。MiMo API Platform で 700,000,000 クレジット (約 8.5 万円相当) が付与されました。",
    href: "https://platform.xiaomimimo.com",
  },
  {
    date: "2026-02-09",
    kind: "milestone",
    textEn:
      "Selected as a 2026 candidate of the Kyushu University WISE Program for Sustainability in the Dynamic Earth (K2-SPRING), Health-Tech Unit.",
    textJa:
      "九州大学未来を拓く博士人財育成プログラム (K2-SPRING) ヘルステックユニット 2026 年度コース候補生に採用されました。",
    href: "https://k-spring.kyushu-u.ac.jp/",
  },
];

function todayInTokyo(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

function buildNews(today = todayInTokyo()): NewsItem[] {
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
    const presentationDate = p.status === "presented" ? p.statusDate ?? p.conferenceStart : undefined;
    if (presentationDate && presentationDate <= today) {
      items.push({ date: presentationDate, kind: "presented", paper: p });
    }
  }

  for (const m of milestones) {
    if (m.date <= today) items.push(m);
  }

  for (const a of applications) {
    if (a.date <= today) items.push(a);
  }

  for (const a of awards) {
    if (a.date <= today) items.push({ date: a.date, kind: "award", award: a });
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
  if (item.kind === "milestone" || item.kind === "application") {
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
  if (item.kind === "award") {
    const a = item.award;
    if (lang === "ja") {
      return `${a.venueJa} の ${a.nameJa}。発表題目「${a.title}」。`;
    }
    return `${a.name} at ${a.venue} for “${a.title}”.`;
  }
  return paperNewsText(item, lang);
}

export function newsHref(item: NewsItem): string | undefined {
  if (item.kind === "milestone" || item.kind === "application") return item.href;
  if (item.kind === "kaggle") return item.entry.href;
  if (item.kind === "award") return item.award.href;
  return item.paper.href;
}
