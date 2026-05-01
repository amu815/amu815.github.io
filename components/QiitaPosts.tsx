import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import qiitaData from "@/content/qiita-posts.json";
import { pinnedQiita } from "@/content/qiita-pinned";
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

function EyeIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function PinIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M14.5 2 22 9.5l-3 3-1-1-5 5 1 1-2 2-4-4-5 5v-3l5-5-4-4 2-2 1 1 5-5-1-1 3-3Z" />
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

function PickupCard({
  post,
  minViews,
  lang,
  index,
}: {
  post: QiitaPost;
  minViews: number;
  lang: Lang;
  index: number;
}) {
  const t = dict[lang].qiita;
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noreferrer"
      className="surface-card surface-card-glow group relative flex flex-col gap-3 overflow-hidden p-5 hover:no-underline fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(420px 220px at 110% -10%, rgba(122,162,247,0.20), transparent 60%), radial-gradient(380px 220px at -10% 110%, rgba(187,154,247,0.18), transparent 60%)",
        }}
      />
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-accent/60 bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-accent">
          <PinIcon className="h-3 w-3" />
          {t.pickupBadge}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-orange/60 bg-orange/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange">
          <EyeIcon className="h-3 w-3" />
          {t.viewsBadge(minViews)}
        </span>
        <time
          dateTime={post.createdAt}
          className="font-mono text-[11px] uppercase tracking-wider text-muted"
        >
          {formatPostDate(post.createdAt, lang)}
        </time>
      </div>

      <h4 className="text-base font-semibold leading-snug text-foreground group-hover:text-accent sm:text-lg">
        {post.title}
        <ArrowIcon className="ml-1 inline-block h-3.5 w-3.5 align-middle text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </h4>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {post.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-card-elev px-2 py-0.5 text-[10px] font-medium text-muted-strong"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center gap-3 text-xs text-muted">
        <span className="inline-flex items-center gap-1 text-orange">
          <HeartIcon className="h-3.5 w-3.5" />
          <span className="tabular-nums">{post.likes}</span>
        </span>
        <span className="inline-flex items-center gap-1 text-green">
          <StockIcon className="h-3.5 w-3.5" />
          <span className="tabular-nums">{post.stocks}</span>
        </span>
      </div>
    </a>
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

  const byId = new Map(posts.map((p) => [p.id, p]));
  const pickup = pinnedQiita
    .map((pin) => {
      const post = byId.get(pin.id);
      return post ? { post, minViews: pin.minViews } : null;
    })
    .filter((x): x is { post: QiitaPost; minViews: number } => x !== null);

  return (
    <div className="flex flex-col gap-6">
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

      {pickup.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-accent">
            <PinIcon className="h-3.5 w-3.5" />
            <span>{t.pickupHeader}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-accent/40 via-purple/30 to-transparent" />
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {pickup.map(({ post, minViews }, i) => (
              <PickupCard
                key={post.id}
                post={post}
                minViews={minViews}
                lang={lang}
                index={i}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
          <span>{t.allHeader}</span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs">{posts.length}</span>
        </h3>
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
    </div>
  );
}
