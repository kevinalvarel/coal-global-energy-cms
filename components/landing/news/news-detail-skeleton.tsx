import { Skeleton } from "@/components/ui/skeleton";
import { NewsCardSkeleton } from "./news-page-skeleton";

export default function NewsDetailSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6">
      {/* Back button */}
      <Skeleton className="h-5 w-48 bg-neutral-200 dark:bg-neutral-800" />

      {/* Header */}
      <header className="mt-6 space-y-4">
        {/* Title */}
        <div className="space-y-2.5">
          <Skeleton className="h-9 w-full rounded-lg bg-neutral-200 dark:bg-neutral-800 sm:h-11 lg:h-12" />
          <Skeleton className="h-9 w-3/4 rounded-lg bg-neutral-200 dark:bg-neutral-800 sm:h-11 lg:h-12" />
        </div>

        {/* Category & Date */}
        <div className="flex items-center gap-3 pt-1">
          <Skeleton className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800" />
          <span className="text-neutral-400">/</span>
          <Skeleton className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </header>

      {/* Hero Image */}
      <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
        <Skeleton className="h-full w-full rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {/* Article Content Card */}
      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs sm:p-10 dark:border-neutral-800 dark:bg-neutral-900">
        {/* Excerpt */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full bg-neutral-200 dark:bg-neutral-800" />
          <Skeleton className="h-5 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
        </div>

        <hr className="my-6 border-neutral-200 dark:border-neutral-800" />

        {/* Body Paragraphs */}
        <div className="space-y-6">
          <div className="space-y-2.5">
            <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-neutral-800" />
            <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-neutral-800" />
            <Skeleton className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800" />
            <Skeleton className="h-4 w-2/3 bg-neutral-200 dark:bg-neutral-800" />
          </div>

          <div className="space-y-2.5">
            <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-neutral-800" />
            <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-neutral-800" />
            <Skeleton className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
          </div>

          <div className="space-y-2.5">
            <Skeleton className="h-4 w-full bg-neutral-200 dark:bg-neutral-800" />
            <Skeleton className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      </div>

      {/* Related News Section */}
      <section className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#103984]/15 pb-4 dark:border-neutral-800">
          <Skeleton className="h-7 w-40 bg-neutral-200 dark:bg-neutral-800 sm:h-8" />
          <Skeleton className="h-5 w-36 bg-neutral-200 dark:bg-neutral-800" />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <NewsCardSkeleton />
          <NewsCardSkeleton />
        </div>
      </section>
    </div>
  );
}

