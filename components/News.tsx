import type { Lang } from "@/content/dict";
import { news, newsHref, newsText, type NewsKind } from "@/content/news";
import { NewsExplorer, type NewsDisplayItem } from "./NewsExplorer";

const kindLabelEn: Record<NewsKind, string> = {
  submitted: "Submitted",
  accepted: "Accepted",
  rejected: "Not accepted",
  presented: "Presented",
  milestone: "Milestone",
  kaggle: "Kaggle",
  application: "Applied",
  passed: "Passed",
  award: "Award",
};

const kindLabelJa: Record<NewsKind, string> = {
  submitted: "投稿",
  accepted: "採択",
  rejected: "不採択",
  presented: "発表",
  milestone: "受賞・採用",
  kaggle: "Kaggle",
  application: "申請",
  passed: "通過",
  award: "表彰",
};

function itemKey(n: (typeof news)[number]): string {
  if (n.kind === "milestone") return `milestone-${n.date}-${n.textEn.slice(0, 20)}`;
  if (n.kind === "application") return `application-${n.date}-${n.textEn.slice(0, 20)}`;
  if (n.kind === "kaggle") return `kaggle-${n.entry.id}-${n.date}`;
  if (n.kind === "award") return `award-${n.award.id}-${n.date}`;
  return `${n.paper.id}-${n.kind}-${n.date}`;
}

export function News({ lang }: { lang: Lang }) {
  const items: NewsDisplayItem[] = news.map((item) => {
    const kind: NewsKind =
      item.kind === "milestone" && item.displayKind ? item.displayKind : item.kind;

    return {
      id: itemKey(item),
      date: item.date,
      kind,
      kindLabel: lang === "ja" ? kindLabelJa[kind] : kindLabelEn[kind],
      text: newsText(item, lang),
      href: newsHref(item),
      highlight: Boolean(item.highlight),
    };
  });

  return <NewsExplorer items={items} lang={lang} />;
}
