export type PaperStatus =
  | "under_review"
  | "accepted"
  | "rejected"
  | "presented"
  | "submitted";

export type PaperTier =
  | "core_a_star"
  | "core_a"
  | "core_b"
  | "core_c"
  | "domestic"
  | "journal";

export type PaperType = "conference" | "journal" | "workshop";

export type PaperVenue = {
  id: string;
  shortName: string;
  fullName: string;
  fullNameJa?: string;
  href: string;
  type: PaperType;
  tier: PaperTier;
  submissionDeadline?: string;
  notificationDate?: string;
  conferenceStart?: string;
  conferenceEnd?: string;
  location?: string;
  status: PaperStatus;
  statusDate?: string;
  paperTitle?: string;
  paperTitleJa?: string;
};

export const papers: PaperVenue[] = [
  {
    id: "neurips-2026",
    shortName: "NeurIPS 2026",
    fullName: "Conference on Neural Information Processing Systems",
    fullNameJa: "ニューラル情報処理システム国際会議",
    href: "https://neurips.cc/Conferences/2026",
    type: "conference",
    tier: "core_a_star",
    submissionDeadline: "2026-04-30",
    notificationDate: "2026-09-25",
    conferenceStart: "2026-12-07",
    conferenceEnd: "2026-12-12",
    status: "under_review",
    statusDate: "2026-04-30",
  },
  {
    id: "ijcai-2026",
    shortName: "IJCAI 2026",
    fullName: "International Joint Conference on Artificial Intelligence",
    fullNameJa: "人工知能国際合同会議",
    href: "https://2026.ijcai.org/",
    type: "conference",
    tier: "core_a_star",
    submissionDeadline: "2026-01-23",
    notificationDate: "2026-04-25",
    conferenceStart: "2026-08-16",
    conferenceEnd: "2026-08-22",
    status: "rejected",
    statusDate: "2026-04-25",
  },
  {
    id: "icmi-2026",
    shortName: "ICMI 2026",
    fullName: "International Conference on Multimodal Interaction",
    fullNameJa: "マルチモーダルインタラクション国際会議",
    href: "https://icmi.acm.org/",
    type: "conference",
    tier: "core_b",
    submissionDeadline: "2026-04-15",
    notificationDate: "2026-08-01",
    conferenceStart: "2026-10-12",
    status: "under_review",
    statusDate: "2026-04-15",
  },
  {
    id: "icassp-2026",
    shortName: "ICASSP 2026",
    fullName: "International Conference on Acoustics, Speech and Signal Processing",
    fullNameJa: "音響・音声・信号処理国際会議",
    href: "https://2026.ieeeicassp.org/",
    type: "conference",
    tier: "core_b",
    submissionDeadline: "2025-09-17",
    notificationDate: "2026-01-22",
    conferenceStart: "2026-05-04",
    conferenceEnd: "2026-05-08",
    location: "Hyderabad, India",
    status: "rejected",
    statusDate: "2026-01-22",
  },
  {
    id: "rcis-2026",
    shortName: "RCIS 2026",
    fullName: "Research Challenges in Information Science",
    fullNameJa: "情報科学研究課題国際会議",
    href: "https://rcis-conf.com/rcis2026/",
    type: "conference",
    tier: "core_b",
    submissionDeadline: "2026-01-09",
    notificationDate: "2026-03-15",
    conferenceStart: "2026-05-19",
    conferenceEnd: "2026-05-22",
    location: "Brussels, Belgium",
    status: "rejected",
    statusDate: "2026-03-15",
  },
  {
    id: "ieice-2026",
    shortName: "IEICE Trans. 2026",
    fullName: "IEICE Transactions on Information and Systems",
    fullNameJa: "電子情報通信学会論文誌 D",
    href: "https://www.jstage.jst.go.jp/browse/transinf/",
    type: "journal",
    tier: "journal",
    submissionDeadline: "2026-02-01",
    status: "under_review",
    statusDate: "2026-02-01",
  },
  {
    id: "dpsws-2025",
    shortName: "DPSWS 2025",
    fullName: "Distributed Processing System Workshop",
    fullNameJa: "マルチメディア，分散，協調とモバイル (DICOMO) シンポジウム — DPSワークショップ",
    href: "https://www.dpsws.org/2025/",
    type: "workshop",
    tier: "domestic",
    submissionDeadline: "2025-09-15",
    conferenceStart: "2025-11-05",
    conferenceEnd: "2025-11-07",
    location: "Kochi, Japan",
    status: "presented",
    statusDate: "2025-11-05",
    paperTitle:
      "Representation Learning for Reducing Social Bias and Improving Gaussian-Noise Robustness in Large Vision-Language Models",
    paperTitleJa:
      "大規模視覚言語モデルの社会的バイアス軽減とガウシアンノイズ耐性向上に向けた表現学習手法",
  },
];

export const tierLabel: Record<PaperTier, string> = {
  core_a_star: "CORE A*",
  core_a: "CORE A",
  core_b: "CORE B",
  core_c: "CORE C",
  domestic: "Domestic",
  journal: "Journal",
};

export const tierLabelJa: Record<PaperTier, string> = {
  core_a_star: "CORE A*",
  core_a: "CORE A",
  core_b: "CORE B",
  core_c: "CORE C",
  domestic: "国内",
  journal: "論文誌",
};

export const statusLabel: Record<PaperStatus, string> = {
  under_review: "Under Review",
  accepted: "Accepted",
  rejected: "Rejected",
  presented: "Presented",
  submitted: "Submitted",
};

export const statusLabelJa: Record<PaperStatus, string> = {
  under_review: "査読中",
  accepted: "採択",
  rejected: "不採択",
  presented: "発表済",
  submitted: "投稿済",
};
