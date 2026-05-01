import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { projects, type ProjectLanguage } from "@/content/projects";

const langTone: Record<ProjectLanguage, string> = {
  TypeScript: "text-accent border-accent/40 bg-accent/10",
  Python: "text-cyan border-cyan/40 bg-cyan/10",
  Shell: "text-green border-green/40 bg-green/10",
  Other: "text-purple border-purple/40 bg-purple/10",
};

function StarIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2.5l2.92 6.18 6.58.78-4.85 4.6 1.27 6.46L12 17.7l-5.92 2.82 1.27-6.46-4.85-4.6 6.58-.78L12 2.5Z" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17l10-10" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function Projects({ lang }: { lang: Lang }) {
  const t = dict[lang].projects;
  const sorted = [...projects].sort((a, b) => {
    if (b.stars !== a.stars) return b.stars - a.stars;
    return b.createdAt.localeCompare(a.createdAt);
  });
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-strong">{t.intro}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {sorted.map((p, i) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="surface-card group flex flex-col gap-3 p-5 hover:no-underline fade-in-up"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="flex items-center gap-2 text-base font-semibold text-foreground group-hover:text-accent">
                  <span className="font-mono">{p.name}</span>
                  <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </h3>
              </div>
              <span className={`tier-pill ${langTone[p.language]}`}>{p.language}</span>
            </div>

            <p className="text-sm leading-snug text-muted-strong">
              {lang === "ja" ? p.descriptionJa : p.descriptionEn}
            </p>

            <div className="mt-auto flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="inline-flex items-center gap-1 rounded-full border border-border-strong bg-card-elev px-2 py-0.5">
                <StarIcon className="h-3 w-3 text-orange" />
                <span className="tabular-nums">{p.stars}</span>
                <span className="sr-only">{t.starsLabel}</span>
              </span>
              {p.isThisSite && (
                <span className="tier-pill border-purple/40 bg-purple/10 text-purple">
                  {t.thisSiteBadge}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
