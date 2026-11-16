"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/hooks/use-language";

const CONTACT_EMAIL = "pt.coalglobalenergy@gmail.com";

const WHATSAPP_URL =
  "https://wa.me/6289504836618?text=" +
  encodeURIComponent(
    "Halo PT. Coal Global Energy, saya ingin berkonsultasi mengenai solusi pasokan untuk kebutuhan industri kami.",
  );

function rfqHref(sector: string) {
  const subject = `Permintaan Penawaran - ${sector} - PT. Coal Global Energy`;
  const body = [
    `Halo PT. Coal Global Energy, saya ingin meminta penawaran untuk kebutuhan sektor ${sector}.`,
    "",
    "Perusahaan:",
    "Nama PIC dan jabatan:",
    "Nomor WhatsApp:",
    "Email korporat:",
    "Komoditas yang dibutuhkan:",
    "Estimasi kebutuhan (MT/bulan):",
    "Spesifikasi yang dibutuhkan:",
    "Lokasi tujuan pengiriman:",
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const buttonClass =
  "inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

function ProductChips({
  products,
  inverted,
}: {
  products: string[];
  inverted?: boolean;
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {products.map((product) => (
        <li
          key={product}
          className={
            inverted
              ? "rounded-md border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white"
              : "rounded-md border border-border bg-muted px-2.5 py-1 text-xs text-foreground"
          }
        >
          {product}
        </li>
      ))}
    </ul>
  );
}

export function SolutionDetails() {
  const { t } = useLanguage();
  const { featured, sectors, cta } = t.solutions;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
      <section id="solution-details">
        <article className="rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
                {featured.tag}
              </p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
                {featured.sector}
              </h2>
              <p className="mt-2 text-sm text-white/80">{featured.segment}</p>
              <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                {featured.description}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/services"
                  className={`${buttonClass} border border-white/30 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-[#0b1a33]`}
                >
                  {featured.button}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
                {featured.needsTag}
              </p>
              <ul className="mt-3 space-y-3">
                {featured.needs.map((need) => (
                  <li
                    key={need}
                    className="text-sm text-white/80 leading-relaxed"
                  >
                    {need}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
                {featured.commoditiesTag}
              </p>
              <div className="mt-3">
                <ProductChips products={featured.products} inverted />
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="mt-20 md:mt-28">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            {sectors.headerTitle}
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
            {sectors.headerSubtitle}
          </p>
        </div>

        <ol className="mt-10 border-y border-border divide-y divide-border">
          {sectors.items.map((item, index) => (
            <li
              key={item.sector}
              className="grid grid-cols-[auto_1fr] gap-4 md:gap-8 py-6 md:py-8"
            >
              <span className="text-xl md:text-2xl font-bold tabular-nums text-primary">
                {String(index + 2).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base md:text-lg font-bold text-foreground">
                  {item.sector}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-neutral-400">
                  {item.segment}
                </p>
                <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4">
                  <ProductChips products={item.products} />
                </div>
                <a
                  href={rfqHref(item.sector)}
                  className="mt-5 inline-flex items-center rounded-md text-sm font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {item.cta}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="cta"
        className="mt-20 md:mt-28 rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {cta.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
              {cta.description}
            </p>
          </div>
          <div className="lg:col-span-4 flex items-center lg:justify-end">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 lg:mt-0 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-green-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1a33]"
            >
              <FaWhatsapp size={20} /> {cta.button}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
