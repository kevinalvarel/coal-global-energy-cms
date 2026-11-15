import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { post } from "@/db/schemas/content-schema";
import HeroNews from "@/components/landing/news/hero-news";
import NewsGridSection from "@/components/landing/news/news-grid-section";
import { NewsQueryProvider } from "@/components/landing/news/news-query-provider";
import type { NewsApiResponse, PublishedPost } from "@/app/api/news/route";

export const metadata: Metadata = {
  title: "Berita & Informasi | PT. Coal Global Energy",
  description:
    "Berita operasional terbaru, artikel energi industri, edukasi tata niaga batubara, dan laporan mutu PT. Coal Global Energy.",
};

async function getInitialNews(): Promise<NewsApiResponse> {
  const rows = await db
    .select({
      id: post.id,
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      createdAt: post.createdAt,
    })
    .from(post)
    .where(eq(post.status, "Publikasi"))
    .orderBy(desc(post.createdAt))
    .limit(50);

  const items: PublishedPost[] = rows.map((row) => ({
    ...row,
    createdAt: row.createdAt.toISOString(),
  }));

  return { items, total: items.length };
}

export default async function NewsPage() {
  const initialData = await getInitialNews();
  const heroItems = initialData.items.slice(0, 4);

  return (
    <NewsQueryProvider>
      <main className="min-h-screen bg-[#E5EAF0]/40 dark:bg-neutral-950">
        <HeroNews items={heroItems} />
        <NewsGridSection initialData={initialData} />
      </main>
    </NewsQueryProvider>
  );
}
