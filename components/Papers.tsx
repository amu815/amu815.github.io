import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import {
  papers,
  statusLabel,
  statusLabelJa,
  tierLabel,
  tierLabelJa,
  type PaperStatus,
  type PaperTier,
  type PaperVenue,
} from "@/content/papers";
import { formatDate, formatDateRange } from "@/lib/date";

const STATUS_ORDER: PaperStatus[] = [
  "under_review",
  "presented",
  "accepted",
  "rejected",
  "submitted",
];

const tierTone: Record<PaperTier, string> = {
  core_a_star: "text-purple border-purple/40 bg-purple/10",
  core_a: "text-green border-green/40 bg-green/10",
  core_b: "text-accent border-accent/40 bg-accent/10",
  core_c: "text-cyan border-cyan/40 bg-cyan/10",
  domestic: "text-muted-strong border-border-strong bg-card-elev",
  journal: "text-purple border-purple/40 bg-purple/10",
};

const statusTone: Record<PaperStatus, string> = {
  under_review: "text-orange border-orange/40 bg-orange/10",
  accepted: "text-green border-green/40 bg-green/10",
  rejected: "text-red border-red/40 bg-red/10",
  presented: "text-purple border-purple/40 bg-purple/10",
  submitted: "text-muted-strong border-border-strong bg-card-elev",
};

function PaperCard({ p, lang }: { p: PaperVenue; lang: Lang }) {
  const t = dict[lang].publications;
  const tier = lang === "ja" ? tierLabelJa[p.tier] : tierLabel[p.tier];
  const status = lang === "ja" ? statusLabelJa[p.status] : statusLabel[p.status];
  const fullName = lang === "ja" && p.fullNameJa ? p.fullNameJa : p.fullName;

  const dateRows: { label: string; value: string }[] = [];
  if (p.submissionDeadline) {
    dateRows.push({ label: t.submitted, value: formatDate(p.submissionDeadline, lang) });
  }
  if (p.notificationDate) {
    dateRows.push({ label: t.notification, value: formatDate(p.notificationDate, lang) });
  }
  if (p.conferenceStart) {
    dateRows.push({
      label: t.conference,
      value: formatDateRange(p.conferenceStart, p.conferenceEnd, lang),
    });
  }

  return (
    <a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      className="surface-card group flex flex-col gap-3 p-5 hover:no-underline"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-foreground group-hover:text-accent">
            {p.shortName}
          </h3>
          <p className="mt-0.5 text-xs leading-snug text-muted">{fullName}</p>
        </div>
        <span className={`tier-pill ${tierTone[p.tier]}`}>{tier}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className={`tier-pill !lowercase ${statusTone[p.status]}`}>{status}</span>
        {p.location && (
          <span className="tier-pill !lowercase border-border-strong bg-card-elev text-muted-strong">
            {p.location}
          </span>
        )}
      </div>

      {dateRows.length > 0 && (
        <dl className="grid grid-cols-1 gap-y-1 text-xs sm:grid-cols-[auto_1fr]">
          {dateRows.map((r) => (
            <div key={r.label} className="contents">
              <dt className="pr-3 text-muted">{r.label}</dt>
              <dd className="font-medium text-muted-strong">{r.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {p.paperTitle && (
        <p className="border-t border-border/70 pt-3 text-sm leading-snug text-muted-strong">
          <span className="text-muted">{lang === "ja" ? "発表タイトル: " : "Title: "}</span>
          {lang === "ja" && p.paperTitleJa ? p.paperTitleJa : p.paperTitle}
        </p>
      )}
    </a>
  );
}

function StatusGroups({ items, lang }: { items: PaperVenue[]; lang: Lang }) {
  const t = dict[lang].publications;
  const groups = STATUS_ORDER.map((status) => ({
    status,
    label: t.statusGroupHeaders[status],
    items: items.filter((p) => p.status === status),
  })).filter((g) => g.items.length > 0);
  return (
    <div className="flex flex-col gap-6">
      {groups.map((g) => (
        <div key={g.status}>
          <h4 className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
            <span>{g.label}</span>
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs text-muted">{g.items.length}</span>
          </h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {g.items.map((p) => (
              <PaperCard key={p.id} p={p} lang={lang} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Papers({ lang }: { lang: Lang }) {
  const journals = papers.filter((p) => p.type === "journal");
  const conferences = papers.filter((p) => p.type !== "journal");
  const journalHeader = lang === "ja" ? "ジャーナル論文" : "Journal Articles";
  const conferenceHeader =
    lang === "ja" ? "国際・国内会議 / ワークショップ" : "Conferences & Workshops";

  return (
    <div className="flex flex-col gap-10">
      {journals.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-purple">
            <span className="inline-block h-2 w-2 rounded-full bg-purple shadow-[0_0_12px_rgba(187,154,247,0.7)]" />
            <span>{journalHeader}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-purple/40 to-transparent" />
          </h3>
          <StatusGroups items={journals} lang={lang} />
        </div>
      )}
      {conferences.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-accent">
            <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(122,162,247,0.7)]" />
            <span>{conferenceHeader}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
          </h3>
          <StatusGroups items={conferences} lang={lang} />
        </div>
      )}
    </div>
  );
}
