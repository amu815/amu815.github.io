"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

const SECTION_IDS = [
  "news",
  "publications",
  "timeline",
  "education",
  "experience",
  "skills",
  "projects",
  "qiita",
  "kaggle",
  "ai",
  "learning",
  "contact",
];

export function Header({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("news");
  const [progress, setProgress] = useState(0);

  const navItems: { id: string; href: string; label: string }[] = [
    { id: "news", href: "#news", label: t.sections.news },
    { id: "publications", href: "#publications", label: t.sections.publications },
    { id: "timeline", href: "#timeline", label: t.sections.timeline },
    { id: "education", href: "#education", label: t.sections.education },
    { id: "experience", href: "#experience", label: t.sections.experience },
    { id: "skills", href: "#skills", label: t.sections.skills },
    { id: "projects", href: "#projects", label: t.sections.projects },
    { id: "qiita", href: "#qiita", label: t.sections.qiita },
    { id: "kaggle", href: "#kaggle", label: t.sections.kaggle },
    { id: "ai", href: "#ai", label: t.sections.ai },
    { id: "learning", href: "#learning", label: t.sections.learning },
    { id: "contact", href: "#contact", label: t.sections.contact },
  ];

  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const el of targets) observer.observe(el);

    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href={lang === "en" ? "/" : "/ja/"}
          className="font-mono text-sm text-muted hover:no-underline"
        >
          <span className="text-accent">amu815</span>
          <span className="text-muted">@github.io</span>
        </Link>
        <nav className="hidden items-center gap-1 text-xs lg:flex">
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              aria-current={active === n.id ? "true" : undefined}
              className={`relative rounded px-2 py-1 transition-colors hover:bg-card hover:text-foreground hover:no-underline ${
                active === n.id ? "text-foreground" : "text-muted"
              }`}
            >
              {n.label}
              {active === n.id && (
                <span className="absolute -bottom-0.5 left-2 right-2 h-px bg-gradient-to-r from-accent via-purple to-cyan" />
              )}
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

        <div className="flex items-center gap-1 lg:hidden">
          <Link
            href="/"
            className={`rounded px-2 py-1 text-xs ${
              lang === "en" ? "bg-card text-foreground" : "text-muted"
            }`}
          >
            EN
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/ja/"
            className={`rounded px-2 py-1 text-xs ${
              lang === "ja" ? "bg-card text-foreground" : "text-muted"
            }`}
          >
            日本語
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded border border-border bg-card/60 text-foreground"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background/95 px-2 pb-3 pt-2 lg:hidden">
          <ul className="grid grid-cols-2 gap-1 text-sm">
            {navItems.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded px-3 py-2 ${
                    active === n.id
                      ? "bg-card text-foreground"
                      : "text-muted hover:bg-card hover:text-foreground"
                  } hover:no-underline`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-accent via-purple to-cyan"
        style={{ width: `${progress}%`, transition: "width 120ms linear" }}
      />
    </header>
  );
}
