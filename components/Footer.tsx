import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

export function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <p className="site-footer__name">
            {lang === "ja" ? "末本 歩夢" : "Amu Suemoto"}
          </p>
          <p className="site-footer__meta mt-2 text-xs">
            {t.footer} · {new Date().getUTCFullYear()}
          </p>
        </div>
        <p className="text-sm">
          <a href="https://github.com/amu815" target="_blank" rel="noreferrer">
            github.com/amu815
          </a>
          <span className="site-footer__divider mx-2">·</span>
          <a href="https://github.com/amu815/amu815.github.io" target="_blank" rel="noreferrer">
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
