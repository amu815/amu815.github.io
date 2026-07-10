/* eslint-disable @next/next/no-img-element */
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { calculateAge } from "@/lib/date";
import { Stats } from "./Stats";

export function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang].hero;
  return (
    <section className="hero-section">
      <div className="hero-topline fade-in-up fade-in-up-1">
        <span>Portfolio · 2026</span>
        <span>Kyushu University · Fukuoka, Japan</span>
      </div>

      <div className="hero-grid">
        <div className="hero-identity min-w-0">
          <p className="hero-kicker fade-in-up fade-in-up-1">{t.greeting}</p>
          {lang === "ja" && (
            <p className="hero-reading fade-in-up fade-in-up-2" aria-hidden>
              <span>Reading</span>
              {t.nameReading}
            </p>
          )}
          <h1
            className="hero-name fade-in-up fade-in-up-2"
            aria-label={lang === "ja" ? `${t.name}（${t.nameReading}）` : undefined}
          >
            {lang === "ja" ? (
              <span className="hero-name-primary" aria-hidden>{t.name}</span>
            ) : (
              <span className="hero-name-primary">{t.name}</span>
            )}
          </h1>
          {lang === "en" && (
            <p className="hero-romaji fade-in-up fade-in-up-2">
              {t.nameReadingRomaji} · {t.nameReading}
            </p>
          )}
          <p className="hero-tagline fade-in-up fade-in-up-3">{t.tagline}</p>
        </div>

        <div className="hero-details min-w-0 fade-in-up fade-in-up-3">
          <div className="hero-affiliation fade-in-up fade-in-up-3">
            <a href={t.affiliationHref} target="_blank" rel="noreferrer">
              {t.affiliation}
            </a>
            <span>{t.department}</span>
          </div>

          <div className="hero-keywords fade-in-up fade-in-up-3">
            {t.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>

          <div
            className="hero-achievements fade-in-up fade-in-up-4"
            aria-label={t.achievementLabel}
          >
            {t.achievements.map((achievement) => (
              <a
                key={achievement.label}
                href={achievement.href}
                target="_blank"
                rel="noreferrer"
                className="achievement-card"
              >
                <AwardIcon />
                <span className="min-w-0">
                  <strong>{achievement.label}</strong>
                  <small>{achievement.detail}</small>
                </span>
              </a>
            ))}
          </div>
        </div>

        <figure className="hero-portrait fade-in-up fade-in-up-2">
          <img
            src="/profile.jpg"
            alt={t.name}
            width={1441}
            height={1921}
          />
          <figcaption>
            <span>01 — Portrait</span>
            <span>Amu Suemoto</span>
          </figcaption>
        </figure>
      </div>

      <Facts lang={lang} />
      <div className="stats-block fade-in-up fade-in-up-4">
        <Stats lang={lang} />
      </div>
    </section>
  );
}

function AwardIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
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
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" />
    </svg>
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
      <span className="age-note">/ {f.ageSuffix(age)}</span>
    </>
  );
  const items = [
    { icon: <CakeIcon />, label: f.bornLabel, value: bornDisplay, color: "text-purple" },
    { icon: <CodeIcon />, label: f.languageLabel, value: f.languageValue, color: "text-cyan" },
    { icon: <BotIcon />, label: f.aiLabel, value: f.aiValue, color: "text-accent" },
    { icon: <HeartPulseIcon />, label: f.hobbiesLabel, value: f.hobbiesValue, color: "text-orange" },
  ];
  return (
    <dl className="facts-grid fade-in-up fade-in-up-4">
      {items.map((it) => (
        <div key={it.label} className="fact-row">
          <span className={it.color}>{it.icon}</span>
          <dt>{it.label}</dt>
          <dd>{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
