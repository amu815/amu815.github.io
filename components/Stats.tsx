import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { papers } from "@/content/papers";

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
    { label: t.accepted, value: accepted, color: "text-green" },
    { label: t.topTier, value: topTier, color: "text-green" },
  ];

  return (
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
  );
}
