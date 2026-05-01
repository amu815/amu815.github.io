export type Lang = "en" | "ja";

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
    tagline: string;
    keywords: string[];
    cv: string;
  };
  sections: {
    news: string;
    publications: string;
    timeline: string;
    skills: string;
    ai: string;
    learning: string;
    contact: string;
  };
  stats: {
    submissions: string;
    underReview: string;
    accepted: string;
    topTier: string;
  };
  publications: {
    statusGroupHeaders: {
      under_review: string;
      accepted: string;
      rejected: string;
      presented: string;
      submitted: string;
    };
    submitted: string;
    notification: string;
    conference: string;
    venueLabel: string;
  };
  timeline: {
    intro: string;
    upcoming: string;
    past: string;
    legend: {
      submitted: string;
      accepted: string;
      rejected: string;
      presented: string;
      conference: string;
    };
  };
  skills: {
    headers: [string, string, string, string];
  };
  contact: {
    intro: string;
    email: string;
  };
  footer: string;
};

export const dict: Record<Lang, Dict> = {
  en: {
    langLabel: "EN",
    otherLangLabel: "日本語",
    otherLangHref: "/ja/",
    siteTitle: "Amu Suemoto",
    hero: {
      greeting: "Hi, I'm",
      name: "Amu Suemoto",
      affiliation: "Kyushu University M2 — Humanophilic Systems Lab",
      affiliationHref: "https://app.ait.kyushu-u.ac.jp/",
      department: "Information Science and Electrical Engineering (ISEE)",
      tagline:
        "Researcher and engineer working on multimodal AI, large-language-model systems, and human-centered intelligent interfaces.",
      keywords: [
        "Multimodal AI",
        "LLM Systems",
        "Affective Computing",
        "Edge Inference",
      ],
      cv: "Download CV",
    },
    sections: {
      news: "News",
      publications: "Publications",
      timeline: "Submission Timeline",
      skills: "Skills",
      ai: "AI Tooling",
      learning: "Learning",
      contact: "Contact",
    },
    stats: {
      submissions: "Submissions",
      underReview: "Under Review",
      accepted: "Accepted",
      topTier: "CORE A*",
    },
    publications: {
      statusGroupHeaders: {
        under_review: "Under Review",
        accepted: "Accepted",
        rejected: "Decisions",
        presented: "Presented",
        submitted: "Submitted",
      },
      submitted: "Submitted",
      notification: "Notification",
      conference: "Conference",
      venueLabel: "Venue",
    },
    timeline: {
      intro:
        "A chronological view of recent paper submissions, decisions, and conference dates.",
      upcoming: "Upcoming",
      past: "Past",
      legend: {
        submitted: "Submitted",
        accepted: "Accepted",
        rejected: "Rejected",
        presented: "Presented",
        conference: "Conference",
      },
    },
    skills: {
      headers: ["AI / ML", "Backend", "Frontend", "Infrastructure"],
    },
    contact: {
      intro: "Open to research collaborations, internships, and full-time roles.",
      email: "amu20030218@gmail.com",
    },
    footer: "© Amu Suemoto",
  },
  ja: {
    langLabel: "日本語",
    otherLangLabel: "EN",
    otherLangHref: "/",
    siteTitle: "末本歩夢",
    hero: {
      greeting: "こんにちは",
      name: "末本 歩夢",
      affiliation: "九州大学 修士2年 — 人間情報システム研究グループ",
      affiliationHref: "https://app.ait.kyushu-u.ac.jp/",
      department: "システム情報科学府 (ISEE)",
      tagline:
        "マルチモーダルAI・大規模言語モデル基盤・人間中心の知的インタフェースを研究／開発する大学院生エンジニア。",
      keywords: [
        "Multimodal AI",
        "LLM Systems",
        "Affective Computing",
        "Edge Inference",
      ],
      cv: "CV をダウンロード",
    },
    sections: {
      news: "ニュース",
      publications: "論文・発表",
      timeline: "投稿タイムライン",
      skills: "スキル",
      ai: "AI ツール",
      learning: "学習中",
      contact: "コンタクト",
    },
    stats: {
      submissions: "投稿数",
      underReview: "査読中",
      accepted: "採択",
      topTier: "CORE A*",
    },
    publications: {
      statusGroupHeaders: {
        under_review: "査読中",
        accepted: "採択",
        rejected: "不採択",
        presented: "発表済",
        submitted: "投稿済",
      },
      submitted: "投稿",
      notification: "通知",
      conference: "会議",
      venueLabel: "投稿先",
    },
    timeline: {
      intro: "投稿・査読・発表に関する近年の出来事を時系列で表示しています。",
      upcoming: "今後の予定",
      past: "過去",
      legend: {
        submitted: "投稿",
        accepted: "採択",
        rejected: "不採択",
        presented: "発表",
        conference: "会議",
      },
    },
    skills: {
      headers: ["AI / ML", "バックエンド", "フロントエンド", "インフラ"],
    },
    contact: {
      intro: "共同研究・インターン・採用に関するご連絡をお待ちしております。",
      email: "amu20030218@gmail.com",
    },
    footer: "© 末本歩夢",
  },
};
