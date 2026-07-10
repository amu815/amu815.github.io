"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "@/content/dict";
import {
  isThemeMode,
  THEME_CHANGE_EVENT,
  THEME_MODES,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from "@/lib/theme";

const copy = {
  en: {
    title: "Appearance",
    trigger: "Color theme",
    light: { label: "Light", short: "Light", description: "Warm paper and dark ink" },
    dark: { label: "Dark", short: "Dark", description: "Deep ink and soft celadon" },
    system: { label: "System", short: "Auto", description: "Follow this device" },
  },
  ja: {
    title: "表示テーマ",
    trigger: "カラーテーマ",
    light: { label: "ライト", short: "明るい", description: "紙色と墨色の明るい配色" },
    dark: { label: "ダーク", short: "暗い", description: "深い墨緑を基調にした配色" },
    system: { label: "システム", short: "自動", description: "端末の設定に合わせる" },
  },
} as const;

function readTheme(): ThemeMode {
  if (typeof document === "undefined") return "system";
  const value = document.documentElement.dataset.theme;
  return isThemeMode(value) ? value : "system";
}

function applyTheme(mode: ThemeMode, persist = true) {
  document.documentElement.dataset.theme = mode;
  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch {
      // The selected theme still applies for this page when storage is unavailable.
    }
  }
  window.dispatchEvent(new CustomEvent<ThemeMode>(THEME_CHANGE_EVENT, { detail: mode }));
}

export function ThemeSwitcher({
  lang,
  compact = false,
}: {
  lang: Lang;
  compact?: boolean;
}) {
  const t = copy[lang];
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Partial<Record<ThemeMode, HTMLButtonElement | null>>>({});
  const [mode, setMode] = useState<ThemeMode>("system");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const syncTheme = () => setMode(readTheme());
    const syncStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      const next = isThemeMode(event.newValue) ? event.newValue : "system";
      document.documentElement.dataset.theme = next;
      setMode(next);
    };

    syncTheme();
    window.addEventListener(THEME_CHANGE_EVENT, syncTheme);
    window.addEventListener("storage", syncStorage);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, syncTheme);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusFrame = requestAnimationFrame(() => optionRefs.current[mode]?.focus());
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mode, open]);

  const chooseTheme = (next: ThemeMode) => {
    setMode(next);
    applyTheme(next);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const moveOptionFocus = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
      const controls = Array.from(
        triggerRef.current
          ?.closest(".site-header")
          ?.querySelectorAll<HTMLElement>(".header-control") ?? [],
      ).filter((element) => element.offsetParent !== null);
      const triggerIndex = controls.indexOf(triggerRef.current as HTMLElement);
      const nextIndex = event.shiftKey ? triggerIndex - 1 : triggerIndex + 1;
      requestAnimationFrame(() => controls[nextIndex]?.focus());
      return;
    }
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) {
      return;
    }
    event.preventDefault();
    const currentIndex = THEME_MODES.findIndex(
      (themeMode) => optionRefs.current[themeMode] === document.activeElement,
    );
    let nextIndex = currentIndex;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = THEME_MODES.length - 1;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (Math.max(currentIndex, 0) + 1) % THEME_MODES.length;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (currentIndex <= 0 ? THEME_MODES.length : currentIndex) - 1;
    }
    optionRefs.current[THEME_MODES[nextIndex]]?.focus();
  };

  return (
    <div ref={rootRef} className="theme-switcher">
      <button
        ref={triggerRef}
        type="button"
        className={`header-control theme-trigger ${compact ? "theme-trigger--compact" : ""}`}
        aria-label={`${t.trigger}: ${t[mode].label}`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-haspopup="menu"
        title={`${t.trigger}: ${t[mode].label}`}
        onClick={() => setOpen((value) => !value)}
      >
        <ThemeIcon mode={mode} />
        <span className="theme-trigger__label">{t[mode].short}</span>
        <ChevronIcon />
      </button>

      {open && (
        <div
          id={menuId}
          className="theme-menu"
          role="menu"
          aria-label={t.title}
          onKeyDown={moveOptionFocus}
        >
          <div className="theme-menu__heading" aria-hidden="true">
            <span>{t.title}</span>
            <span aria-hidden>01—03</span>
          </div>
          {THEME_MODES.map((themeMode) => (
            <button
              key={themeMode}
              ref={(element) => {
                optionRefs.current[themeMode] = element;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={mode === themeMode}
              tabIndex={mode === themeMode ? 0 : -1}
              className={`theme-option ${mode === themeMode ? "is-active" : ""}`}
              onClick={() => chooseTheme(themeMode)}
            >
              <span className="theme-option__icon"><ThemeIcon mode={themeMode} /></span>
              <span className="theme-option__copy">
                <strong>{t[themeMode].label}</strong>
                <small>{t[themeMode].description}</small>
              </span>
              <span className="theme-option__mark" aria-hidden>
                {mode === themeMode ? "●" : "○"}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeIcon({ mode }: { mode: ThemeMode }) {
  if (mode === "light") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2.5v2M12 19.5v2M4.5 4.5 6 6M18 18l1.5 1.5M2.5 12h2M19.5 12h2M4.5 19.5 6 18M18 6l1.5-1.5" />
      </svg>
    );
  }
  if (mode === "dark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M20 15.2A8.4 8.4 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="4.5" width="18" height="12.5" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="theme-trigger__chevron" viewBox="0 0 16 16" aria-hidden>
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}
