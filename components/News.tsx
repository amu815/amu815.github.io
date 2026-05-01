import type { Lang } from "@/content/dict";
import { news, newsText, type NewsKind } from "@/content/news";
import { formatDate } from "@/lib/date";

const kindTone: Record<NewsKind, string> = {
  submitted: "text-accent border-accent/40 bg-accent/10",
  accepted: "text-green border-green/40 bg-green/10",
  rejected: "text-red border-red/40 bg-red/10",
  presented: "text-purple border-purple/40 bg-purple/10",
};

const kindLabelEn: Record<NewsKind, string> = {
  submitted: "Submitted",
  accepted: "Accepted",
  rejected: "Rejected",
  presented: "Presented",
};

const kindLabelJa: Record<NewsKind, string> = {
  submitted: "投稿",
  accepted: "採択",
  rejected: "不採択",
  presented: "発表",
};

export function News({ lang }: { lang: Lang }) {
  return (
    <ul className="flex flex-col gap-3">
      {news.map((n, i) => {
        const kindLabel = lang === "ja" ? kindLabelJa[n.kind] : kindLabelEn[n.kind];
        const text = newsText(n, lang);
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
            key={`${n.paper.id}-${n.kind}-${n.date}`}
            className="fade-in-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {n.paper.href ? (
              <a
                href={n.paper.href}
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
  );
}
