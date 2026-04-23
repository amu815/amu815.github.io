/* eslint-disable @next/next/no-img-element */
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

type Badge = { label: string; labelJa?: string; color: string };
type Pub = { href: string; title: string; badges: Badge[] };

function badgeUrl(text: string, color: string) {
  return `https://img.shields.io/badge/${encodeURIComponent(
    text.replace(/ /g, "_"),
  )}-${color}?style=flat-square`;
}

function PubList({ items, lang }: { items: Pub[]; lang: Lang }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((p) => (
        <li key={p.title} className="flex flex-wrap items-center gap-2 text-sm">
          <a href={p.href} target="_blank" rel="noreferrer" className="font-medium">
            {p.title}
          </a>
          {p.badges.map((b) => {
            const text = lang === "ja" && b.labelJa ? b.labelJa : b.label;
            return (
              <img
                key={b.label}
                src={badgeUrl(text, b.color)}
                alt={text}
                height={18}
              />
            );
          })}
        </li>
      ))}
    </ul>
  );
}

export function Publications({ lang }: { lang: Lang }) {
  const t = dict[lang].publications;
  const cols = [
    { header: t.headers[0], items: t.submittedConferences },
    { header: t.headers[1], items: t.acceptedConferences },
    { header: t.headers[2], items: t.submittedJournals },
    { header: t.headers[3], items: null },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cols.map((col) => (
        <div
          key={col.header}
          className="rounded-2xl border border-border bg-card p-4"
        >
          <h3 className="mb-3 text-sm font-semibold text-muted">{col.header}</h3>
          {col.items ? (
            <PubList items={col.items} lang={lang} />
          ) : (
            <p className="text-sm text-muted">{t.acceptedJournalsPlaceholder}</p>
          )}
        </div>
      ))}
    </div>
  );
}
