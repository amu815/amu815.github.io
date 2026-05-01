export type ProjectLanguage = "TypeScript" | "Python" | "Shell" | "Other";

export type Project = {
  name: string;
  descriptionEn: string;
  descriptionJa: string;
  language: ProjectLanguage;
  href: string;
  stars: number;
  createdAt: string;
  isThisSite?: boolean;
};

export const projects: Project[] = [
  {
    name: "claude-local",
    descriptionEn:
      "Connect Claude Code to locally-hosted LLMs with auto-detection and a failover proxy.",
    descriptionJa:
      "ローカル LLM を Claude Code に接続するプロキシ。自動検出とフェイルオーバーに対応。",
    language: "Python",
    href: "https://github.com/amu815/claude-local",
    stars: 3,
    createdAt: "2026-03-18",
  },
  {
    name: "update-claude-skill",
    descriptionEn:
      "Skill that resolves Claude Code's ENOTEMPTY update failure with a single command.",
    descriptionJa:
      "Claude Code のアップデート失敗 (ENOTEMPTY) をワンコマンドで解決する Skill。",
    language: "Other",
    href: "https://github.com/amu815/update-claude-skill",
    stars: 1,
    createdAt: "2026-03-12",
  },
  {
    name: "claude-handoff",
    descriptionEn:
      "Claude Code plugin that auto-generates a handoff prompt and restarts with fresh context.",
    descriptionJa:
      "Claude Code 用プラグイン。引き継ぎプロンプトを自動生成し、コンテキストをリセットして再起動。",
    language: "Shell",
    href: "https://github.com/amu815/claude-handoff",
    stars: 0,
    createdAt: "2026-03-30",
  },
  {
    name: "amu815.github.io",
    descriptionEn: "This site — bilingual personal site built with Next.js (static export).",
    descriptionJa: "本サイト。Next.js (静的書き出し) で構築したバイリンガルなパーソナルサイト。",
    language: "TypeScript",
    href: "https://github.com/amu815/amu815.github.io",
    stars: 0,
    createdAt: "2026-04-23",
    isThisSite: true,
  },
];
