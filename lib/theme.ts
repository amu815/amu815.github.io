export const THEME_STORAGE_KEY = "amu-theme";
export const THEME_CHANGE_EVENT = "amu-theme-change";

export const THEME_MODES = ["light", "dark", "system"] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

export function isThemeMode(value: string | null | undefined): value is ThemeMode {
  return THEME_MODES.includes(value as ThemeMode);
}
