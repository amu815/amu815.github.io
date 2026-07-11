"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Lang } from "@/content/dict";

type NavigationItem = {
  id: string;
  label: string;
};

const copy = {
  en: {
    trigger: "Quick jump",
    eyebrow: "Site index",
    title: "Jump to a section",
    placeholder: "Search sections…",
    close: "Close quick navigation",
    results: (count: number) => `${count} ${count === 1 ? "section" : "sections"}`,
    empty: "No matching sections.",
    navLabel: "Search results",
  },
  ja: {
    trigger: "クイックジャンプ",
    eyebrow: "Site index",
    title: "セクションへ移動",
    placeholder: "セクション名を検索…",
    close: "クイックナビゲーションを閉じる",
    results: (count: number) => `${count}セクション`,
    empty: "一致するセクションがありません。",
    navLabel: "検索結果",
  },
} satisfies Record<Lang, object>;

export function SectionNavigator({
  lang,
  items,
}: {
  lang: Lang;
  items: NavigationItem[];
}) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const restoreFocusRef = useRef(true);
  const t = copy[lang];

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase(lang === "ja" ? "ja" : "en");
    if (!normalized) return items;
    return items.filter(
      (item) =>
        item.label.toLocaleLowerCase(lang === "ja" ? "ja" : "en").includes(normalized) ||
        item.id.toLowerCase().includes(normalized),
    );
  }, [items, lang, query]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || (!event.metaKey && !event.ctrlKey)) return;
      if (document.querySelector('[aria-modal="true"]')) return;
      event.preventDefault();
      setOpen(true);
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    restoreFocusRef.current = true;
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const siblings = dialog
      ? Array.from(document.body.children).filter(
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
              'input, a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing) return;
      if (event.key === "Escape") {
        close();
        return;
      }
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

    const focusFrame = requestAnimationFrame(() => inputRef.current?.focus());
    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      inertStates.forEach(([element, wasInert]) => {
        element.inert = wasInert;
      });
      if (restoreFocusRef.current) returnFocusRef.current?.focus();
      returnFocusRef.current = null;
    };
  }, [open]);

  const dialog = open ? (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="section-navigator-title"
      tabIndex={-1}
      className="section-navigator-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div className="section-navigator-dialog">
        <header className="section-navigator-heading">
          <div>
            <p>{t.eyebrow}</p>
            <h2 id="section-navigator-title">{t.title}</h2>
          </div>
          <button type="button" aria-label={t.close} onClick={close}>
            <CloseIcon />
          </button>
        </header>

        <label className="section-navigator-search">
          <SearchIcon />
          <span className="sr-only">{t.placeholder}</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            placeholder={t.placeholder}
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd aria-hidden>esc</kbd>
        </label>

        <div className="section-navigator-meta" role="status" aria-live="polite">
          {t.results(results.length)}
        </div>

        {results.length > 0 ? (
          <nav className="section-navigator-results" aria-label={t.navLabel}>
            <ol>
              {results.map((item) => {
                const index = items.findIndex((candidate) => candidate.id === item.id) + 1;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => {
                        restoreFocusRef.current = false;
                        close();
                        requestAnimationFrame(() => {
                          document
                            .getElementById(`${item.id}-heading`)
                            ?.focus({ preventScroll: true });
                        });
                      }}
                    >
                      <span className="section-navigator-index">
                        {String(index).padStart(2, "0")}
                      </span>
                      <span className="section-navigator-copy">
                        <strong>{item.label}</strong>
                        <small>#{item.id}</small>
                      </span>
                      <ArrowDownRightIcon />
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : (
          <p className="section-navigator-empty">{t.empty}</p>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        className="header-control section-navigator-trigger"
        aria-label={t.trigger}
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        title={t.trigger}
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
        <kbd>⌘K</kbd>
      </button>
      {mounted && dialog ? createPortal(dialog, document.body) : null}
    </>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ArrowDownRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7 7 10 10M8 17h9V8" />
    </svg>
  );
}
