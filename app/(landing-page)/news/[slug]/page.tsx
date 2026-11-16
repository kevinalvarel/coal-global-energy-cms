import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import {
  getPublishedContentBySlug,
  getPublishedContents,
} from "@/servers/content-services";
import NewsCard from "@/components/landing/news/news-card";
import NewsDetailSkeleton from "@/components/landing/news/news-detail-skeleton";
import type { PublishedPost } from "@/lib/news-query";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPublishedContentBySlug(slug);

  if (!result.success) {
    return { title: "Article Not Found" };
  }

  return {
    title: result.data.title,
    description: result.data.excerpt ?? undefined,
    openGraph: {
      title: result.data.title,
      description: result.data.excerpt ?? undefined,
      type: "article",
      publishedTime: result.data.createdAt?.toISOString(),
      images: result.data.imageUrl ? [result.data.imageUrl] : undefined,
    },
  };
}

async function NewsDetailContent({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const result = await getPublishedContentBySlug(slug);

  if (!result.success) {
    notFound();
  }

  const article = result.data;

  const relatedResult = await getPublishedContents({ limit: 3 });
  const relatedArticles: PublishedPost[] = relatedResult.success
    ? relatedResult.data.items
        .filter((item) => item.slug !== slug)
        .slice(0, 2)
        .map((item) => ({
          id: item.id,
          title: item.title,
          slug: item.slug,
          category: item.category,
          excerpt: item.excerpt,
          imageUrl: item.imageUrl,
          createdAt: item.createdAt.toISOString(),
        }))
    : [];

  const publishedDate = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(article.createdAt);

  const galleryPhotos = article.attachments.slice(1);

  return (
    <article className="mx-auto max-w-4xl px-4 md:px-6">
      <Link
        href="/news"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#103984] transition-colors hover:text-[#06317F] dark:text-[#0CC0DF] dark:hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Kembali ke Halaman Berita
      </Link>

      <header className="mt-6">
        <h1 className="text-[32px] leading-[1.15] font-bold tracking-tight text-[#06317F] sm:text-4xl lg:text-[42px] dark:text-white">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="font-semibold text-[#103984] dark:text-[#0CC0DF]">
            {article.category}
          </span>
          <span aria-hidden="true" className="text-neutral-400">
            •
          </span>
          <span className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
            <Calendar className="size-4" aria-hidden="true" />
            <time dateTime={article.createdAt.toISOString()}>
              {publishedDate}
            </time>
          </span>
        </div>
      </header>

      {article.imageUrl && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
          <Image
            src={article.imageUrl}
            alt={`Foto utama: ${article.title}`}
            width={1200}
            height={675}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 896px) 896px, 100vw"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs sm:p-10 dark:border-neutral-800 dark:bg-neutral-900">
        {article.excerpt && (
          <>
            <p className="text-base leading-relaxed font-medium text-[#06317F] sm:text-lg dark:text-neutral-100">
              {article.excerpt}
            </p>
            <hr className="my-6 border-neutral-200 dark:border-neutral-800" />
          </>
        )}

        <div
          className="prose prose-neutral max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      {galleryPhotos.length > 0 && (
        <section aria-labelledby="gallery-heading" className="mt-8">
          <h2
            id="gallery-heading"
            className="text-xl font-bold text-[#06317F] sm:text-2xl dark:text-white"
          >
            Galeri Foto
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {galleryPhotos.map((photo, index) => (
              <Image
                key={photo.url}
                src={photo.url}
                alt={`Foto ${index + 2}: ${article.title}`}
                width={480}
                height={480}
                sizes="(min-width: 640px) 30vw, 50vw"
                className="aspect-square w-full rounded-xl border border-neutral-200 object-cover dark:border-neutral-800"
              />
            ))}
          </div>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section
          aria-labelledby="related-news-heading"
          className="mx-auto mt-14 max-w-4xl px-4 md:px-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#103984]/15 pb-4 dark:border-neutral-800">
            <h2
              id="related-news-heading"
              className="text-xl font-bold text-[#06317F] sm:text-2xl dark:text-white"
            >
              Berita Terkait
            </h2>
            <Link
              href="/news"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#103984] hover:text-[#06317F] dark:text-[#0CC0DF] dark:hover:text-white"
            >
              Lihat Semua Berita
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {relatedArticles.map((item) => (
              <NewsCard key={item.slug} item={item} showExcerpt={false} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export default function NewsDetailPage({ params }: NewsDetailPageProps) {
  return (
    <main className="min-h-screen bg-[#E5EAF0]/40 pt-28 pb-16 dark:bg-neutral-950">
      <Suspense fallback={<NewsDetailSkeleton />}>
        <NewsDetailContent params={params} />
      </Suspense>
    </main>
  );
}
