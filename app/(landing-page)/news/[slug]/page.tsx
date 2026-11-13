import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import NewsCard from "@/components/landing/news/news-card";
import {
  DUMMY_NEWS,
  formatNewsDate,
  getNewsBySlug,
  getRelatedNews,
} from "@/components/landing/news/news-data";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Menghasilkan parameter statis slug berita sementara untuk halaman detail.
 */
export async function generateStaticParams() {
  return DUMMY_NEWS.map((item) => ({
    slug: item.slug,
  }));
}

/**
 * Menghasilkan metadata halaman detail berita sesuai slug aktif.
 */
export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    return {
      title: "Berita Tidak Ditemukan | PT. Coal Global Energy",
    };
  }

  return {
    title: `${article.title} | PT. Coal Global Energy`,
    description: article.excerpt,
  };
}

/**
 * Halaman detail artikel/berita berdasarkan slug.
 */
export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedNews(article.slug, 2);

  return (
    <main className="min-h-screen bg-[#E5EAF0]/40 pt-28 pb-16 dark:bg-neutral-950">
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
              /
            </span>
            <time
              dateTime={article.publishedAt}
              className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400"
            >
              <Calendar className="size-4" />
              {formatNewsDate(article.publishedAt)}
            </time>
          </div>
        </header>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-[#E5EAF0] dark:border-neutral-800 dark:bg-neutral-900">
          <Image
            src={article.imageUrl}
            alt={article.imageAlt}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs sm:p-10 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-base leading-relaxed font-medium text-[#06317F] sm:text-lg dark:text-neutral-100">
            {article.excerpt}
          </p>

          <hr className="my-6 border-neutral-200 dark:border-neutral-800" />

          <div className="space-y-5 text-base leading-relaxed text-[#0C0C0C]/90 dark:text-neutral-300">
            {article.content.map((paragraph, index) => (
              <p key={`${article.slug}-p-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

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
              <NewsCard
                key={item.slug}
                item={item}
                showExcerpt={false}
                sizes="(max-width: 768px) 100vw, 440px"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
