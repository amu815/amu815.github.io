import type { Lang } from "@/content/dict";
import { paperResources, type PaperVenue } from "@/content/papers";

export function PaperLinks({ paper, lang }: { paper: PaperVenue; lang: Lang }) {
  const links = paperResources(paper, lang);
  if (!links.length) return null;
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
      {links.map((link) => (
        <li key={link.href} className="min-w-0">
          <a href={link.href} target="_blank" rel="noreferrer" className="break-words text-accent underline underline-offset-4">
            {link.label} <span aria-hidden>↗</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
