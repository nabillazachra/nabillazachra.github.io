import type { MetadataRoute } from "next";

import { getProjectSlugs } from "@/lib/content/get-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const slugs = await getProjectSlugs();

  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    ...slugs.map((slug) => ({
      url: `${baseUrl}/work/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
