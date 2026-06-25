import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { awards, type Award } from "@/content/awards";
import { formatDate } from "@/lib/date";

function AwardIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" />
    </svg>
  );
}

function AwardCard({ award, lang }: { award: Award; lang: Lang }) {
  const t = dict[lang].awards;
  const venue = lang === "ja" ? award.venueJa : award.venue;
  const name = lang === "ja" ? award.nameJa : award.name;
  const affiliation = lang === "ja" ? award.affiliationJa : award.affiliation;
  const authorSep = lang === "ja" ? "、" : ", ";

  return (
    <article className="surface-card flex flex-col gap-3 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <AwardIcon className="h-4 w-4 flex-none text-orange" />
            <span>{name}</span>
          </h3>
          <p className="mt-1 text-xs leading-snug text-muted">{venue}</p>
        </div>
        <time
          dateTime={award.date}
          className="font-mono text-xs uppercase tracking-wider text-muted sm:flex-none"
        >
          {formatDate(award.date, lang)}
        </time>
      </div>

      <p className="border-t border-border/70 pt-3 text-sm leading-snug text-muted-strong">
        <span className="text-muted">{t.titleLabel}: </span>
        {award.title}
      </p>

      <p className="text-xs leading-snug text-muted-strong">
        <span className="text-muted">{t.authorsLabel}: </span>
        {award.authors.join(authorSep)}
      </p>

      <p className="text-xs leading-snug text-muted-strong">
        <span className="text-muted">{t.affiliationLabel}: </span>
        {affiliation}
      </p>

      <a
        href={award.href}
        target="_blank"
        rel="noreferrer"
        className="mt-1 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-accent hover:text-cyan hover:no-underline"
      >
        {t.linkLabel}
        <span aria-hidden>↗</span>
      </a>
    </article>
  );
}

export function Awards({ lang }: { lang: Lang }) {
  const t = dict[lang].awards;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">{t.intro}</p>
      <div className="grid grid-cols-1 gap-3">
        {awards.map((award) => (
          <AwardCard key={award.id} award={award} lang={lang} />
        ))}
      </div>
    </div>
  );
}
