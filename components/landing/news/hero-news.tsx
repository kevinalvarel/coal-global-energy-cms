"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { formatNewsDate, getLatestNews, type NewsItem } from "@/data/news-data";

interface HeroNewsProps {
  items?: NewsItem[];
}

export default function HeroNews({ items }: HeroNewsProps) {
  const slides = items && items.length > 0 ? items : getLatestNews(4);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  if (slides.length === 0) {
    return null;
  }

  const safeIndex = activeIndex % slides.length;
  const activeSlide = slides[safeIndex];
  const slideCounter = `${String(safeIndex + 1).padStart(2, "0")} / ${String(
    slides.length,
  ).padStart(2, "0")}`;

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Berita terbaru PT. Coal Global Energy"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full overflow-hidden pt-24 pb-10 text-white focus:outline-none md:pt-28 md:pb-14"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(125%_125%_at_50%_10%,#fff_40%,var(--color-primary)_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,var(--color-primary)_100%)]" />
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0C0C0C] shadow-sm">
          <div className="relative min-h-[470px] sm:min-h-[500px] lg:min-h-[540px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlide.slug}
                initial={prefersReducedMotion ? false : { opacity: 0.35 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0.35 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.28,
                  ease: "easeOut",
                }}
                className="absolute inset-0"
              >
                <Image
                  src={activeSlide.imageUrl}
                  alt={activeSlide.imageAlt}
                  fill
                  priority={safeIndex === 0}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/95 via-[#06317F]/85 to-[#06317F]/40 lg:bg-gradient-to-r lg:from-[#06317F]/95 lg:via-[#06317F]/80 lg:to-[#0C0C0C]/35"
                />
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 flex min-h-[470px] flex-col justify-between p-6 sm:min-h-[500px] sm:p-8 lg:min-h-[540px] lg:p-12">
              <div className="flex flex-1 items-end lg:items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeSlide.slug}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion ? undefined : { opacity: 0, y: -8 }
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.26,
                      ease: "easeOut",
                    }}
                    className="max-w-2xl"
                  >
                    <h1 className="font-sans text-[34px] leading-[1.12] font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                      {activeSlide.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#E5EAF0]">
                      <span className="font-semibold text-[#0CC0DF]">
                        {activeSlide.category}
                      </span>
                      <span aria-hidden="true" className="text-white/40">
                        /
                      </span>
                      <time
                        dateTime={activeSlide.publishedAt}
                        className="inline-flex items-center gap-1.5 text-[#E5EAF0]/90"
                      >
                        <Calendar className="size-3.5 text-[#0CC0DF]" />
                        {formatNewsDate(activeSlide.publishedAt)}
                      </time>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-[#E5EAF0]/90 sm:text-base">
                      {activeSlide.excerpt}
                    </p>

                    <div className="mt-6">
                      <Link
                        href={`/news/${activeSlide.slug}`}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#06317F] transition-colors hover:bg-[#E5EAF0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0CC0DF]"
                      >
                        Baca Berita
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div
                    role="group"
                    aria-label="Pilih slide berita terbaru"
                    className="flex items-center gap-1"
                  >
                    {slides.map((slide, index) => {
                      const isActive = index === safeIndex;
                      return (
                        <button
                          key={slide.slug}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          aria-label={`Tampilkan berita ${index + 1}: ${slide.title}`}
                          aria-current={isActive ? "true" : undefined}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-1 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0CC0DF]"
                        >
                          <span
                            className={`block h-1.5 rounded-full transition-all duration-200 ${
                              isActive
                                ? "w-8 bg-[#0CC0DF]"
                                : "w-4 bg-white/35 hover:bg-white/60"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span
                    aria-live="polite"
                    className="ml-2 font-mono text-xs font-medium tracking-wider text-[#E5EAF0]/80"
                  >
                    {slideCounter}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    aria-label="Berita sebelumnya"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/25 bg-[#06317F]/75 text-white transition-colors hover:bg-white hover:text-[#06317F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0CC0DF]"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    aria-label="Berita berikutnya"
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/25 bg-[#06317F]/75 text-white transition-colors hover:bg-white hover:text-[#06317F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0CC0DF]"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
