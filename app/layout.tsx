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
const TITLE = "Amu Suemoto — 末本歩夢";
const DESCRIPTION =
  "Kyushu University M2, Humanophilic Systems Lab. Research on trustworthy AI: fairness and robustness of vision-language models, and mechanistic interpretability for safer small language models.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "ja-JP": "/ja/",
    },
  },
  openGraph: {
    title: "Amu Suemoto",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Amu Suemoto",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ja_JP"],
    images: [{ url: "/profile.jpg", width: 1441, height: 1921 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@amu_Humano_Dev",
    title: "Amu Suemoto",
    description: DESCRIPTION,
    images: ["/profile.jpg"],
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amu Suemoto",
  alternateName: "末本歩夢",
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
      url: "https://www.yamaguchi-u.ac.jp/",
    },
    {
      "@type": "HighSchool",
      name: "Hiroshima Municipal Funairi High School",
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
  description: DESCRIPTION,
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
      </body>
    </html>
  );
}
