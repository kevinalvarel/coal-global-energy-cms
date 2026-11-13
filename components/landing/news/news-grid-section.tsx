"use client";

import { useState } from "react";
import {
  POST_CATEGORIES,
  type PostCategory,
} from "@/validations/content-validations";
import NewsCard from "@/components/landing/news/news-card";
import { type NewsItem } from "@/components/landing/news/news-data";

type CategoryFilter = "Semua" | PostCategory;

const FILTER_OPTIONS: CategoryFilter[] = ["Semua", ...POST_CATEGORIES];

interface NewsGridSectionProps {
  items: NewsItem[];
}

export default function NewsGridSection({ items }: NewsGridSectionProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Semua");

  const filteredItems =
    selectedCategory === "Semua"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <section
      aria-labelledby="news-archive-heading"
      className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16"
    >
      <div className="flex flex-col gap-6 border-b border-[#103984]/15 pb-8 md:flex-row md:items-end md:justify-between dark:border-neutral-800">
        <div className="max-w-2xl">
          <h2
            id="news-archive-heading"
            className="text-2xl font-bold tracking-tight text-[#06317F] sm:text-3xl dark:text-white"
          >
            Arsip Berita & Publikasi
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-300">
            Informasi operasional, artikel industri energi, edukasi tata niaga,
            dan catatan pemeriksaan mutu PT. Coal Global Energy.
          </p>
        </div>

        <p
          aria-live="polite"
          className="text-sm font-medium text-neutral-600 dark:text-neutral-400"
        >
          Menampilkan {filteredItems.length} publikasi
        </p>
      </div>

      <div
        role="group"
        aria-label="Filter kategori berita"
        className="mt-6 flex flex-wrap items-center gap-2"
      >
        {FILTER_OPTIONS.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedCategory(category)}
              className={`inline-flex min-h-11 items-center rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#103984] ${
                isActive
                  ? "border-[#103984] bg-[#103984] text-white dark:border-white dark:bg-white dark:text-neutral-950"
                  : "border-neutral-200 bg-white text-[#0C0C0C] hover:border-[#103984]/40 hover:bg-[#E5EAF0]/60 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-700"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {filteredItems.length === 0 ? (
        <div className="mt-10 rounded-xl border border-neutral-200 bg-white px-6 py-12 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-base font-medium text-[#0C0C0C] dark:text-white">
            Belum ada publikasi pada kategori {selectedCategory}.
          </p>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            Pilih kategori lain atau tampilkan seluruh daftar berita yang
            tersedia.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory("Semua")}
            className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-[#103984] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#06317F]"
          >
            Tampilkan Semua Berita
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
