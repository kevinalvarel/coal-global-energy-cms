import type { Metadata } from "next";
import HeroNews from "@/components/landing/news/hero-news";
import NewsGridSection from "@/components/landing/news/news-grid-section";
import { DUMMY_NEWS, getLatestNews } from "@/data/news-data";

export const metadata: Metadata = {
  title: "Berita & Informasi | PT. Coal Global Energy",
  description:
    "Berita operasional terbaru, artikel energi industri, edukasi tata niaga batubara, dan laporan mutu PT. Coal Global Energy.",
};

export default function NewsPage() {
  const latestNews = getLatestNews(4);

  return (
    <main className="min-h-screen bg-[#E5EAF0]/40 dark:bg-neutral-950">
      <HeroNews items={latestNews} />
      <NewsGridSection items={DUMMY_NEWS} />
    </main>
  );
}
