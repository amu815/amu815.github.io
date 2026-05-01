import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

export function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <footer className="mt-12 border-t border-border/60 px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center text-sm text-muted">
        <p>
          {t.footer} · {new Date().getUTCFullYear()}
        </p>
        <p>
          <a href="https://github.com/amu815" target="_blank" rel="noreferrer">
            github.com/amu815
          </a>
          <span className="mx-2 text-border">·</span>
          <a href="https://github.com/amu815/amu815.github.io" target="_blank" rel="noreferrer">
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
