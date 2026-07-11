"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/content/dict";
import type { NewsKind } from "@/content/news";
import { formatDate } from "@/lib/date";
import { FadeScroll } from "./FadeScroll";

export type NewsDisplayItem = {
  id: string;
  date: string;
  kind: NewsKind;
  kindLabel: string;
  text: string;
  href?: string;
  highlight: boolean;
};

type NewsFilter = "all" | "other" | NewsKind;

const kindTone: Record<NewsKind, string> = {
  submitted: "text-accent border-accent/40 bg-accent/10",
  accepted: "text-cyan border-cyan/40 bg-cyan/10",
  rejected: "text-red border-red/40 bg-red/10",
  presented: "text-purple border-purple/40 bg-purple/10",
  milestone: "text-cyan border-cyan/40 bg-cyan/10",
  kaggle: "text-green border-green/40 bg-green/10",
  application: "text-accent border-accent/40 bg-accent/10",
  passed: "text-green border-green/40 bg-green/10",
  award: "border-gold/50 bg-gold/10 text-gold",
};

const filterOrder: NewsKind[] = [
  "accepted",
  "presented",
  "award",
  "submitted",
  "kaggle",
  "rejected",
];

const otherKinds: NewsKind[] = ["milestone", "passed", "application"];

const filterLabels: Record<Lang, Record<NewsKind, string>> = {
  en: {
    submitted: "Submitted",
    accepted: "Accepted",
    rejected: "Not accepted",
    presented: "Presented",
    milestone: "Milestones",
    kaggle: "Kaggle",
    application: "Applications",
    passed: "Passed",
    award: "Awards",
  },
  ja: {
    submitted: "投稿",
    accepted: "採択",
    rejected: "不採択",
    presented: "発表",
    milestone: "受賞・採用",
    kaggle: "Kaggle",
    application: "申請",
    passed: "通過",
    award: "表彰",
  },
};

const copy = {
  en: {
    eyebrow: "Activity log",
    title: "Research & development updates",
    description: "Publications, presentations, selections, awards, and ongoing work.",
    updates: "Updates",
    latest: "Last update",
    all: "All",
    other: "Other",
    filterLabel: "Filter news by type",
    result: (visible: number, total: number) => `${visible} / ${total} shown`,
    listLabel: "News archive",
    scrollHint: "More updates",
    latestBadge: "Latest",
    newTab: "Opens in a new tab",
    yearCount: (count: number) => `${count} ${count === 1 ? "update" : "updates"}`,
    empty: "No updates match this filter.",
  },
  ja: {
    eyebrow: "Activity log",
    title: "研究・開発の更新履歴",
    description: "論文、発表、採択、受賞、進行中の活動を時系列で掲載しています。",
    updates: "全更新",
    latest: "最終更新",
    all: "すべて",
    other: "その他",
    filterLabel: "ニュースを種類で絞り込む",
    result: (visible: number, total: number) => `${visible} / ${total}件を表示`,
    listLabel: "ニュースの履歴",
    scrollHint: "続きを見る",
    latestBadge: "最新",
    newTab: "新しいタブで開きます",
    yearCount: (count: number) => `${count}件`,
    empty: "この種類のニュースはありません。",
  },
} satisfies Record<Lang, object>;

export function NewsExplorer({ items, lang }: { items: NewsDisplayItem[]; lang: Lang }) {
  const [activeFilter, setActiveFilter] = useState<NewsFilter>("all");
  const t = copy[lang];

  const kindCounts = useMemo(() => {
    const counts = new Map<NewsKind, number>();
    for (const item of items) counts.set(item.kind, (counts.get(item.kind) ?? 0) + 1);
    return counts;
  }, [items]);

  const filters = useMemo(() => {
    const otherCount = otherKinds.reduce(
      (count, kind) => count + (kindCounts.get(kind) ?? 0),
      0,
    );
    return [
      { id: "all" as const, label: t.all, count: items.length },
      ...filterOrder
        .filter((kind) => kindCounts.has(kind))
        .map((kind) => ({
          id: kind,
          label: filterLabels[lang][kind],
          count: kindCounts.get(kind) ?? 0,
        })),
      ...(otherCount > 0
        ? [{ id: "other" as const, label: t.other, count: otherCount }]
        : []),
    ];
  }, [items.length, kindCounts, lang, t.all, t.other]);

  const visibleItems = useMemo(
    () =>
      activeFilter === "all"
        ? items
        : activeFilter === "other"
          ? items.filter((item) => otherKinds.includes(item.kind))
          : items.filter((item) => item.kind === activeFilter),
    [activeFilter, items],
  );

  const yearGroups = useMemo(() => {
    const groups: { year: string; items: NewsDisplayItem[] }[] = [];
    for (const item of visibleItems) {
      const year = item.date.slice(0, 4);
      const current = groups[groups.length - 1];
      if (current?.year === year) current.items.push(item);
      else groups.push({ year, items: [item] });
    }
    return groups;
  }, [visibleItems]);

  const latestDate = items[0]?.date;

  return (
    <div className="news-panel">
      <div className="news-overview">
        <div className="news-overview__copy">
          <p className="news-overview__eyebrow">
            <span aria-hidden />
            {t.eyebrow}
          </p>
          <h3>{t.title}</h3>
          <p>{t.description}</p>
        </div>
        <dl className="news-overview__stats">
          <div>
            <dt>{t.updates}</dt>
            <dd>{items.length}</dd>
          </div>
          {latestDate && (
            <div>
              <dt>{t.latest}</dt>
              <dd>
                <time dateTime={latestDate}>{formatDate(latestDate, lang)}</time>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="news-toolbar">
        <div className="news-filters" role="group" aria-label={t.filterLabel}>
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeFilter === filter.id}
              className="news-filter"
              onClick={() => setActiveFilter(filter.id)}
            >
              <span>{filter.label}</span>
              <span className="news-filter__count">{filter.count}</span>
            </button>
          ))}
        </div>
        <p className="news-result" role="status" aria-live="polite">
          {t.result(visibleItems.length, items.length)}
        </p>
      </div>

      {visibleItems.length > 0 ? (
        <div className="news-scroll">
          <FadeScroll
            key={activeFilter}
            maxHeight="min(42rem, 64svh)"
            label={t.listLabel}
            scrollHint={t.scrollHint}
            allowPageScroll
          >
            <div className="news-years">
              {yearGroups.map((group) => {
                const headingId = `news-${lang}-${group.year}`;
                return (
                  <section key={group.year} className="news-year-group" aria-labelledby={headingId}>
                    <header className="news-year-heading">
                      <h3 id={headingId}>{group.year}</h3>
                      <span>{t.yearCount(group.items.length)}</span>
                    </header>
                    <ol className="news-list">
                      {group.items.map((item, index) => (
                        <NewsRow
                          key={item.id}
                          item={item}
                          index={index}
                          latestLabel={t.latestBadge}
                          newTabLabel={t.newTab}
                        />
                      ))}
                    </ol>
                  </section>
                );
              })}
            </div>
          </FadeScroll>
        </div>
      ) : (
        <p className="news-empty" role="status">{t.empty}</p>
      )}
    </div>
  );
}

function NewsRow({
  item,
  index,
  latestLabel,
  newTabLabel,
}: {
  item: NewsDisplayItem;
  index: number;
  latestLabel: string;
  newTabLabel: string;
}) {
  const inner = (
    <div className={`news-row ${item.highlight ? "is-highlight" : ""}`}>
      <time dateTime={item.date}>{item.date.slice(5).replace("-", ".")}</time>
      <span className={`tier-pill !lowercase ${kindTone[item.kind]}`}>
        {item.kindLabel}
      </span>
      <p>{item.text}</p>
      <span className="news-row__trail">
        {item.highlight && <span className="news-latest">{latestLabel}</span>}
        {item.href && <ArrowUpRightIcon />}
      </span>
    </div>
  );

  return (
    <li
      className="fade-in-up"
      style={{ animationDelay: `${Math.min(index * 40, 280)}ms` }}
    >
      {item.href ? (
        <a href={item.href} target="_blank" rel="noreferrer" className="block hover:no-underline">
          {inner}
          <span className="sr-only"> — {newTabLabel}</span>
        </a>
      ) : (
        inner
      )}
    </li>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="news-link-icon" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
