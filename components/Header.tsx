import Link from "next/link";
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

export function Header({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const navItems: { href: string; label: string }[] = [
    { href: "#news", label: t.sections.news },
    { href: "#publications", label: t.sections.publications },
    { href: "#timeline", label: t.sections.timeline },
    { href: "#skills", label: t.sections.skills },
    { href: "#contact", label: t.sections.contact },
  ];
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link
          href={lang === "en" ? "/" : "/ja/"}
          className="font-mono text-sm text-muted hover:no-underline"
        >
          <span className="text-accent">amu815</span>
          <span className="text-muted">@github.io</span>
        </Link>
        <nav className="hidden items-center gap-1 text-xs sm:flex">
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded px-2 py-1 text-muted transition-colors hover:bg-card hover:text-foreground hover:no-underline"
            >
              {n.label}
            </a>
          ))}
          <span className="mx-2 h-4 w-px bg-border" />
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
        <nav className="flex items-center gap-1 text-sm sm:hidden">
          <Link
            href="/"
            className={`rounded px-2 py-1 ${
              lang === "en" ? "bg-card text-foreground" : "text-muted"
            }`}
          >
            EN
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/ja/"
            className={`rounded px-2 py-1 ${
              lang === "ja" ? "bg-card text-foreground" : "text-muted"
            }`}
          >
            日本語
          </Link>
        </nav>
      </div>
    </header>
  );
}
