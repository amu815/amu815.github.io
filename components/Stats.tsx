import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { papers } from "@/content/papers";
import { awards } from "@/content/awards";

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
  const visible = papers.filter((p) => !p.hideFromPublications);
  const submissions = visible.length;
  const underReview = visible.filter((p) => p.status === "under_review").length;
  const accepted = visible.filter(
    (p) => p.status === "accepted" || p.status === "presented",
  ).length;
  const topTier = visible.filter((p) => p.tier === "core_a_star").length;
  const awardCount = awards.length;

  const items = [
    { label: t.submissions, value: submissions, color: "text-accent" },
    { label: t.underReview, value: underReview, color: "text-orange" },
    { label: t.accepted, value: accepted, color: "text-cyan" },
    { label: t.topTier, value: topTier, color: "text-green" },
    { label: t.awards, value: awardCount, color: "text-gold" },
  ];

  return (
    <section aria-labelledby="paper-stats-heading">
      <header className="stats-heading">
        <h2
          id="paper-stats-heading"
        >
          <PaperIcon className="h-3.5 w-3.5 text-accent" />
          <span>{t.heading}</span>
        </h2>
        <p>{t.headingHint}</p>
      </header>
      <dl className="stats-grid">
        {items.map((s) => (
          <div key={s.label} className="stat-cell">
            <dt>{s.label}</dt>
            <dd className={`tabular-nums ${s.color}`}>{s.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
