import type { Lang } from "@/content/dict";

const MONTHS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function parseIsoDate(iso: string): { year: number; month: number; day?: number } {
  const [y, m, d] = iso.split("-").map((s) => Number(s));
  return { year: y, month: m, day: Number.isFinite(d) ? d : undefined };
}

export function formatDate(iso: string, lang: Lang, opts: { withYear?: boolean } = {}): string {
  const { year, month, day } = parseIsoDate(iso);
  if (lang === "ja") {
    const head = opts.withYear === false ? "" : `${year}年`;
    if (day != null) return `${head}${month}月${day}日`;
    return `${head}${month}月`;
  }
  const monthLabel = MONTHS_EN[month - 1] ?? "";
  if (day != null) return opts.withYear === false ? `${monthLabel} ${day}` : `${monthLabel} ${day}, ${year}`;
  return opts.withYear === false ? monthLabel : `${monthLabel} ${year}`;
}

export function formatDateRange(start: string, end: string | undefined, lang: Lang): string {
  if (!end || end === start) return formatDate(start, lang);
  const s = parseIsoDate(start);
  const e = parseIsoDate(end);
  if (s.year === e.year && s.month === e.month) {
    if (lang === "ja") return `${s.year}年${s.month}月${s.day}日〜${e.day}日`;
    return `${MONTHS_EN[s.month - 1]} ${s.day}–${e.day}, ${s.year}`;
  }
  return `${formatDate(start, lang)} – ${formatDate(end, lang)}`;
}
