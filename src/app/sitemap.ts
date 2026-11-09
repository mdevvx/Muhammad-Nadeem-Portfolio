import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/health-check`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...["privacy", "terms", "cookies", "disclaimer"].map((p) => ({
      url: `${siteUrl}/${p}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
