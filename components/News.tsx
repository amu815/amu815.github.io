import type { Lang } from "@/content/dict";
import { news, newsHref, newsText, type NewsKind } from "@/content/news";
import { formatDate } from "@/lib/date";
import { FadeScroll } from "./FadeScroll";

const kindTone: Record<NewsKind, string> = {
  submitted: "text-accent border-accent/40 bg-accent/10",
  accepted: "text-cyan border-cyan/40 bg-cyan/10",
  rejected: "text-red border-red/40 bg-red/10",
  presented: "text-purple border-purple/40 bg-purple/10",
  milestone: "text-cyan border-cyan/40 bg-cyan/10",
  kaggle: "text-green border-green/40 bg-green/10",
};

const kindLabelEn: Record<NewsKind, string> = {
  submitted: "Submitted",
  accepted: "Accepted",
  rejected: "Rejected",
  presented: "Presented",
  milestone: "Milestone",
  kaggle: "Kaggle",
};

const kindLabelJa: Record<NewsKind, string> = {
  submitted: "投稿",
  accepted: "採択",
  rejected: "不採択",
  presented: "発表",
  milestone: "受賞・採用",
  kaggle: "Kaggle",
};

function itemKey(n: ReturnType<typeof toKeyParts>): string {
  return n;
}

function toKeyParts(n: (typeof news)[number]): string {
  if (n.kind === "milestone") return `milestone-${n.date}-${n.textEn.slice(0, 20)}`;
  if (n.kind === "kaggle") return `kaggle-${n.entry.id}-${n.date}`;
  return `${n.paper.id}-${n.kind}-${n.date}`;
}

export function News({ lang }: { lang: Lang }) {
  return (
    <FadeScroll maxHeight="20rem">
      <ul className="flex flex-col gap-3 pr-1">
        {news.map((n, i) => {
          const kindLabel = lang === "ja" ? kindLabelJa[n.kind] : kindLabelEn[n.kind];
          const text = newsText(n, lang);
          const href = newsHref(n);
          const inner = (
            <div
              className={`surface-card flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-5 ${
                n.highlight ? "border-accent/40 surface-card-glow" : ""
              }`}
            >
              <time
                dateTime={n.date}
                className="font-mono text-xs uppercase tracking-wider text-muted sm:w-28 sm:flex-none"
              >
                {formatDate(n.date, lang)}
              </time>
              <span
                className={`tier-pill !lowercase sm:flex-none ${kindTone[n.kind]}`}
              >
                {kindLabel}
              </span>
              <p className="text-sm text-foreground">{text}</p>
              {n.highlight && (
                <span className="ml-auto hidden rounded-full border border-accent/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent sm:inline">
                  Latest
                </span>
              )}
            </div>
          );
          return (
            <li
              key={itemKey(toKeyParts(n))}
              className="fade-in-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:no-underline"
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </FadeScroll>
  );
}
