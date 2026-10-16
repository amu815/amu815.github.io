import type { Lang } from "@/content/dict";
import type { PaperVenue } from "@/content/papers";
import { conferenceBadgePolicyUrl, fieldLeadingConference } from "@/content/conferences";

export function FieldLeadingBadge({ paper, lang }: { paper: PaperVenue; lang: Lang }) {
  const conference = fieldLeadingConference(paper);
  if (!conference) return null;

  const label = lang === "ja" ? "分野トップカンファレンス" : "Leading Conference in the Field";
  const field = lang === "ja" ? conference.fieldJa : conference.field;
  const detail = lang === "ja"
    ? `${field} — 複数の学術機関の資料に基づくサイト独自の分類（COREとは別基準）。判断基準と出典を開く`
    : `${field} — site classification supported by multiple academic institutions, separate from CORE. View criteria and sources`;

  return (
    <a
      href={`${conferenceBadgePolicyUrl}#${paper.conferenceSeries}`}
      target="_blank"
      rel="noreferrer"
      title={detail}
      aria-label={`${label}: ${detail}`}
      className="tier-pill field-leading-badge gap-1 border-accent/40 bg-accent/10 text-accent hover:text-cyan hover:no-underline"
    >
      {label}
      <span aria-hidden>↗</span>
    </a>
  );
}
