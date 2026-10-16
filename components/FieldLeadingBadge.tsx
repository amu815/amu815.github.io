import type { Lang } from "@/content/dict";
import type { PaperVenue } from "@/content/papers";
import { fieldLeadingConference } from "@/content/conferences";

export function FieldLeadingBadge({ paper, lang }: { paper: PaperVenue; lang: Lang }) {
  const conference = fieldLeadingConference(paper);
  if (!conference) return null;

  const label = lang === "ja" ? "分野トップカンファレンス" : "Leading Conference in the Field";
  const field = lang === "ja" ? conference.fieldJa : conference.field;
  const detail = lang === "ja"
    ? `${field} — 公式紹介に基づく位置づけ（COREランクとは別基準）`
    : `${field} — based on the official conference description, independently of CORE rank`;

  return (
    <a
      href={conference.source}
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
