export type Award = {
  id: string;
  date: string;
  name: string;
  nameJa: string;
  venue: string;
  venueJa: string;
  href: string;
  title: string;
  authors: string[];
  affiliation: string;
  affiliationJa: string;
};

export const awards: Award[] = [
  {
    id: "dicomo-2026-excellent-presentation",
    date: "2026-06-26",
    name: "Excellent Presentation Award",
    nameJa: "優秀プレゼンテーション賞",
    venue: "DICOMO 2026 Symposium",
    venueJa: "マルチメディア，分散，協調とモバイル (DICOMO) 2026 シンポジウム",
    href: "https://dicomo.org/commendation/",
    title:
      "GRoFA: ノイズゲート付きアダプタによる公平でロバストな顔画像埋め込みの学習",
    authors: ["末本歩夢", "荒川豊", "峯恒憲"],
    affiliation: "Kyushu University Arakawa, Mine & Fukushima Laboratory",
    affiliationJa: "九州大学 荒川・峯・福嶋研究室",
  },
  {
    id: "dicomo-2026-night-technical-session",
    date: "2026-06-25",
    name: "1st Place, Night Technical Session",
    nameJa: "ナイトテクニカルセッション 優勝",
    venue: "DICOMO 2026 Symposium",
    venueJa: "マルチメディア，分散，協調とモバイル (DICOMO) 2026 シンポジウム",
    href: "https://dicomo.org/commendation/",
    title: "研究室環境における娯楽活動検知システムに対する回避手法の提案と評価",
    authors: [
      "平岡滉司",
      "谷澤健太",
      "末本歩夢",
      "畑倫平",
      "黒木瑞穂",
      "松田圭祐",
      "原田佳祐",
      "畑本悠希",
    ],
    affiliation: "Kyushu University Arakawa, Mine & Fukushima Laboratory",
    affiliationJa: "九州大学 荒川・峯・福嶋研究室",
  },
];
