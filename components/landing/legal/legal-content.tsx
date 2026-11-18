"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/hooks/use-language";

const WHATSAPP_NUMBER = "6289504836618";

export function LegalContent() {
  const { t } = useLanguage();
  const copy = t.legal.inquiry;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(copy.whatsappMessage)}`;

  return (
    <main className="w-full pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24">
      <section
        id="cta"
        aria-labelledby="legal-heading"
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl bg-[#0b1a33] p-6 text-white sm:p-10 md:p-14">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
            {t.common.companyName}
          </p>

          <h1
            id="legal-heading"
            className="mt-3 text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            {copy.title}
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#c9d4e6] sm:text-base md:text-lg">
            {copy.description}
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#c9d4e6]">
            {copy.note}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-md bg-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 active:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              <span>{copy.ctaButton}</span>
            </a>

            <Link
              href="/"
              className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 active:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
            >
              {copy.backButton}
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-[#c9d4e6] sm:flex-row sm:items-center sm:gap-6">
            <span>
              {copy.hotlineLabel}:{" "}
              <span className="font-semibold text-white">
                {t.common.labels.hotlineNumber}
              </span>
            </span>
            <span>
              Email:{" "}
              <a
                href={`mailto:${t.common.labels.email}`}
                className="cursor-pointer rounded-sm font-semibold text-[#8ab4ff] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.common.labels.email}
              </a>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

