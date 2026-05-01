/* eslint-disable @next/next/no-img-element */
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { Stats } from "./Stats";

export function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang].hero;
  return (
    <section className="relative px-4 pt-14 pb-12 sm:pt-20 sm:pb-16">
      <div className="grid items-center gap-10 sm:grid-cols-[auto_1fr]">
        <div className="fade-in-up fade-in-up-1 relative">
          <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 rounded-2xl bg-gradient-to-br from-accent/40 via-purple/30 to-cyan/30 blur-xl" />
          <img
            src="/profile.jpg"
            alt={t.name}
            width={1441}
            height={1921}
            className="w-44 flex-none rounded-2xl border border-border-strong shadow-2xl sm:w-52"
          />
        </div>
        <div className="min-w-0">
          <p className="fade-in-up fade-in-up-1 mb-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {t.greeting}
          </p>
          <h1 className="fade-in-up fade-in-up-2 text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="text-gradient-accent">{t.name}</span>
          </h1>
          <p className="fade-in-up fade-in-up-3 mt-5 max-w-2xl text-base text-muted-strong sm:text-lg">
            {t.tagline}
          </p>
          <div className="fade-in-up fade-in-up-3 mt-4 flex flex-wrap gap-2">
            {t.keywords.map((k) => (
              <span
                key={k}
                className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-strong"
              >
                {k}
              </span>
            ))}
          </div>
          <div className="fade-in-up fade-in-up-4 mt-5 flex flex-col gap-1 text-sm">
            <a
              href={t.affiliationHref}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-foreground hover:text-accent"
            >
              {t.affiliation}
            </a>
            <span className="text-muted">{t.department}</span>
          </div>
        </div>
      </div>
      <div className="fade-in-up fade-in-up-4 mt-10">
        <Stats lang={lang} />
      </div>
    </section>
  );
}
