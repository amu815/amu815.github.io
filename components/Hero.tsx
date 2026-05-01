/* eslint-disable @next/next/no-img-element */
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { calculateAge } from "@/lib/date";
import { Stats } from "./Stats";

export function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang].hero;
  return (
    <section className="relative px-4 pt-12 pb-4 sm:pt-16 sm:pb-6">
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
            {lang === "ja" ? (
              <ruby className="text-gradient-accent">
                {t.name}
                <rt className="block text-[0.28em] font-medium tracking-[0.25em] text-muted">
                  {t.nameReading}
                </rt>
              </ruby>
            ) : (
              <span className="text-gradient-accent">{t.name}</span>
            )}
          </h1>
          {lang === "en" && (
            <p className="fade-in-up fade-in-up-2 mt-2 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              {t.nameReadingRomaji} · {t.nameReading}
            </p>
          )}
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
      <Facts lang={lang} />
      <div className="fade-in-up fade-in-up-4 mt-6">
        <Stats lang={lang} />
      </div>
    </section>
  );
}

function CakeIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6V3M12 3l1 1M12 3l-1 1" />
      <path d="M5 11h14v9H5z" />
      <path d="M5 14c1 1 2 1 3 0s2-1 3 0 2 1 3 0 2-1 3 0 2 1 3 0" />
    </svg>
  );
}
function CodeIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8l-4 4 4 4" />
      <path d="M16 8l4 4-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  );
}
function BotIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="7" width="16" height="13" rx="2" />
      <path d="M12 7V3M9 13h.01M15 13h.01" />
      <path d="M9 17h6" />
    </svg>
  );
}
function HeartPulseIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h4l2-3 3 6 2-4 2 1h5" />
      <path d="M20.6 7.6a4 4 0 0 0-6.6-1.4l-2 2-2-2A4 4 0 0 0 3.4 11l1 1" />
    </svg>
  );
}

function Facts({ lang }: { lang: Lang }) {
  const f = dict[lang].hero.facts;
  const age = calculateAge(f.bornIso);
  const bornDisplay = (
    <>
      {f.bornValue}
      <span className="ml-1.5 rounded-full border border-border-strong bg-card-elev px-1.5 py-0.5 align-middle font-mono text-[10px] tracking-wider text-muted-strong">
        {f.ageSuffix(age)}
      </span>
    </>
  );
  const items = [
    { icon: <CakeIcon />, label: f.bornLabel, value: bornDisplay, color: "text-purple" },
    { icon: <CodeIcon />, label: f.languageLabel, value: f.languageValue, color: "text-cyan" },
    { icon: <BotIcon />, label: f.aiLabel, value: f.aiValue, color: "text-accent" },
    { icon: <HeartPulseIcon />, label: f.hobbiesLabel, value: f.hobbiesValue, color: "text-orange" },
  ];
  return (
    <dl className="fade-in-up fade-in-up-4 mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <div
          key={it.label}
          className="surface-card flex items-baseline gap-3 px-4 py-2.5"
        >
          <span className={`flex-none ${it.color}`}>{it.icon}</span>
          <dt className="font-mono text-[11px] uppercase tracking-wider text-muted sm:w-28 sm:flex-none">
            {it.label}
          </dt>
          <dd className="text-sm font-medium text-foreground">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
