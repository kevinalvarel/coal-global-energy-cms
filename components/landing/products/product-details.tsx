"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/hooks/use-language";

const WHATSAPP_URL =
  "https://wa.me/6289504836618?text=" +
  encodeURIComponent(
    "Halo PT. Coal Global Energy, saya ingin menanyakan produk dan pasokan komoditas energi.",
  );

function SpecList({ specs, inverted }: { specs: string[]; inverted?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {specs.map((spec) => (
        <li
          key={spec}
          className={
            inverted
              ? "rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-white/85"
              : "rounded-md border border-border bg-muted px-2.5 py-1 text-xs text-foreground"
          }
        >
          {spec}
        </li>
      ))}
    </ul>
  );
}

export function ProductDetails() {
  const { t } = useLanguage();
  const { coal, pks, woodChip, stone } = t.products.items;
  const commodities = [pks, woodChip, stone];

  return (
    <>
      <section
        id="product-details"
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article className="lg:col-span-3 rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
                  {coal.tag ?? t.common.labels.coreCommodity}
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
                  {coal.name}
                  <span className="block mt-1 text-sm font-medium text-white/60">
                    {coal.alt}
                  </span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                  {coal.description}
                </p>
                <p className="mt-2 text-sm text-white/60">{coal.segment}</p>
                <p className="mt-4 text-sm text-white/70">{coal.note}</p>
              </div>

              <div className="lg:col-span-5">
                <p className="text-xs font-semibold tracking-wider uppercase text-white/60">
                  {coal.specsHeader}
                </p>
                <div className="mt-3">
                  <SpecList specs={coal.specs} inverted />
                </div>
              </div>
            </div>
          </article>

          {commodities.map((product) => (
            <article
              key={product.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-foreground">
                {product.name}
                <span className="block mt-1 text-sm font-medium text-slate-600 dark:text-neutral-400">
                  {product.alt}
                </span>
              </h2>
              <p className="mt-4 text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                {product.description}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-neutral-400">
                {product.segment}
              </p>

              <p className="mt-5 text-xs font-semibold tracking-wider uppercase text-slate-600 dark:text-neutral-400">
                {product.specsHeader}
              </p>
              <div className="mt-2">
                <SpecList specs={product.specs} />
              </div>
            </article>
          ))}
        </div>

        <section
          id="cta"
          className="w-full mt-16 md:mt-24 rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
                {t.products.cta.tag}
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">
                {t.products.cta.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                {t.products.cta.description}
              </p>
            </div>
            <div className="lg:col-span-4 flex items-center lg:justify-end">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-green-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1a33]"
              >
                <FaWhatsapp size={20} /> {t.products.cta.button}
              </a>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
