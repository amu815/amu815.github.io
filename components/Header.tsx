import Link from "next/link";
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

export function Header({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href={lang === "en" ? "/" : "/ja/"} className="font-mono text-sm text-muted hover:no-underline">
          <span className="text-accent">amu815</span>
          <span className="text-muted">@github.io</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className={`rounded px-2 py-1 ${
              lang === "en" ? "bg-card text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            EN
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/ja/"
            className={`rounded px-2 py-1 ${
              lang === "ja" ? "bg-card text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            日本語
          </Link>
        </nav>
      </div>
    </header>
  );
}
