import NewsDetailSkeleton from "@/components/landing/news/news-detail-skeleton";

export default function NewsDetailLoading() {
  return (
    <main className="min-h-screen bg-[#E5EAF0]/40 pt-28 pb-16 dark:bg-neutral-950">
      <NewsDetailSkeleton />
    </main>
  );
}

