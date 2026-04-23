export type Lang = "en" | "ja";

type Pub = { href: string; title: string; badges: { label: string; color: string }[] };

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
    stats: string;
    contribution: string;
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

const publications = {
  submittedConferences: [
    {
      href: "https://2026.ijcai.org/",
      title: "IJCAI 2026",
      badges: [
        { label: "CORE A*", color: "4CAF50" },
        { label: "Under Review", color: "FFA500" },
      ],
    },
    {
      href: "https://2026.ieeeicassp.org/",
      title: "ICASSP 2026",
      badges: [{ label: "CORE B", color: "3178C6" }],
    },
    {
      href: "https://rcis-conf.com/rcis2026/",
      title: "RCIS 2026",
      badges: [{ label: "CORE B", color: "3178C6" }],
    },
    {
      href: "https://www.dpsws.org/2025/",
      title: "DPSWS 2025",
      badges: [{ label: "Domestic", color: "808080" }],
    },
  ],
  acceptedConferences: [
    {
      href: "https://www.dpsws.org/2025/",
      title: "DPSWS 2025",
      badges: [{ label: "Domestic", color: "808080" }],
    },
  ],
  submittedJournals: [
    {
      href: "https://www.jstage.jst.go.jp/browse/transinf/",
      title: "IEICE Trans. 2026",
      badges: [{ label: "Under Review", color: "FFA500" }],
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
      stats: "Stats",
      contribution: "Contribution",
      publications: "Publications",
      skills: "My Skills",
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
    siteTitle: "末元あむ",
    hero: {
      greeting: "こんにちは 👋",
      name: "末元 あむ (Amu Suemoto)",
      affiliation: "九州大学 修士2年 — 人間共生システム研究室",
      affiliationHref: "https://app.ait.kyushu-u.ac.jp/",
      department: "情報理工学府 (ISEE)",
    },
    sections: {
      contact: "Contact",
      stats: "Stats",
      contribution: "Contribution",
      publications: "論文・発表",
      skills: "スキル",
      ai: "AI",
      learning: "学習中",
    },
    publications: {
      headers: ["投稿中 (会議)", "採択済 (会議)", "投稿中 (論文誌)", "採択済 (論文誌)"],
      ...publications,
      acceptedJournalsPlaceholder: "—",
    },
    skills: {
      headers: ["AI / ML", "バックエンド", "フロントエンド", "インフラ"],
    },
    footer: "© 末元あむ",
  },
};
