"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { mapLink } from "@/lib/map";
import { FaWhatsapp } from "react-icons/fa";
import JellyRadio from "@/components/react-bits/jelly-radio";
import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";

const WHATSAPP_STOCKPILE =
  "https://wa.me/6289504836618?text=" +
  encodeURIComponent(
    "Halo PT. Coal Global Energy, saya ingin menanyakan layanan stockpile di Bojonegara.",
  );

const WHATSAPP_BATU_BARA =
  "https://wa.me/6289504836618?text=" +
  encodeURIComponent(
    "Halo PT. Coal Global Energy, saya ingin menanyakan pembelian batu bara.",
  );

export function DetailServices() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"stockpile" | "batubara">("stockpile");

  const isStockpile = mode === "stockpile";
  const copy = isStockpile ? t.services.stockpile : t.services.coal;
  const whatsappUrl = isStockpile ? WHATSAPP_STOCKPILE : WHATSAPP_BATU_BARA;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        {/* Jelly Radio Toggle */}
        <div className="flex justify-center mb-12">
          <JellyRadio
            items={[
              { value: "stockpile", label: t.services.tabs.stockpile },
              { value: "batubara", label: t.services.tabs.coal },
            ]}
            defaultValue="stockpile"
            onChange={(value) => setMode(value as "stockpile" | "batubara")}
            chipColor="#0b1a33"
            activeColor="#003AF9"
            textColor="#94a3b8"
            activeTextColor="#ffffff"
            size="lg"
            gap={6}
            radius={12}
            swell={0.15}
            barge={4}
            shrink={0.03}
            jelly={1.2}
            bounce={0.3}
            stagger={18}
            stiffness={500}
          />
        </div>

        {/* Facility / Product Info Card */}
        <section
          id="detail-services"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
              {copy.tag}
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
              {copy.title}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
              {copy.description}
            </p>

            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {copy.facts.map((fact) => (
                <div key={fact.term}>
                  <dt className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
                    {fact.term}
                  </dt>
                  <dd className="mt-1.5 text-sm text-white/75 leading-relaxed">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-1 flex flex-col justify-center rounded-2xl bg-card text-center">
            {isStockpile ? (
              <Image
                src="/images/landing/hero.png"
                alt="Stockpile"
                className="rounded-2xl"
                height={500}
                width={500}
              />
            ) : (
              <Image
                src="/images/landing/gallery/coal.jpeg"
                alt="Stockpile"
                className="rounded-2xl"
                height={500}
                width={500}
              />
            )}
          </div>
        </section>

        {/* Advantages */}
        <section className="mt-20 md:mt-28">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {copy.advantagesTitle}
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
              {copy.advantagesSubtitle}
            </p>
          </div>

          <ol className="mt-10 border-y border-border divide-y divide-border">
            {copy.advantages.map((adv, index) => (
              <li
                key={adv.title}
                className="grid grid-cols-[auto_1fr] gap-4 md:gap-8 py-6 md:py-8"
              >
                <span className="text-xl md:text-2xl font-bold tabular-nums text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-foreground">
                    {adv.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Steps / Alur */}
        <section className="mt-20 md:mt-28 rounded-2xl bg-[#E5EAF0]/60 dark:bg-muted p-6 sm:p-8 md:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {copy.workflowTitle}
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
              {copy.workflowSubtitle}
            </p>
          </div>

          <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {copy.steps.map((step, index) => (
              <li
                key={step.label}
                className="rounded-xl border border-border bg-background p-5"
              >
                <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                  {t.common.labels.stage} {index + 1}
                </span>
                <p className="mt-2 text-base font-bold text-foreground">
                  {step.label}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Location / CTA */}
        <section
          id="cta"
          className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {isStockpile
                ? t.services.stockpile.cta.locationTitle
                : t.services.coal.cta.locationTitle}
            </h2>
            {isStockpile ? (
              <>
                <address className="not-italic mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {t.services.stockpile.cta.address
                    .split("\n")
                    .map((line, index) => (
                      <span key={`${line}-${index}`} className="block">
                        {line}
                      </span>
                    ))}
                </address>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {t.services.stockpile.cta.openMaps}
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </>
            ) : (
              <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                {t.services.coal.cta.description}
              </p>
            )}
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {copy.cta.cardTitle}
            </h2>
            <p className="mt-3 text-sm text-white/75 leading-relaxed">
              {copy.cta.cardDesc}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-green-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1a33]"
            >
              <FaWhatsapp size={20} /> {copy.cta.button}
            </a>
            <p className="mt-4 text-xs text-white/60">{copy.cta.hotline}</p>
          </div>
        </section>
      </div>
    </>
  );
}
