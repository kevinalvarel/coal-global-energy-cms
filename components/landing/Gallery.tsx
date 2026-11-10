import AccordionGallery from "@/components/layouts/AccordionGallery";

const items = [
  {
    image: "/images/landing/gallery/operasional-1.jpeg",
    label: "Unloading Coal 1",
  },
  {
    image: "/images/landing/gallery/operasional-2.jpeg",
    label: "Unloading Coal 2",
  },
  {
    image: "/images/landing/gallery/office.jpeg",
    label: "Office",
  },
  {
    image: "/images/landing/gallery/operasional-4.png",
    label: "Stockpile",
  },
  {
    image: "/images/landing/gallery/operasional-5.jpeg",
    label: "Stockpile",
  },
];

export function GallerySection() {
  return (
    <section className="mx-auto max-w-7xl w-full relative py-24 md:py-32 overflow-hidden space-y-16 px-4">
      <div className="flex flex-col">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
          <span className="relative inline-block text-primary">GALLERY </span>{" "}
          PERUSAHAAN
        </h2>
        <p className="mt-3 text-sm md:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed">
          Dokumentasi Operasional milik PT Coal Global Energy
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
