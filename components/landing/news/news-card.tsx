import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import {
  formatNewsDate,
  type NewsItem,
} from "@/components/landing/news/news-data";

interface NewsCardProps {
  item: NewsItem;
  showExcerpt?: boolean;
  sizes?: string;
}

/**
 * Kartu berita reusable untuk daftar publikasi dan bagian berita terkait.
 */
export default function NewsCard({
  item,
  showExcerpt = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: NewsCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs transition-colors hover:border-[#103984]/40 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">
      <Link
        href={`/news/${item.slug}`}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-[#E5EAF0] dark:bg-neutral-800"
      >
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs">
          <span className="font-semibold text-[#103984] dark:text-[#0CC0DF]">
            {item.category}
          </span>
          <span
            aria-hidden="true"
            className="text-neutral-300 dark:text-neutral-600"
          >
            /
          </span>
          <time
            dateTime={item.publishedAt}
            className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400"
          >
            <Calendar className="size-3.5" />
            {formatNewsDate(item.publishedAt)}
          </time>
        </div>

        <h3 className="text-lg leading-snug font-semibold text-[#0C0C0C] dark:text-white">
          <Link
            href={`/news/${item.slug}`}
            className="line-clamp-2 transition-colors hover:text-[#103984] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103984] dark:hover:text-[#0CC0DF]"
          >
            {item.title}
          </Link>
        </h3>

        {showExcerpt ? (
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-neutral-600 line-clamp-3 dark:text-neutral-300">
            {item.excerpt}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        <div className="mt-5 border-t border-neutral-100 pt-3 dark:border-neutral-800">
          <Link
            href={`/news/${item.slug}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#103984] transition-colors hover:text-[#06317F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103984] dark:text-[#0CC0DF] dark:hover:text-white"
          >
            Baca Artikel
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

