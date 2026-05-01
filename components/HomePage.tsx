import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Section } from "./Section";
import { News } from "./News";
import { Papers } from "./Papers";
import { Timeline } from "./Timeline";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { QiitaPosts } from "./QiitaPosts";
import { Kaggle } from "./Kaggle";
import { AI } from "./AI";
import { Learning } from "./Learning";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";

export function HomePage({ lang }: { lang: Lang }) {
  const s = dict[lang].sections;
  return (
    <>
      <Header lang={lang} />
      <main className="mx-auto w-full max-w-5xl flex-1">
        <Hero lang={lang} />
        {/* Latest */}
        <Section id="news" title={s.news}>
          <News lang={lang} />
        </Section>
        {/* Research cluster */}
        <Section id="publications" title={s.publications}>
          <Papers lang={lang} />
        </Section>
        <Section id="timeline" title={s.timeline}>
          <Timeline lang={lang} />
        </Section>
        <Section id="kaggle" title={s.kaggle}>
          <Kaggle lang={lang} />
        </Section>
        {/* Background cluster */}
        <Section id="education" title={s.education}>
          <Education lang={lang} />
        </Section>
        <Section id="experience" title={s.experience}>
          <Experience lang={lang} />
        </Section>
        {/* Technical cluster — capabilities first, then output */}
        <Section id="skills" title={s.skills}>
          <Skills lang={lang} />
        </Section>
        <Section id="ai" title={s.ai}>
          <AI />
        </Section>
        <Section id="learning" title={s.learning}>
          <Learning />
        </Section>
        <Section id="projects" title={s.projects}>
          <Projects lang={lang} />
        </Section>
        <Section id="qiita" title={s.qiita}>
          <QiitaPosts lang={lang} />
        </Section>
        {/* Contact */}
        <Section id="contact" title={s.contact}>
          <Contact lang={lang} />
        </Section>
      </main>
      <Footer lang={lang} />
      <BackToTop label={lang === "ja" ? "トップへ戻る" : "Back to top"} />
    </>
  );
}
