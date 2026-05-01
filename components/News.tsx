import type { Lang } from "@/content/dict";
import { news } from "@/content/news";
import { formatDate } from "@/lib/date";

export function News({ lang }: { lang: Lang }) {
  return (
    <ul className="flex flex-col gap-3">
      {news.map((n, i) => {
        const text = lang === "ja" ? n.textJa : n.textEn;
        const inner = (
          <div
            className={`surface-card flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-5 ${
              n.highlight ? "border-accent/40 surface-card-glow" : ""
            }`}
          >
            <time
              dateTime={n.date}
              className="font-mono text-xs uppercase tracking-wider text-muted sm:w-28 sm:flex-none"
            >
              {formatDate(n.date, lang)}
            </time>
            <p className="text-sm text-foreground">{text}</p>
            {n.highlight && (
              <span className="ml-auto hidden rounded-full border border-accent/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent sm:inline">
                Latest
              </span>
            )}
          </div>
        );
        return (
          <li key={i} className="fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
            {n.href ? (
              <a href={n.href} target="_blank" rel="noreferrer" className="block hover:no-underline">
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
