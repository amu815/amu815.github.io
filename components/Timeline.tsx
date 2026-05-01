import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { timeline, type TimelineEvent, type TimelineEventKind } from "@/content/timeline";
import { tierLabel, tierLabelJa, type PaperTier } from "@/content/papers";
import { formatDate, parseIsoDate } from "@/lib/date";

const kindTone: Record<TimelineEventKind, { dot: string; ring: string; text: string }> = {
  submitted: {
    dot: "bg-accent",
    ring: "ring-accent/30",
    text: "text-accent",
  },
  accepted: {
    dot: "bg-green",
    ring: "ring-green/30",
    text: "text-green",
  },
  rejected: {
    dot: "bg-red",
    ring: "ring-red/30",
    text: "text-red",
  },
  presented: {
    dot: "bg-purple",
    ring: "ring-purple/30",
    text: "text-purple",
  },
  conference: {
    dot: "bg-cyan",
    ring: "ring-cyan/30",
    text: "text-cyan",
  },
};

const tierBadgeTone: Record<PaperTier, string> = {
  core_a_star: "text-green border-green/40",
  core_a: "text-green border-green/40",
  core_b: "text-accent border-accent/40",
  core_c: "text-cyan border-cyan/40",
  domestic: "text-muted-strong border-border-strong",
  journal: "text-purple border-purple/40",
};

function eventLabel(e: TimelineEvent, lang: Lang): string {
  const v = e.paper.shortName;
  const presented = lang === "ja" ? "発表" : "Presented at";
  const conference = lang === "ja" ? "会議開催" : "Conference begins";
  const submitted = lang === "ja" ? "投稿" : "Submitted to";
  const accepted = lang === "ja" ? "採択" : "Accepted to";
  const rejected = lang === "ja" ? "不採択" : "Rejected from";
  switch (e.kind) {
    case "submitted":
      return lang === "ja" ? `${v} に${submitted}` : `${submitted} ${v}`;
    case "accepted":
      return lang === "ja" ? `${v} に${accepted}` : `${accepted} ${v}`;
    case "rejected":
      return lang === "ja" ? `${v} を${rejected}` : `${rejected} ${v}`;
    case "presented":
      return lang === "ja" ? `${v} で${presented}` : `${presented} ${v}`;
    case "conference":
      return lang === "ja" ? `${v} ${conference}` : `${v} — ${conference}`;
  }
}

function kindLabel(kind: TimelineEventKind, lang: Lang): string {
  return dict[lang].timeline.legend[kind];
}

export function Timeline({ lang }: { lang: Lang }) {
  const t = dict[lang].timeline;
  const today = new Date().toISOString().slice(0, 10);

  const upcoming = timeline.filter((e) => e.date > today).sort((a, b) => a.date.localeCompare(b.date));
  const past = timeline.filter((e) => e.date <= today);

  type Group = { year: number; events: TimelineEvent[] };
  const pastGroups: Group[] = [];
  for (const e of past) {
    const { year } = parseIsoDate(e.date);
    const last = pastGroups[pastGroups.length - 1];
    if (last && last.year === year) last.events.push(e);
    else pastGroups.push({ year, events: [e] });
  }

  const legendKinds: TimelineEventKind[] = [
    "submitted",
    "accepted",
    "rejected",
    "presented",
    "conference",
  ];

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-strong">{t.intro}</p>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
        {legendKinds.map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${kindTone[k].dot}`} />
            <span>{kindLabel(k, lang)}</span>
          </span>
        ))}
      </div>

      {upcoming.length > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
            {t.upcoming}
          </h3>
          <TimelineList events={upcoming} lang={lang} muted />
        </div>
      )}

      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          {t.past}
        </h3>
        <div className="flex flex-col gap-6">
          {pastGroups.map((g) => (
            <div key={g.year}>
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-2xl font-bold text-foreground">{g.year}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <TimelineList events={g.events} lang={lang} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineList({
  events,
  lang,
  muted,
}: {
  events: TimelineEvent[];
  lang: Lang;
  muted?: boolean;
}) {
  return (
    <ol className="relative ml-2 border-l border-border-strong pl-6">
      {events.map((e, i) => {
        const tone = kindTone[e.kind];
        const tier = lang === "ja" ? tierLabelJa[e.paper.tier] : tierLabel[e.paper.tier];
        return (
          <li
            key={`${e.paper.id}-${e.kind}-${e.date}`}
            className={`relative pb-6 ${muted ? "opacity-80" : ""}`}
          >
            <span
              className={`absolute -left-[33px] top-1.5 inline-flex h-3 w-3 items-center justify-center rounded-full ring-4 ${tone.dot} ${tone.ring}`}
              aria-hidden
            />
            <div
              className="fade-in-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <time
                  dateTime={e.date}
                  className="font-mono text-xs uppercase tracking-wider text-muted"
                >
                  {formatDate(e.date, lang, { withYear: false })}
                </time>
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${tone.text}`}>
                  {kindLabel(e.kind, lang)}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                <a
                  href={e.paper.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent"
                >
                  {eventLabel(e, lang)}
                </a>
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className={`tier-pill ${tierBadgeTone[e.paper.tier]}`}>{tier}</span>
                {e.paper.location && <span>{e.paper.location}</span>}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
