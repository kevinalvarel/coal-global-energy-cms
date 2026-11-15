import { Skeleton } from "@/components/ui/skeleton";

export function NewsHeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden pt-24 pb-10 text-white md:pt-28 md:pb-14">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(125%_125%_at_50%_10%,#fff_40%,var(--color-primary)_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,var(--color-primary)_100%)]" />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0C0C0C] shadow-sm">
          <div className="relative flex min-h-[470px] flex-col justify-between p-6 sm:min-h-[500px] sm:p-8 lg:min-h-[540px] lg:p-12">
            {/* Background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#06317F]/80 via-[#06317F]/60 to-[#0C0C0C]/40" />

            <div className="relative z-10 flex flex-1 items-end lg:items-center">
              <div className="w-full max-w-2xl space-y-4">
                {/* Category & Date badge */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-24 rounded-md bg-white/20" />
                  <span className="text-white/40">/</span>
                  <Skeleton className="h-5 w-32 rounded-md bg-white/20" />
                </div>

                {/* Title */}
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-10 w-full max-w-xl rounded-lg bg-white/25 sm:h-12" />
                  <Skeleton className="h-10 w-3/4 rounded-lg bg-white/25 sm:h-12" />
                </div>

                {/* Excerpt */}
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-4 w-full rounded bg-white/20" />
                  <Skeleton className="h-4 w-5/6 rounded bg-white/20" />
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Skeleton className="h-11 w-36 rounded-lg bg-white/90" />
                </div>
              </div>
            </div>

            {/* Bottom Controls bar */}
            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-2 w-8 rounded-full bg-[#0CC0DF]" />
                <Skeleton className="h-2 w-4 rounded-full bg-white/30" />
                <Skeleton className="h-2 w-4 rounded-full bg-white/30" />
                <Skeleton className="h-2 w-4 rounded-full bg-white/30" />
                <Skeleton className="ml-2 h-4 w-12 bg-white/20" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="size-11 rounded-lg bg-white/20" />
                <Skeleton className="size-11 rounded-lg bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
      {/* Thumbnail placeholder */}
      <Skeleton className="aspect-[16/10] w-full rounded-none bg-neutral-200 dark:bg-neutral-800" />

      <div className="flex flex-1 flex-col p-5">
        {/* Category / Date */}
        <div className="mb-3 flex items-center gap-2">
          <Skeleton className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800" />
          <span className="text-neutral-300 dark:text-neutral-700">/</span>
          <Skeleton className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full bg-neutral-200 dark:bg-neutral-800" />
          <Skeleton className="h-5 w-4/5 bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Excerpt */}
        <div className="mt-3 flex-1 space-y-1.5">
          <Skeleton className="h-3.5 w-full bg-neutral-200 dark:bg-neutral-800" />
          <Skeleton className="h-3.5 w-5/6 bg-neutral-200 dark:bg-neutral-800" />
          <Skeleton className="h-3.5 w-2/3 bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Action button */}
        <div className="mt-5 border-t border-neutral-100 pt-3 dark:border-neutral-800">
          <Skeleton className="h-5 w-28 bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}

export function NewsGridSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
      {/* Header */}
      <div className="flex flex-col gap-6 border-b border-[#103984]/15 pb-8 md:flex-row md:items-end md:justify-between dark:border-neutral-800">
        <div className="max-w-2xl space-y-2">
          <Skeleton className="h-8 w-64 bg-neutral-200 dark:bg-neutral-800 sm:h-9" />
          <Skeleton className="h-4 w-full max-w-lg bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <Skeleton className="h-5 w-36 bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {/* Category Filter Pills */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Skeleton className="h-10 w-20 rounded-lg bg-[#103984]/30" />
        <Skeleton className="h-10 w-20 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <Skeleton className="h-10 w-20 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <Skeleton className="h-10 w-20 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <Skeleton className="h-10 w-20 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {/* Grid of Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

export default function NewsPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#E5EAF0]/40 dark:bg-neutral-950">
      <NewsHeroSkeleton />
      <NewsGridSkeleton />
    </div>
  );
}

