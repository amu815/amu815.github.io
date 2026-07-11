"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/content/dict";
import { dict } from "@/content/dict";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { SectionNavigator } from "./SectionNavigator";

const SECTION_IDS = [
  "news",
  "publications",
  "awards",
  "funded-projects",
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

const PRIMARY_SECTION_IDS = new Set([
  "news",
  "publications",
  "funded-projects",
  "education",
  "skills",
  "projects",
  "contact",
]);

const ACTIVE_PRIMARY_ID: Record<string, string> = {
  news: "news",
  publications: "publications",
  awards: "publications",
  "funded-projects": "funded-projects",
  timeline: "publications",
  kaggle: "publications",
  education: "education",
  experience: "education",
  skills: "skills",
  ai: "skills",
  learning: "skills",
  projects: "projects",
  qiita: "projects",
  contact: "contact",
};

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
  const qrDialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const siteUrl = SITE_URLS[lang];
  const qrText = QR_LABELS[lang];
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=16&data=${encodeURIComponent(siteUrl)}`;

  const navItems: { id: string; href: string; label: string }[] = [
    { id: "news", href: "#news", label: t.sections.news },
    { id: "publications", href: "#publications", label: t.sections.publications },
    { id: "awards", href: "#awards", label: t.sections.awards },
    { id: "funded-projects", href: "#funded-projects", label: t.sections.fundedProjects },
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

  const primaryNavItems = navItems.filter((item) => PRIMARY_SECTION_IDS.has(item.id));

  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const page = document.documentElement;
        if (page.scrollTop + page.clientHeight >= page.scrollHeight - 8) {
          setActive("contact");
          return;
        }
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
      if (h.scrollTop < 120) setActive("news");
      if (h.scrollTop + h.clientHeight >= h.scrollHeight - 8) setActive("contact");
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

    const dialog = qrDialogRef.current;
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const siblings = dialog?.parentElement
      ? Array.from(dialog.parentElement.children).filter(
          (element): element is HTMLElement =>
            element instanceof HTMLElement && element !== dialog && element.tagName !== "SCRIPT",
        )
      : [];
    const inertStates = siblings.map((element) => [element, element.inert] as const);
    siblings.forEach((element) => {
      element.inert = true;
    });

    const focusableElements = () =>
      dialog
        ? Array.from(
            dialog.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQrOpen(false);
      if (event.key !== "Tab") return;

      const focusable = focusableElements();
      if (focusable.length === 0) {
        event.preventDefault();
        dialog?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const focusFrame = requestAnimationFrame(() => focusableElements()[0]?.focus());
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      inertStates.forEach(([element, wasInert]) => {
        element.inert = wasInert;
      });
      returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    };
  }, [qrOpen]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link
            href={lang === "en" ? "/" : "/ja/"}
            className="site-wordmark"
          >
            <span className="site-wordmark__monogram" aria-hidden>AS</span>
            <span className="site-wordmark__copy">
              <strong>{lang === "ja" ? "末本 歩夢" : "Amu Suemoto"}</strong>
              <small>Research · Engineering</small>
            </span>
          </Link>
          <nav
            className="site-nav"
            aria-label={lang === "ja" ? "主要ナビゲーション" : "Primary navigation"}
          >
            {primaryNavItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={ACTIVE_PRIMARY_ID[active] === n.id ? "location" : undefined}
                className="site-nav__link"
              >
                {n.label}
              </a>
            ))}
            <SectionNavigator lang={lang} items={navItems} />
            <span className="mx-2 h-4 w-px bg-border" />
            <Link
              href="/"
              className={`header-control ${lang === "en" ? "is-active" : ""}`}
            >
              EN
            </Link>
            <Link
              href="/ja/"
              className={`header-control ${lang === "ja" ? "is-active" : ""}`}
            >
              JP
            </Link>
            <ThemeSwitcher lang={lang} />
            <button
              type="button"
              aria-label={qrText.title}
              onClick={() => setQrOpen(true)}
              className="header-control ml-1 gap-1"
            >
              <QrIcon />
              <span>{qrText.button}</span>
            </button>
          </nav>

          <div className="mobile-header-controls flex items-center gap-1 lg:hidden">
            <Link
              href={lang === "en" ? "/ja/" : "/"}
              className="header-control"
              aria-label={lang === "en" ? "日本語版へ移動" : "Switch to English"}
            >
              {lang === "en" ? "JP" : "EN"}
            </Link>
            <ThemeSwitcher lang={lang} compact />
            <button
              type="button"
              aria-label={qrText.title}
              onClick={() => setQrOpen(true)}
              className="header-control ml-1 h-10 w-10 !px-0"
            >
              <QrIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={lang === "ja" ? "ナビゲーションを開閉" : "Toggle navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((v) => !v)}
              className="header-control ml-1 h-10 w-10 !px-0"
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
          <nav
            id="mobile-navigation"
            className="mobile-nav lg:hidden"
            aria-label={lang === "ja" ? "全セクション" : "All sections"}
          >
            <ul className="grid grid-cols-2 gap-1 text-sm">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === n.id ? "location" : undefined}
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
          className="reading-progress"
          style={{ width: `${progress}%`, transition: "width 120ms linear" }}
        />
      </header>

      {qrOpen && (
        <div
          ref={qrDialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="site-qr-title"
          tabIndex={-1}
          className="theme-dialog-backdrop fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={() => setQrOpen(false)}
        >
          <div
            className="w-full max-w-xs rounded-sm border border-border-strong bg-card p-5 shadow-2xl"
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
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-card text-muted transition-colors hover:text-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="rounded-sm border border-border bg-white p-3">
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
