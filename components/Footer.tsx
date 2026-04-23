import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

export function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <footer className="mt-8 border-t border-border/60 px-4 py-6 text-center text-sm text-muted">
      <p>
        {t.footer} · {new Date().getUTCFullYear()}
      </p>
      <p className="mt-1">
        <a href="https://github.com/amu815/amu815.github.io" target="_blank" rel="noreferrer">
          source on github
        </a>
      </p>
    </footer>
  );
}
