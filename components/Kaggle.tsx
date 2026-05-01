import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import {
  kaggleEntries,
  kaggleProfile,
  percentile,
  type KaggleCompType,
  type KaggleEntry,
  type KaggleMedal,
} from "@/content/kaggle";

const typeTone: Record<KaggleCompType, string> = {
  Featured: "text-accent border-accent/40 bg-accent/10",
  Research: "text-purple border-purple/40 bg-purple/10",
  Playground: "text-cyan border-cyan/40 bg-cyan/10",
  Community: "text-muted-strong border-border-strong bg-card-elev",
};

const medalTone: Record<KaggleMedal, string> = {
  gold: "text-orange border-orange/60 bg-orange/15",
  silver: "text-muted-strong border-border-strong bg-card-elev",
  bronze: "text-orange border-orange/40 bg-orange/10",
};

function MedalIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M8 2h8l-1.4 4.4A6 6 0 1 1 9.4 6.4L8 2Zm4 6.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
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

function KaggleCard({ entry, lang }: { entry: KaggleEntry; lang: Lang }) {
  const t = dict[lang].kaggle;
  const typeName = t.typeLabel[entry.type];
  const note = lang === "ja" ? entry.noteJa : entry.noteEn;
  const showRank = entry.rank != null && entry.teams != null;
  const pct = showRank ? percentile(entry.rank!, entry.teams!) : null;

  return (
    <a
      href={entry.href}
      target="_blank"
      rel="noreferrer"
      className="surface-card group flex flex-col gap-3 p-5 hover:no-underline"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`tier-pill ${typeTone[entry.type]}`}>{typeName}</span>
        {entry.medal && (
          <span className={`tier-pill inline-flex items-center gap-1 ${medalTone[entry.medal]}`}>
            <MedalIcon className="h-3 w-3" />
            {entry.medal}
          </span>
        )}
        {entry.status === "active" && (
          <span className="tier-pill border-orange/40 bg-orange/10 text-orange">
            {t.statusLabel.active}
          </span>
        )}
      </div>
      <h3 className="text-base font-semibold text-foreground group-hover:text-accent">
        {entry.title}
        <ArrowIcon className="ml-1 inline-block h-3.5 w-3.5 align-middle text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </h3>
      {entry.series && <p className="text-xs text-muted">{entry.series}</p>}

      {showRank && (
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-border/70 pt-3">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">
            {t.rankLabel}
          </span>
          <span className="text-2xl font-bold tabular-nums text-foreground">
            {entry.rank}
          </span>
          <span className="text-sm text-muted">
            / {entry.teams!.toLocaleString()} {t.teamsLabel}
          </span>
          {pct != null && (
            <span className="ml-auto tier-pill border-cyan/40 bg-cyan/10 text-cyan">
              {t.topPercent(pct)}
            </span>
          )}
        </div>
      )}

      {note && <p className="text-sm leading-snug text-muted-strong">{note}</p>}
    </a>
  );
}

export function Kaggle({ lang }: { lang: Lang }) {
  const t = dict[lang].kaggle;
  const active = kaggleEntries.filter((e) => e.status === "active");
  const completed = kaggleEntries.filter((e) => e.status === "completed");

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-strong">
        {t.intro}{" "}
        <a
          href={kaggleProfile.href}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-accent"
        >
          @{kaggleProfile.username}
        </a>
      </p>

      {active.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-orange">
            <span>{t.activeHeader}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-orange/40 to-transparent" />
            <span className="font-mono text-xs text-muted">{active.length}</span>
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {active.map((e) => (
              <KaggleCard key={e.id} entry={e} lang={lang} />
            ))}
          </div>
        </div>
      )}

      {completed.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
            <span>{t.completedHeader}</span>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs text-muted">{completed.length}</span>
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {completed.map((e) => (
              <KaggleCard key={e.id} entry={e} lang={lang} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
