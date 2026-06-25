export type FundedProject = {
  id: string;
  date: string;
  status: string;
  statusJa: string;
  program: string;
  programJa: string;
  title: string;
  titleJa: string;
  href: string;
  summary: string;
  summaryJa: string;
  funding: {
    label: string;
    labelJa: string;
    value: string;
    valueJa: string;
  }[];
};

export const fundedProjects: FundedProject[] = [
  {
    id: "k2-spring-2027",
    date: "2026-02-09",
    status: "Selected",
    statusJa: "採択",
    program:
      "Kyushu University WISE Program for Sustainability in the Dynamic Earth (K2-SPRING)",
    programJa: "九州大学未来を拓く博士人財育成プログラム (K2-SPRING)",
    title: "Reiwa 9 (FY2027) candidate, Health-Tech Unit",
    titleJa: "令和9年度採用候補者（ヘルステックユニット）",
    href: "https://k-spring.kyushu-u.ac.jp/",
    summary:
      "Research support program for doctoral talent development at Kyushu University.",
    summaryJa: "九州大学における博士人材育成のための研究支援プログラム。",
    funding: [
      {
        label: "Research grant",
        labelJa: "研究助成金",
        value: "¥200,000 / month",
        valueJa: "月20万円",
      },
      {
        label: "Research budget",
        labelJa: "研究費",
        value: "¥350,000 / year",
        valueJa: "年間35万円",
      },
    ],
  },
  {
    id: "fukuoka-mitou-2026-pro",
    date: "2026-06-22",
    status: "Selected",
    statusJa: "採択",
    program: "Fukuoka Mitou 2026 Pro Course",
    programJa: "福岡未踏 2026 Pro コース",
    title: "LabAgent — Companion Local Agent Framework",
    titleJa: "LabAgent — 伴走ローカルエージェントフレームワーク",
    href: "https://mitou-fukuoka.org/",
    summary:
      "Development project for a local agent framework that continuously supports research and development workflows.",
    summaryJa:
      "研究・開発ワークフローに継続的に伴走するローカルエージェントフレームワークの開発プロジェクト。",
    funding: [
      {
        label: "Development support",
        labelJa: "開発支援金",
        value: "Up to ¥1,250,000",
        valueJa: "最大125万円",
      },
    ],
  },
];
