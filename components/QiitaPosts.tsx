import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import qiitaData from "@/content/qiita-posts.json";
import { FadeScroll } from "./FadeScroll";

type QiitaPost = {
  id: string;
  title: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  stocks: number;
  tags: string[];
};

type QiitaSnapshot = {
  user: string;
  fetchedAt: string;
  posts: QiitaPost[];
};

const data = qiitaData as QiitaSnapshot;

function formatPostDate(iso: string, lang: Lang): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();
  if (lang === "ja") return `${y}/${String(m).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[m - 1]} ${day}, ${y}`;
}

function formatFetchedAt(iso: string, lang: Lang): string {
  const d = new Date(iso);
  if (lang === "ja") {
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
  }
  return d.toISOString().slice(0, 10);
}

function HeartIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 21s-7.5-4.7-9.6-9.4C.4 7.5 3.6 3.5 7.4 4.5c1.7.4 3.1 1.6 4.6 3.5 1.5-1.9 2.9-3.1 4.6-3.5 3.8-1 7 3 5 7.1C19.5 16.3 12 21 12 21Z" />
    </svg>
  );
}

function StockIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h12v17l-6-3.5L6 21V4Z" />
    </svg>
  );
}

function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17l10-10" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function QiitaPosts({ lang }: { lang: Lang }) {
  const t = dict[lang].qiita;
  const posts = data.posts;
  const totalLikes = posts.reduce((s, p) => s + p.likes, 0);
  const totalStocks = posts.reduce((s, p) => s + p.stocks, 0);

  if (posts.length === 0) {
    return <p className="text-sm text-muted">{t.empty}</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm text-muted-strong">
        <p>
          {t.intro}{" "}
          <a
            href={`https://qiita.com/${data.user}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-accent"
          >
            @{data.user}
          </a>
        </p>
        <span className="font-mono text-xs text-muted">
          {t.lastUpdated}: {formatFetchedAt(data.fetchedAt, lang)}
        </span>
      </div>

      <dl className="grid grid-cols-3 gap-3">
        <div className="surface-card flex flex-col gap-0.5 px-4 py-3">
          <dt className="text-[11px] font-medium uppercase tracking-wider text-muted">
            {t.posts}
          </dt>
          <dd className="text-2xl font-bold tabular-nums text-accent">{posts.length}</dd>
        </div>
        <div className="surface-card flex flex-col gap-0.5 px-4 py-3">
          <dt className="text-[11px] font-medium uppercase tracking-wider text-muted">
            {t.likes}
          </dt>
          <dd className="text-2xl font-bold tabular-nums text-orange">{totalLikes}</dd>
        </div>
        <div className="surface-card flex flex-col gap-0.5 px-4 py-3">
          <dt className="text-[11px] font-medium uppercase tracking-wider text-muted">
            {t.stocks}
          </dt>
          <dd className="text-2xl font-bold tabular-nums text-green">{totalStocks}</dd>
        </div>
      </dl>

      <FadeScroll maxHeight="40rem">
      <ul className="flex flex-col gap-3 pr-1">
        {posts.map((p, i) => (
          <li
            key={p.id}
            className="fade-in-up"
            style={{ animationDelay: `${Math.min(i * 35, 700)}ms` }}
          >
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="surface-card group flex flex-col gap-2 px-4 py-3 hover:no-underline sm:flex-row sm:items-center sm:gap-4"
            >
              <time
                dateTime={p.createdAt}
                className="font-mono text-xs uppercase tracking-wider text-muted sm:w-24 sm:flex-none"
              >
                {formatPostDate(p.createdAt, lang)}
              </time>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-semibold leading-snug text-foreground group-hover:text-accent">
                  {p.title}
                  <ArrowIcon className="ml-1 inline-block h-3 w-3 align-middle text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </h4>
                {p.tags.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {p.tags.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-card-elev px-2 py-0.5 text-[10px] font-medium text-muted-strong"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted sm:flex-none">
                <span className="inline-flex items-center gap-1 text-orange">
                  <HeartIcon className="h-3.5 w-3.5" />
                  <span className="tabular-nums">{p.likes}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-green">
                  <StockIcon className="h-3.5 w-3.5" />
                  <span className="tabular-nums">{p.stocks}</span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
      </FadeScroll>
    </div>
  );
}
