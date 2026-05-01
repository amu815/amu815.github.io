export type Lang = "en" | "ja";

type Dict = {
  langLabel: string;
  otherLangLabel: string;
  otherLangHref: string;
  siteTitle: string;
  hero: {
    greeting: string;
    name: string;
    nameReading: string;
    nameReadingRomaji: string;
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
    education: string;
    experience: string;
    skills: string;
    projects: string;
    qiita: string;
    ai: string;
    learning: string;
    contact: string;
  };
  education: {
    intro: string;
    ongoing: string;
    planned: string;
    kindLabel: { highschool: string; bachelor: string; master: string; doctoral: string };
  };
  experience: {
    cyclingTitle: string;
    cyclingOrg: string;
    cyclingPeriod: string;
    cyclingPromotion: string;
    internshipsTitle: string;
    durationDay: (n: number) => string;
  };
  projects: {
    intro: string;
    viewOnGitHub: string;
    starsLabel: string;
    thisSiteBadge: string;
  };
  qiita: {
    intro: string;
    posts: string;
    likes: string;
    stocks: string;
    lastUpdated: string;
    empty: string;
    pickupHeader: string;
    pickupBadge: string;
    viewsBadge: (n: number) => string;
    allHeader: string;
  };
  stats: {
    heading: string;
    headingHint: string;
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
      nameReading: "末本 歩夢",
      nameReadingRomaji: "Suemoto Amu",
      affiliation:
        "Kyushu University M2 — Humanophilic Systems Lab (Arakawa, Mine & Fukushima Lab)",
      affiliationHref: "https://app.ait.kyushu-u.ac.jp/",
      department: "Information Science and Electrical Engineering (ISEE)",
      tagline:
        "Graduate researcher on trustworthy AI — fairness and robustness of vision-language models, and mechanistic interpretability for safer small language models.",
      keywords: [
        "Vision-Language Models",
        "Fairness & Bias Mitigation",
        "Robust Representation Learning",
        "LoRA / PEFT",
        "Mechanistic Interpretability (SAEs)",
        "AI Safety & Alignment",
      ],
      cv: "Download CV",
    },
    sections: {
      news: "News",
      publications: "Publications",
      timeline: "Submission Timeline",
      education: "Education",
      experience: "Experience",
      skills: "Skills",
      projects: "Open Source",
      qiita: "Qiita Articles",
      ai: "AI Tooling",
      learning: "Learning",
      contact: "Contact",
    },
    education: {
      intro: "Schools attended, in chronological order.",
      ongoing: "Ongoing",
      planned: "Planned",
      kindLabel: { highschool: "High School", bachelor: "B.E.", master: "M.E.", doctoral: "Ph.D." },
    },
    experience: {
      cyclingTitle: "Competitive Cycling",
      cyclingOrg: "Japan Bicycle Club Federation (JBCF)",
      cyclingPeriod: "2021 – 2023",
      cyclingPromotion: "Promoted to E2 (Mar 2023)",
      internshipsTitle: "Internships",
      durationDay: (n) => (n === 1 ? "1 day" : `${n} days`),
    },
    projects: {
      intro: "Selected public repositories on GitHub.",
      viewOnGitHub: "View on GitHub",
      starsLabel: "stars",
      thisSiteBadge: "This site",
    },
    qiita: {
      intro: "All posts published on Qiita as",
      posts: "Posts",
      likes: "Total likes",
      stocks: "Total stocks",
      lastUpdated: "Last updated",
      empty: "No posts available right now.",
      pickupHeader: "Pickup",
      pickupBadge: "Pickup",
      viewsBadge: (n) => `${n.toLocaleString("en-US")}+ views`,
      allHeader: "All Articles",
    },
    stats: {
      heading: "Publications at a glance",
      headingHint: "Counts across all conference, workshop and journal submissions.",
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
      intro: "Open to research collaborations, internships, and freelance development engagements.",
      email: "suemoto.amu.815@s.kyushu-u.ac.jp",
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
      nameReading: "すえもと あむ",
      nameReadingRomaji: "Suemoto Amu",
      affiliation:
        "九州大学 修士2年 — 人間情報システム研究グループ（荒川・峯・福嶋研究室）",
      affiliationHref: "https://app.ait.kyushu-u.ac.jp/",
      department: "システム情報科学府 情報理工学専攻 (ISEE)",
      tagline:
        "視覚言語モデルの公平性・ロバスト性、ならびに小規模言語モデルの機構的解釈可能性に基づく AI 安全性・アライメントを研究する大学院生エンジニア。",
      keywords: [
        "Vision-Language Models",
        "Fairness & Bias Mitigation",
        "Robust Representation Learning",
        "LoRA / PEFT",
        "Mechanistic Interpretability (SAEs)",
        "AI Safety & Alignment",
      ],
      cv: "CV をダウンロード",
    },
    sections: {
      news: "ニュース",
      publications: "論文・発表",
      timeline: "投稿タイムライン",
      education: "学歴",
      experience: "経歴・インターン",
      skills: "スキル",
      projects: "オープンソース",
      qiita: "Qiita 記事",
      ai: "AI ツール",
      learning: "学習中",
      contact: "コンタクト",
    },
    education: {
      intro: "在籍した学校の履歴です。",
      ongoing: "在籍中",
      planned: "進学予定",
      kindLabel: { highschool: "高校", bachelor: "学士", master: "修士", doctoral: "博士" },
    },
    experience: {
      cyclingTitle: "自転車競技",
      cyclingOrg: "全日本実業団自転車競技連盟（JBCF）",
      cyclingPeriod: "2021 – 2023",
      cyclingPromotion: "E2 昇格（2023年3月）",
      internshipsTitle: "インターンシップ",
      durationDay: (n) => (n === 1 ? "1日" : `${n}日間`),
    },
    projects: {
      intro: "GitHub 上の主な公開リポジトリ。",
      viewOnGitHub: "GitHub で見る",
      starsLabel: "Stars",
      thisSiteBadge: "このサイト",
    },
    qiita: {
      intro: "Qiita に公開した記事一覧",
      posts: "記事数",
      likes: "いいね",
      stocks: "ストック",
      lastUpdated: "最終更新",
      empty: "記事はまだありません。",
      pickupHeader: "ピックアップ",
      pickupBadge: "ピックアップ",
      viewsBadge: (n) => `${n.toLocaleString("ja-JP")}+ views`,
      allHeader: "全ての記事",
    },
    stats: {
      heading: "論文・発表サマリー",
      headingHint: "国際会議・ワークショップ・ジャーナル投稿全体の集計です。",
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
      intro: "共同研究・インターン・開発業務委託に関するご連絡をお待ちしております。",
      email: "suemoto.amu.815@s.kyushu-u.ac.jp",
    },
    footer: "© 末本歩夢",
  },
};
