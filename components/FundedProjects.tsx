import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { fundedProjects, type FundedProject } from "@/content/funded-projects";
import { formatDate } from "@/lib/date";

function FundingIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="M6 4l6 8 6-8" />
      <path d="M12 12v8" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
    </svg>
  );
}

function FundedProjectCard({ project, lang }: { project: FundedProject; lang: Lang }) {
  const t = dict[lang].fundedProjects;
  const title = lang === "ja" ? project.titleJa : project.title;
  const program = lang === "ja" ? project.programJa : project.program;
  const status = lang === "ja" ? project.statusJa : project.status;
  const summary = lang === "ja" ? project.summaryJa : project.summary;

  return (
    <article className="surface-card flex flex-col gap-4 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="tier-pill border-[rgba(255,210,30,0.72)] bg-[rgba(255,210,30,0.14)] text-[#FFD21E]">
              {status}
            </span>
            <time
              dateTime={project.date}
              className="font-mono text-xs uppercase tracking-wider text-muted"
            >
              {formatDate(project.date, lang)}
            </time>
          </div>
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <FundingIcon className="h-4 w-4 flex-none text-[#FFD21E]" />
            <span>{title}</span>
          </h3>
          <p className="mt-1 text-xs leading-snug text-muted">{program}</p>
        </div>
      </div>

      <p className="text-sm leading-snug text-muted-strong">{summary}</p>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {project.funding.map((item) => (
          <div key={item.label} className="rounded-lg border border-border bg-card-elev px-3 py-2">
            <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {lang === "ja" ? item.labelJa : item.label}
            </dt>
            <dd className="mt-1 text-lg font-bold tabular-nums text-[#FFD21E]">
              {lang === "ja" ? item.valueJa : item.value}
            </dd>
          </div>
        ))}
      </dl>

      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-accent hover:text-cyan hover:no-underline"
      >
        {t.linkLabel}
        <span aria-hidden>↗</span>
      </a>
    </article>
  );
}

export function FundedProjects({ lang }: { lang: Lang }) {
  const t = dict[lang].fundedProjects;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">{t.intro}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fundedProjects.map((project) => (
          <FundedProjectCard key={project.id} project={project} lang={lang} />
        ))}
      </div>
    </div>
  );
}
