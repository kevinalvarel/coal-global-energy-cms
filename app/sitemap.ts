import type { MetadataRoute } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { post } from "@/db/schemas/content-schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? process.env.NEXT_PUBLIC_BASE_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_BASE_URL
      : `https://${process.env.NEXT_PUBLIC_BASE_URL}`
    : "https://coalglobalenergy.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/solution`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/legal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const publishedPosts = await db
      .select({
        slug: post.slug,
        updatedAt: post.updatedAt,
      })
      .from(post)
      .where(eq(post.status, "Publikasi"));

    const dynamicNewsRoutes: MetadataRoute.Sitemap = publishedPosts.map(
      (item) => ({
        url: `${siteUrl}/news/${item.slug}`,
        lastModified: item.updatedAt ? new Date(item.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      }),
    );

    return [...staticRoutes, ...dynamicNewsRoutes];
  } catch {
    return staticRoutes;
  }
}

