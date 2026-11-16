"use client";

import { Anchor, ExternalLink, MapPin, Truck } from "lucide-react";
import { addressLines, mapLink, mapSrc } from "@/lib/map";
import { useLanguage } from "@/hooks/use-language";

export function LocationSection() {
  const { t } = useLanguage();

  const accessPoints = [
    { icon: Anchor, ...t.home.location.accessPoints[0] },
    { icon: Truck, ...t.home.location.accessPoints[1] },
  ];

  return (
    <section id="lokasi" className="relative w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
            {t.home.location.titlePart1}{" "}
            <span className="relative inline-block text-primary">
              {t.home.location.titleHighlight}{" "}
            </span>{" "}
            {t.home.location.titlePart2}
          </h2>
          <p className="mt-5 text-sm md:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed">
            {t.home.location.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-border bg-card">
            <iframe
              title="Peta lokasi stockpile PT. Coal Global Energy di Bojonegara, Serang, Banten"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[320px] sm:h-[420px] lg:h-full min-h-[420px] border-0"
            />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {t.home.location.operationalAddressTitle}
                  </h3>
                  <address className="not-italic mt-2 text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                    {t.home.location.area}
                    <br />
                    {t.home.location.region}
                    <br />
                    <span className="text-xs text-slate-600 dark:text-neutral-300">
                      {addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </span>
                  </address>
                </div>
              </div>

              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                {t.home.location.openMaps}
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-card divide-y divide-border">
              {accessPoints.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 p-6 sm:p-8">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
