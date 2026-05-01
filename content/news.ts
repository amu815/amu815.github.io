export type NewsItem = {
  date: string;
  textEn: string;
  textJa: string;
  href?: string;
  highlight?: boolean;
};

export const news: NewsItem[] = [
  {
    date: "2026-04-30",
    textEn: "Submitted a new paper to NeurIPS 2026.",
    textJa: "NeurIPS 2026 に新規論文を投稿しました。",
    href: "https://neurips.cc/Conferences/2026",
    highlight: true,
  },
  {
    date: "2026-04-25",
    textEn: "IJCAI 2026 — paper not accepted.",
    textJa: "IJCAI 2026 の査読結果が通知されました(不採択)。",
    href: "https://2026.ijcai.org/",
  },
  {
    date: "2026-04-15",
    textEn: "Submitted to ICMI 2026 — currently under review.",
    textJa: "ICMI 2026 に投稿し、査読中です。",
    href: "https://icmi.acm.org/",
  },
  {
    date: "2026-03-15",
    textEn: "RCIS 2026 — paper not accepted.",
    textJa: "RCIS 2026 の査読結果が通知されました(不採択)。",
    href: "https://rcis-conf.com/rcis2026/",
  },
  {
    date: "2026-02-01",
    textEn: "Journal manuscript submitted to IEICE Transactions on Information and Systems.",
    textJa: "電子情報通信学会論文誌 D に論文を投稿しました。",
    href: "https://www.jstage.jst.go.jp/browse/transinf/",
  },
  {
    date: "2026-01-22",
    textEn: "ICASSP 2026 — paper not accepted.",
    textJa: "ICASSP 2026 の査読結果が通知されました(不採択)。",
    href: "https://2026.ieeeicassp.org/",
  },
  {
    date: "2025-11-05",
    textEn:
      "Presented at DPSWS 2025 (Kochi) — Representation Learning for Reducing Social Bias and Improving Gaussian-Noise Robustness in Large Vision-Language Models.",
    textJa:
      "DPSWS 2025 (高知) にて発表「大規模視覚言語モデルの社会的バイアス軽減とガウシアンノイズ耐性向上に向けた表現学習手法」。",
    href: "https://www.dpsws.org/2025/?Program",
  },
];
