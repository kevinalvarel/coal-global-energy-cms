"use client";

import AccordionGallery from "@/components/layouts/AccordionGallery";
import { useLanguage } from "@/hooks/use-language";

export function GallerySection() {
  const { t } = useLanguage();
  const labels = t.home.gallery.labels;

  const items = [
    {
      image: "/images/landing/gallery/operasional-1.jpeg",
      label: labels.loadingCoal,
    },
    {
      image: "/images/landing/gallery/operasional-2.jpeg",
      label: labels.unloadingCoal,
    },
    {
      image: "/images/landing/gallery/office.jpeg",
      label: labels.office,
    },
    {
      image: "/images/landing/gallery/operasional-4.png",
      label: labels.stockpile,
    },
    {
      image: "/images/landing/gallery/operasional-5.jpeg",
      label: labels.stockpile,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl w-full relative py-24 md:py-32 overflow-hidden space-y-16 px-4">
      <div className="flex flex-col">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
          <span className="relative inline-block text-primary">
            {t.home.gallery.titlePart1}{" "}
          </span>{" "}
          {t.home.gallery.titlePart2}
        </h2>
        <p className="mt-3 text-sm md:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed">
          {t.home.gallery.description}
        </p>
      </div>
      <div className="flex flex-row">
        <AccordionGallery
          items={items}
          defaultIndex={2}
          expandRatio={0.52}
          trigger="hover"
          accentColor="#ffffff"
          overlayColor="#060010"
          textColor="#ffffff"
          grayscale
          showLabels
          duration={0.6}
          ease="power3.out"
          parallax={0.5}
          tilt={8}
          stagger={0.06}
          height={460}
          gap={10}
          radius={16}
          orientation="horizontal"
        />
      </div>
    </section>
  );
}
