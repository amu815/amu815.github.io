/* eslint-disable @next/next/no-img-element */
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

const links = [
  {
    href: "https://github.com/amu815",
    label: "GitHub",
    handle: "amu815",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
        <path d="M12 .5C5.7.5.5 5.7.5 12.1c0 5.1 3.3 9.5 7.9 11 .6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.2 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.9 7.9-11C23.5 5.7 18.3.5 12 .5Z" />
      </svg>
    ),
  },
  {
    href: "https://orcid.org/0009-0003-9824-837X",
    label: "ORCID",
    handle: "0009-0003-9824-837X",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0Zm-4.62 17.74H5.7V7.16h1.68v10.58Zm-.84-12.06a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Zm12.78 6.79c0 3.36-2.4 5.27-5.6 5.27H9.27V7.16h4.46c3.42 0 5.59 2.18 5.59 5.31Zm-1.68 0c0-2.45-1.55-3.79-3.92-3.79H10.95v7.6h1.94c2.13 0 3.75-1.36 3.75-3.81Z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/amu-suemoto-8a5257395/",
    label: "LinkedIn",
    handle: "amu-suemoto",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/amu_Humano_Dev",
    label: "X",
    handle: "@amu_Humano_Dev",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
        <path d="M18.244 2H21l-6.522 7.456L22 22h-6.844l-4.78-6.243L4.8 22H2.04l6.974-7.97L2 2h7.034l4.32 5.708L18.244 2Zm-1.198 18h1.875L7.05 4H5.06l11.986 16Z" />
      </svg>
    ),
  },
  {
    href: "https://qiita.com/Humanophilic_development",
    label: "Qiita",
    handle: "Humanophilic_development",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
        <path d="M3 3h18v18H3V3Zm9 3.5a5.5 5.5 0 1 0 5.5 5.5h-3.05a2.45 2.45 0 1 1-2.45-2.45V6.5Zm6.5 9.5h-2.27v2.5h2.27v-2.5Z" />
      </svg>
    ),
  },
  {
    href: "https://www.kaggle.com/amusuemotoarakawalab",
    label: "Kaggle",
    handle: "amusuemotoarakawalab",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
        <path d="M6 2h2.4v11.5l5.9-6h3l-6 6 6.6 8.5h-3L9.7 14.7l-1.3 1.3V22H6V2Z" />
      </svg>
    ),
  },
];

export function Contact({ lang }: { lang: Lang }) {
  const t = dict[lang].contact;
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-muted-strong">{t.intro}</p>
      <div className="flex flex-wrap gap-2">
        <a
          href={`mailto:${t.email}`}
          className="surface-card inline-flex items-center gap-2 px-4 py-2 text-sm font-medium hover:no-underline"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
            <path d="M2 6.4A2.4 2.4 0 0 1 4.4 4h15.2A2.4 2.4 0 0 1 22 6.4v11.2a2.4 2.4 0 0 1-2.4 2.4H4.4A2.4 2.4 0 0 1 2 17.6V6.4Zm2.6.1 7.4 5.55 7.4-5.55H4.6Z" />
          </svg>
          <span className="font-mono text-xs">{t.email}</span>
        </a>
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="surface-card inline-flex items-center gap-2 px-4 py-2 text-sm font-medium hover:no-underline"
          >
            {l.icon}
            <span className="text-foreground">{l.label}</span>
            <span className="text-muted">·</span>
            <span className="font-mono text-xs text-muted">{l.handle}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
