import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { internships } from "@/content/experience";
import { formatDateRange } from "@/lib/date";

function BikeIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M5.5 17.5l4-9h5l4 9" />
      <path d="M9.5 8.5h3" />
      <path d="M18.5 17.5l-3-9h2.5" />
    </svg>
  );
}

function BuildingIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M10 21v-3h4v3" />
    </svg>
  );
}

export function Experience({ lang }: { lang: Lang }) {
  const t = dict[lang].experience;
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan">
          <BikeIcon className="h-4 w-4" />
          <span>{t.cyclingTitle}</span>
          <span className="h-px flex-1 bg-gradient-to-r from-cyan/40 to-transparent" />
        </h3>
        <div className="surface-card surface-card-glow flex flex-col gap-3 p-5">
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              {t.cyclingPeriod}
            </span>
            <span className="tier-pill border-green/40 bg-green/10 text-green">
              {t.cyclingPromotion}
            </span>
          </div>
          <h4 className="text-base font-semibold text-foreground">
            <a
              href="https://jbcfroad.jp/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan"
            >
              {t.cyclingOrg}
            </a>
          </h4>
          <p className="text-sm text-muted-strong">
            {lang === "ja"
              ? "学部在学中、JBCFに登録された実業団選手として国内のロードレースに継続的に参戦。2023年3月にE2へ昇格。"
              : "Competed as a registered semi-pro rider in JBCF road races during my undergraduate years. Promoted to E2 category in March 2023."}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent">
          <BuildingIcon className="h-4 w-4" />
          <span>{t.internshipsTitle}</span>
          <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {internships.map((it, i) => (
            <a
              key={it.id}
              href={it.href}
              target="_blank"
              rel="noreferrer"
              className="surface-card group flex flex-col gap-2 p-5 hover:no-underline fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                {formatDateRange(it.start, it.end, lang)}
              </span>
              <h4 className="text-base font-semibold text-foreground group-hover:text-accent">
                {lang === "ja" ? it.companyJa : it.companyEn}
              </h4>
              <span className="tier-pill border-border-strong bg-card-elev text-muted-strong">
                {t.durationDay(it.days)}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
