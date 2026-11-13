import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/**
 * Halaman fallback saat slug berita tidak ditemukan pada data dummy.
 */
export default function NewsNotFound() {
  return (
    <main className="min-h-screen bg-[#E5EAF0]/40 pt-32 pb-20 dark:bg-neutral-950">
      <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-xs sm:p-12 dark:border-neutral-800 dark:bg-neutral-900">
          <h1 className="text-3xl font-bold tracking-tight text-[#06317F] sm:text-4xl dark:text-white">
            Berita Tidak Ditemukan
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-300">
            Artikel atau publikasi yang Anda cari tidak tersedia atau tautannya
            sudah berubah.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/news"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#103984] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#06317F]"
            >
              <ArrowLeft className="size-4" />
              Kembali ke Daftar Berita
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

