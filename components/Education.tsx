import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { education, type EducationKind } from "@/content/education";
import { parseIsoDate } from "@/lib/date";

const kindTone: Record<EducationKind, { dot: string; ring: string; text: string }> = {
  master: { dot: "bg-purple", ring: "ring-purple/30", text: "text-purple" },
  bachelor: { dot: "bg-accent", ring: "ring-accent/30", text: "text-accent" },
  highschool: { dot: "bg-cyan", ring: "ring-cyan/30", text: "text-cyan" },
};

function formatYearMonth(iso: string, lang: Lang): string {
  const { year, month } = parseIsoDate(iso);
  if (lang === "ja") return `${year}年${month}月`;
  const m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1];
  return `${m} ${year}`;
}

export function Education({ lang }: { lang: Lang }) {
  const t = dict[lang].education;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-strong">{t.intro}</p>
      <ol className="relative ml-2 border-l border-border-strong pl-6">
        {education.map((e, i) => {
          const tone = kindTone[e.kind];
          const school = lang === "ja" ? e.schoolJa : e.schoolEn;
          const dept = lang === "ja" ? e.departmentJa : e.departmentEn;
          const range = e.graduated
            ? `${formatYearMonth(e.enrolled, lang)} – ${formatYearMonth(e.graduated, lang)}`
            : `${formatYearMonth(e.enrolled, lang)} – ${t.ongoing}`;
          const kindLabel = t.kindLabel[e.kind];
          return (
            <li
              key={e.id}
              className="relative pb-6 fade-in-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span
                className={`absolute -left-[33px] top-1.5 inline-flex h-3 w-3 rounded-full ring-4 ${tone.dot} ${tone.ring}`}
                aria-hidden
              />
              <div className="surface-card flex flex-col gap-1 p-4 sm:p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">
                    {range}
                  </span>
                  <span className={`tier-pill ${tone.text} border-current`}>{kindLabel}</span>
                  {e.ongoing && (
                    <span className="tier-pill border-green/40 bg-green/10 text-green">
                      {t.ongoing}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {e.href ? (
                    <a href={e.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                      {school}
                    </a>
                  ) : (
                    school
                  )}
                </h3>
                {dept && <p className="text-sm text-muted">{dept}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
