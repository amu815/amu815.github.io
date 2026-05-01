import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";

const DESCRIPTION =
  "九州大学 修士2年、人間情報システム研究グループ所属。マルチモーダルAI・LLM基盤・人間中心の知的インタフェース研究。";

export const metadata: Metadata = {
  title: "末本歩夢 — Amu Suemoto",
  description: DESCRIPTION,
  alternates: {
    canonical: "/ja/",
    languages: {
      "en-US": "/",
      "ja-JP": "/ja/",
    },
  },
  openGraph: {
    title: "末本歩夢",
    description: DESCRIPTION,
    locale: "ja_JP",
    alternateLocale: ["en_US"],
    images: [{ url: "/profile.jpg", width: 1441, height: 1921 }],
  },
};

export default function Page() {
  return <HomePage lang="ja" />;
}
