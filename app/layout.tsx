import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://amu815.github.io";
const TITLE = "Amu Suemoto / 末本歩夢 — Kyushu University, Humanophilic Systems Lab";
const SHORT_TITLE = "Amu Suemoto / 末本歩夢";
const DESCRIPTION =
  "Amu Suemoto (末本歩夢) — Kyushu University M2, Humanophilic Systems Lab (Arakawa-Mine-Fukushima). Trustworthy AI research: fairness and robustness of vision-language models, and mechanistic interpretability for safer small language models.";

// Replace the empty string with the verification code Google Search Console gives you
// (e.g. "google-site-verification=abc123..."). Until then, the meta tag is omitted.
const GOOGLE_SITE_VERIFICATION = "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s — Amu Suemoto" },
  description: DESCRIPTION,
  applicationName: SHORT_TITLE,
  authors: [{ name: "Amu Suemoto", url: SITE_URL }],
  creator: "Amu Suemoto",
  publisher: "Amu Suemoto",
  keywords: [
    "Amu Suemoto",
    "末本 歩夢",
    "末本歩夢",
    "すえもと あむ",
    "Kyushu University",
    "九州大学",
    "Humanophilic Systems Lab",
    "人間情報システム研究グループ",
    "荒川豊",
    "峯恒憲",
    "福嶋誠",
    "Vision-Language Models",
    "VLM",
    "Fairness",
    "Robustness",
    "LoRA",
    "Mechanistic Interpretability",
    "Sparse Autoencoders",
    "AI Safety",
    "BLIP",
    "FairFace",
    "UTKFace",
    "Pythia",
    "Qwen",
    "OLMo",
    "Trustworthy AI",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "ja-JP": "/ja/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: SHORT_TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SHORT_TITLE,
    type: "profile",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
    images: [{ url: "/profile.jpg", width: 1441, height: 1921, alt: "Amu Suemoto" }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@amu_Humano_Dev",
    title: SHORT_TITLE,
    description: DESCRIPTION,
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}#person`,
  name: "Amu Suemoto",
  givenName: "Amu",
  familyName: "Suemoto",
  alternateName: ["末本歩夢", "末本 歩夢", "すえもと あむ"],
  birthDate: "2003-02-18",
  nationality: "Japan",
  url: SITE_URL,
  image: `${SITE_URL}/profile.jpg`,
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Kyushu University — Humanophilic Systems Lab (Arakawa, Mine & Fukushima Lab)",
    url: "https://app.ait.kyushu-u.ac.jp/",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Yamaguchi University — Faculty of Engineering, Department of Computer Science and Systems Engineering",
      url: "https://www.csse.yamaguchi-u.ac.jp/",
    },
    {
      "@type": "HighSchool",
      name: "Hiroshima Municipal Funairi High School",
      url: "https://www.funairi-h.edu.city.hiroshima.jp/",
    },
  ],
  sameAs: [
    "https://github.com/amu815",
    "https://orcid.org/0009-0003-9824-837X",
    "https://www.linkedin.com/in/amu-suemoto-8a5257395/",
    "https://x.com/amu_Humano_Dev",
    "https://qiita.com/Humanophilic_development",
    "https://www.kaggle.com/amusuemotoarakawalab",
  ],
  jobTitle: "Graduate Researcher (M2)",
  knowsAbout: [
    "Vision-Language Models",
    "Algorithmic Fairness",
    "Robust Representation Learning",
    "Parameter-Efficient Fine-Tuning (LoRA)",
    "Mechanistic Interpretability",
    "Sparse Autoencoders",
    "AI Safety and Alignment",
  ],
  description: DESCRIPTION,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Amu Suemoto",
  alternateName: "末本歩夢",
  url: SITE_URL,
  inLanguage: ["en", "ja"],
  author: { "@id": `${SITE_URL}#person` },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "Amu Suemoto",
  url: SITE_URL,
  inLanguage: "en",
  mainEntity: { "@id": `${SITE_URL}#person` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
        />
      </body>
    </html>
  );
}
