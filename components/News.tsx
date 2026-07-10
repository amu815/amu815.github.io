import type { Lang } from "@/content/dict";
import { news, newsHref, newsText, type NewsKind } from "@/content/news";
import { formatDate } from "@/lib/date";

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

const kindLabelEn: Record<NewsKind, string> = {
  submitted: "Submitted",
  accepted: "Accepted",
  rejected: "Rejected",
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

function itemKey(n: ReturnType<typeof toKeyParts>): string {
  return n;
}

function toKeyParts(n: (typeof news)[number]): string {
  if (n.kind === "milestone") return `milestone-${n.date}-${n.textEn.slice(0, 20)}`;
  if (n.kind === "application") return `application-${n.date}-${n.textEn.slice(0, 20)}`;
  if (n.kind === "kaggle") return `kaggle-${n.entry.id}-${n.date}`;
  if (n.kind === "award") return `award-${n.award.id}-${n.date}`;
  return `${n.paper.id}-${n.kind}-${n.date}`;
}

export function News({ lang }: { lang: Lang }) {
  const visibleNews = news.slice(0, 7);
  const archivedNews = news.slice(7);

  const renderNewsItem = (n: (typeof news)[number], index: number) => {
    const effectiveKind: NewsKind =
      n.kind === "milestone" && n.displayKind ? n.displayKind : n.kind;
    const kindLabel = lang === "ja" ? kindLabelJa[effectiveKind] : kindLabelEn[effectiveKind];
    const text = newsText(n, lang);
    const href = newsHref(n);
    const inner = (
      <div className={`news-row ${n.highlight ? "is-highlight" : ""}`}>
        <time dateTime={n.date}>{formatDate(n.date, lang)}</time>
        <span className={`tier-pill !lowercase ${kindTone[effectiveKind]}`}>
          {kindLabel}
        </span>
        <p>{text}</p>
        {n.highlight && <span className="news-latest">Latest</span>}
      </div>
    );

    return (
      <li
        key={itemKey(toKeyParts(n))}
        className="fade-in-up"
        style={{ animationDelay: `${Math.min(index * 45, 320)}ms` }}
      >
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="block hover:no-underline">
            {inner}
          </a>
        ) : (
          inner
        )}
      </li>
    );
  };

  return (
    <div>
      <ul className="news-list">{visibleNews.map(renderNewsItem)}</ul>
      {archivedNews.length > 0 && (
        <details className="news-archive">
          <summary>
            {lang === "ja" ? "過去のニュースを見る" : "View earlier news"}
            <span>{archivedNews.length}</span>
          </summary>
          <ul className="news-list mt-3">
            {archivedNews.map((item, index) => renderNewsItem(item, index + visibleNews.length))}
          </ul>
        </details>
      )}
    </div>
  );
}
