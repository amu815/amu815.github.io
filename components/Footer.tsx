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
          <p className="mt-2 text-xs text-[#8fa09b]">
            {t.footer} · {new Date().getUTCFullYear()}
          </p>
        </div>
        <p className="text-sm">
          <a href="https://github.com/amu815" target="_blank" rel="noreferrer">
            github.com/amu815
          </a>
          <span className="mx-2 text-[#526560]">·</span>
          <a href="https://github.com/amu815/amu815.github.io" target="_blank" rel="noreferrer">
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
