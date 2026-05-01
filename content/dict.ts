export type Lang = "en" | "ja";

type Badge = { label: string; labelJa?: string; color: string };
type Pub = { href: string; title: string; badges: Badge[] };

type Dict = {
  langLabel: string;
  otherLangLabel: string;
  otherLangHref: string;
  siteTitle: string;
  hero: {
    greeting: string;
    name: string;
    affiliation: string;
    affiliationHref: string;
    department: string;
  };
  sections: {
    contact: string;
    publications: string;
    skills: string;
    ai: string;
    learning: string;
  };
  publications: {
    headers: [string, string, string, string];
    submittedConferences: Pub[];
    acceptedConferences: Pub[];
    submittedJournals: Pub[];
    acceptedJournalsPlaceholder: string;
  };
  skills: {
    headers: [string, string, string, string];
  };
  footer: string;
};

const UNDER_REVIEW: Badge = { label: "Under Review", labelJa: "査読中", color: "FFA500" };
const DOMESTIC: Badge = { label: "Domestic", labelJa: "国内", color: "808080" };
const CORE_A_STAR: Badge = { label: "CORE A*", color: "4CAF50" };
const CORE_B: Badge = { label: "CORE B", color: "3178C6" };

const publications = {
  submittedConferences: [
    {
      href: "https://neurips.cc/Conferences/2026",
      title: "NeurIPS 2026",
      badges: [CORE_A_STAR, UNDER_REVIEW],
    },
    {
      href: "https://2026.ijcai.org/",
      title: "IJCAI 2026",
      badges: [CORE_A_STAR],
    },
    {
      href: "https://2026.ieeeicassp.org/",
      title: "ICASSP 2026",
      badges: [CORE_B],
    },
    {
      href: "https://icmi.acm.org/",
      title: "ICMI 2026",
      badges: [CORE_B, UNDER_REVIEW],
    },
    {
      href: "https://rcis-conf.com/rcis2026/",
      title: "RCIS 2026",
      badges: [CORE_B],
    },
    {
      href: "https://www.dpsws.org/2025/",
      title: "DPSWS 2025",
      badges: [DOMESTIC],
    },
  ],
  acceptedConferences: [
    {
      href: "https://www.dpsws.org/2025/",
      title: "DPSWS 2025",
      badges: [DOMESTIC],
    },
  ],
  submittedJournals: [
    {
      href: "https://www.jstage.jst.go.jp/browse/transinf/",
      title: "IEICE Trans. 2026",
      badges: [UNDER_REVIEW],
    },
  ],
};

export const dict: Record<Lang, Dict> = {
  en: {
    langLabel: "EN",
    otherLangLabel: "日本語",
    otherLangHref: "/ja/",
    siteTitle: "Amu Suemoto",
    hero: {
      greeting: "Hi 👋 I'm",
      name: "Amu Suemoto",
      affiliation: "Kyushu University M2 — Humanophilic Systems Lab",
      affiliationHref: "https://app.ait.kyushu-u.ac.jp/",
      department: "Information Science and Electrical Engineering (ISEE)",
    },
    sections: {
      contact: "Contact",
      publications: "Publications",
      skills: "Skills",
      ai: "AI",
      learning: "Learning",
    },
    publications: {
      headers: [
        "Submitted Conferences",
        "Accepted Conferences",
        "Submitted Journals",
        "Accepted Journals",
      ],
      ...publications,
      acceptedJournalsPlaceholder: "—",
    },
    skills: {
      headers: ["AI / ML", "Backend", "Frontend", "Infrastructure"],
    },
    footer: "© Amu Suemoto",
  },
  ja: {
    langLabel: "日本語",
    otherLangLabel: "EN",
    otherLangHref: "/",
    siteTitle: "末本歩夢",
    hero: {
      greeting: "こんにちは 👋",
      name: "末本 歩夢 (Amu Suemoto)",
      affiliation: "九州大学 修士2年 — 人間情報システム研究グループ",
      affiliationHref: "https://app.ait.kyushu-u.ac.jp/",
      department: "システム情報科学府 (ISEE)",
    },
    sections: {
      contact: "Contact",
      publications: "論文・発表",
      skills: "スキル",
      ai: "AI",
      learning: "学習中",
    },
    publications: {
      headers: ["投稿済（会議）", "採択済（会議）", "投稿済（論文誌）", "掲載済（論文誌）"],
      ...publications,
      acceptedJournalsPlaceholder: "—",
    },
    skills: {
      headers: ["AI / ML", "バックエンド", "フロントエンド", "インフラ"],
    },
    footer: "© 末本歩夢",
  },
};
