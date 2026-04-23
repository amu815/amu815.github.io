import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

export function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang].hero;
  return (
    <section className="px-4 pt-10 pb-6">
      <div className="mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://komarev.com/ghpvc/?username=amu815&color=6366f1&style=flat-square"
          alt="profile views"
          width={120}
          height={20}
        />
      </div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        <span className="text-muted">{t.greeting}</span>{" "}
        <span className="text-foreground">{t.name}</span>
      </h1>
      <p className="mt-4 text-lg font-semibold text-foreground">
        <a href={t.affiliationHref} target="_blank" rel="noreferrer">
          {t.affiliation}
        </a>
      </p>
      <blockquote className="mt-2 border-l-4 border-accent/60 pl-3 text-muted">
        {t.department}
      </blockquote>
    </section>
  );
}
