import type { MetadataRoute } from "next";

const SITE = "https://amu815.github.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a date-only string so the value validates as W3C datetime
  // and stays stable within a build day.
  const lastModified = new Date().toISOString().slice(0, 10);
  return [
    {
      url: `${SITE}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "en-US": `${SITE}/`,
          "ja-JP": `${SITE}/ja/`,
        },
      },
    },
    {
      url: `${SITE}/ja/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          "en-US": `${SITE}/`,
          "ja-JP": `${SITE}/ja/`,
        },
      },
    },
  ];
}
