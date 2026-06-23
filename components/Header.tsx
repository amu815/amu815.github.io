"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";

const SECTION_IDS = [
  "news",
  "publications",
  "timeline",
  "kaggle",
  "education",
  "experience",
  "skills",
  "ai",
  "learning",
  "projects",
  "qiita",
  "contact",
];

const SITE_URLS: Record<Lang, string> = {
  en: "https://amu815.github.io/",
  ja: "https://amu815.github.io/ja/",
};

const QR_LABELS: Record<
  Lang,
  { button: string; title: string; alt: string; close: string; urlLabel: string }
> = {
  en: {
    button: "QR",
    title: "Site QR code",
    alt: "QR code for this site",
    close: "Close QR code",
    urlLabel: "URL",
  },
  ja: {
    button: "QR",
    title: "このサイトのQRコード",
    alt: "このサイトのQRコード",
    close: "QRコードを閉じる",
    urlLabel: "URL",
  },
};

export function Header({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [open, setOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [active, setActive] = useState<string>("news");
  const [progress, setProgress] = useState(0);
  const siteUrl = SITE_URLS[lang];
  const qrText = QR_LABELS[lang];
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=16&data=${encodeURIComponent(siteUrl)}`;

  const navItems: { id: string; href: string; label: string }[] = [
    { id: "news", href: "#news", label: t.sections.news },
    { id: "publications", href: "#publications", label: t.sections.publications },
    { id: "timeline", href: "#timeline", label: t.sections.timeline },
    { id: "kaggle", href: "#kaggle", label: t.sections.kaggle },
    { id: "education", href: "#education", label: t.sections.education },
    { id: "experience", href: "#experience", label: t.sections.experience },
    { id: "skills", href: "#skills", label: t.sections.skills },
    { id: "ai", href: "#ai", label: t.sections.ai },
    { id: "learning", href: "#learning", label: t.sections.learning },
    { id: "projects", href: "#projects", label: t.sections.projects },
    { id: "qiita", href: "#qiita", label: t.sections.qiita },
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

  useEffect(() => {
    if (!qrOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQrOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [qrOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href={lang === "en" ? "/" : "/ja/"}
            className="font-mono text-sm text-muted hover:no-underline"
          >
            <span className="text-accent">amu815</span>
            <span className="text-muted">@github.io</span>
          </Link>
          <nav className="hidden items-center gap-1 text-xs xl:flex">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={active === n.id ? "true" : undefined}
                className={`relative whitespace-nowrap rounded px-1.5 py-1 transition-colors hover:bg-card hover:text-foreground hover:no-underline ${
                  active === n.id ? "text-foreground" : "text-muted"
                }`}
              >
                {n.label}
                {active === n.id && (
                  <span className="absolute -bottom-0.5 left-1.5 right-1.5 h-px bg-gradient-to-r from-accent via-purple to-cyan" />
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
            <button
              type="button"
              aria-label={qrText.title}
              onClick={() => setQrOpen(true)}
              className="ml-1 inline-flex h-7 items-center gap-1 rounded border border-border bg-card/60 px-2 font-mono text-[11px] text-muted transition-colors hover:border-border-strong hover:bg-card hover:text-foreground"
            >
              <QrIcon />
              <span>{qrText.button}</span>
            </button>
          </nav>

          <div className="flex items-center gap-1 xl:hidden">
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
              aria-label={qrText.title}
              onClick={() => setQrOpen(true)}
              className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded border border-border bg-card/60 text-foreground"
            >
              <QrIcon className="h-4 w-4" />
            </button>
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
          <nav className="border-t border-border/60 bg-background/95 px-2 pb-3 pt-2 xl:hidden">
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

      {qrOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="site-qr-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 px-4 backdrop-blur-sm"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="w-full max-w-xs rounded-2xl border border-border-strong bg-card-elev p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 id="site-qr-title" className="text-sm font-semibold text-foreground">
                {qrText.title}
              </h2>
              <button
                type="button"
                aria-label={qrText.close}
                onClick={() => setQrOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-border bg-card/80 text-muted transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="rounded-xl border border-border bg-white p-3">
              <img
                src={qrImageUrl}
                alt={qrText.alt}
                width={240}
                height={240}
                className="aspect-square w-full"
              />
            </div>
            <p className="mt-3 break-all font-mono text-xs text-muted">
              <span className="text-muted-strong">{qrText.urlLabel}: </span>
              {siteUrl}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function QrIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h6v6H4z" />
      <path d="M14 4h6v6h-6z" />
      <path d="M4 14h6v6H4z" />
      <path d="M14 14h2v2h-2z" />
      <path d="M18 14h2v4" />
      <path d="M14 18h4" />
      <path d="M20 20h-2" />
    </svg>
  );
}
