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
  "Kyushu University M2, Humanophilic Systems Lab. Research on multimodal AI, large language model systems, and human-centered intelligent interfaces.";

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
    name: "Kyushu University — Humanophilic Systems Lab",
    url: "https://app.ait.kyushu-u.ac.jp/",
  },
  sameAs: [
    "https://github.com/amu815",
    "https://x.com/amu_Humano_Dev",
    "https://qiita.com/Humanophilic_development",
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
