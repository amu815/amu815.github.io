import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { papers } from "@/content/papers";

function PaperIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
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
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h7M9 17h5" />
    </svg>
  );
}

export function Stats({ lang }: { lang: Lang }) {
  const t = dict[lang].stats;
  const submissions = papers.length;
  const underReview = papers.filter((p) => p.status === "under_review").length;
  const accepted = papers.filter(
    (p) => p.status === "accepted" || p.status === "presented",
  ).length;
  const topTier = papers.filter((p) => p.tier === "core_a_star").length;

  const items = [
    { label: t.submissions, value: submissions, color: "text-accent" },
    { label: t.underReview, value: underReview, color: "text-orange" },
    { label: t.accepted, value: accepted, color: "text-cyan" },
    { label: t.topTier, value: topTier, color: "text-green" },
  ];

  return (
    <section aria-labelledby="paper-stats-heading" className="flex flex-col gap-3">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3
          id="paper-stats-heading"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-strong"
        >
          <PaperIcon className="h-3.5 w-3.5 text-accent" />
          <span>{t.heading}</span>
        </h3>
        <p className="text-xs text-muted">{t.headingHint}</p>
      </header>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((s) => (
          <div
            key={s.label}
            className="surface-card flex flex-col gap-1 px-4 py-3"
          >
            <dt className="text-[11px] font-medium uppercase tracking-wider text-muted">
              {s.label}
            </dt>
            <dd className={`text-2xl font-bold tabular-nums ${s.color}`}>
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
