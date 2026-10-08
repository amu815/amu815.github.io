import type { Lang } from "@/content/dict";
import { papers } from "@/content/papers";
import { formatDate } from "@/lib/date";
import { PaperLinks } from "./PaperLinks";

export function OpenSourcePapers({ lang }: { lang: Lang }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm leading-relaxed text-muted">
        {lang === "ja"
          ? "論文と実装を公開している研究を紹介します。"
          : "Research with published papers and publicly available implementations."}
      </p>
      {papers.filter((paper) => paper.codeHref).map((paper) => (
        <article key={paper.id} className="surface-card overflow-hidden border-t-2 border-t-accent p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <a href={paper.href} target="_blank" rel="noreferrer" className="tier-pill border-accent/40 bg-accent/10 text-accent">
              {paper.shortName}
            </a>
            <span className="tier-pill border-purple/40 bg-purple/10 text-purple">
              {lang === "ja" ? "発表済・公開コードあり" : "Presented · Code available"}
            </span>
          </div>
          {paper.venueDescription && (
            <p className="mb-3 text-sm leading-relaxed text-muted-strong">
              {lang === "ja" ? paper.venueDescriptionJa ?? paper.venueDescription : paper.venueDescription}
            </p>
          )}
          <h3 className="max-w-3xl text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
            {paper.paperTitle}
          </h3>
          <p className="mt-3 text-sm text-muted-strong">
            {paper.authors?.map((author) => lang === "ja" ? author.nameJa ?? author.name : author.name).join(lang === "ja" ? "、" : ", ")}
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-loose text-muted-strong">
            {lang === "ja" ? paper.summaryJa ?? paper.summary : paper.summary}
          </p>
          <div className="my-5 border-l-2 border-accent/40 pl-4 text-xs leading-relaxed text-muted">
            <p>
              {lang === "ja" ? "発表日：" : "Presented: "}
              {paper.statusDate && <time dateTime={paper.statusDate}>{formatDate(paper.statusDate, lang)}</time>}
              {paper.location && ` · ${paper.location}`}
            </p>
            <p className="mt-1">{paper.session}{lang === "ja" ? "（現地時間）" : " (local time)"}</p>
          </div>
          <div className="border-t border-border pt-5">
            <PaperLinks paper={paper} lang={lang} />
          </div>
        </article>
      ))}
    </div>
  );
}
