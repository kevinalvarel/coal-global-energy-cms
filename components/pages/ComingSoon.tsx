import Link from "next/link";

export function ComingSoon({ title }: { title: string }) {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-sm sm:text-base text-slate-600 dark:text-neutral-300">
        Halaman ini belum tersedia. Konten {title} sedang disiapkan.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
