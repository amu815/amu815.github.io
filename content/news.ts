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
    textEn: "Decisions returned for IJCAI 2026.",
    textJa: "IJCAI 2026 の査読結果が通知されました。",
    href: "https://2026.ijcai.org/",
  },
  {
    date: "2026-04-15",
    textEn: "Submitted to ICMI 2026 — currently under review.",
    textJa: "ICMI 2026 に投稿し、査読中です。",
    href: "https://icmi.acm.org/",
  },
  {
    date: "2026-02-01",
    textEn: "Journal manuscript submitted to IEICE Transactions on Information and Systems.",
    textJa: "電子情報通信学会論文誌 D に論文を投稿しました。",
    href: "https://www.jstage.jst.go.jp/browse/transinf/",
  },
  {
    date: "2025-12-04",
    textEn: "Presented research at DPSWS 2025.",
    textJa: "DPSWS 2025 で研究発表を行いました。",
    href: "https://www.dpsws.org/2025/",
  },
];
