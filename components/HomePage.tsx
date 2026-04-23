import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Section } from "./Section";
import { Contact } from "./Contact";
import { Stats } from "./Stats";
import { Contribution } from "./Contribution";
import { Publications } from "./Publications";
import { Skills } from "./Skills";
import { AI } from "./AI";
import { Learning } from "./Learning";
import { Footer } from "./Footer";

export function HomePage({ lang }: { lang: Lang }) {
  const s = dict[lang].sections;
  return (
    <>
      <Header lang={lang} />
      <main className="mx-auto w-full max-w-4xl flex-1">
        <Hero lang={lang} />
        <Section title={s.contact}>
          <Contact />
        </Section>
        <Section title={s.stats}>
          <Stats />
        </Section>
        <Section title={s.contribution}>
          <Contribution />
        </Section>
        <Section title={s.publications}>
          <Publications lang={lang} />
        </Section>
        <Section title={s.skills}>
          <Skills lang={lang} />
        </Section>
        <Section title={s.ai}>
          <AI />
        </Section>
        <Section title={s.learning}>
          <Learning />
        </Section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
