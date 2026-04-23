import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

export function Hero({ lang }: { lang: Lang }) {
  const t = dict[lang].hero;
  return (
    <section className="px-4 pt-12 pb-8">
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
