import { Anchor, ExternalLink, MapPin, Truck } from "lucide-react";
import { addressLines, mapLink, mapSrc } from "@/lib/map";

const accessPoints = [
  {
    icon: Anchor,
    title: "Akses Laut",
    desc: "Berada di pesisir Selat Sunda, mendukung bongkar muat tongkang dan distribusi antar-pulau.",
  },
  {
    icon: Truck,
    title: "Akses Darat",
    desc: "Terhubung dengan jaringan jalan lintas menuju kawasan industri Cilegon dan sekitarnya.",
  },
];

export function LocationSection() {
  return (
    <section id="lokasi" className="relative w-full py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
            Lokasi{" "}
            <span className="relative inline-block text-primary">
              Strategis{" "}
              <svg
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 left-0 w-full"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9 C30 3, 60 11, 100 6 C140 1, 165 10, 198 5"
                  stroke="#0152cb"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M5 9.5 C40 5, 80 10, 120 7 C155 4, 180 8.5, 196 7"
                  stroke="#0152cb"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
            </span>{" "}
            di Jalur Distribusi Bojonegara
          </h2>
          <p className="mt-5 text-sm md:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed">
            Fasilitas stockpile PT. Coal Global Energy berada di kawasan
            pelabuhan Bojonegara, Serang, Banten, pada jalur distribusi Selat
            Sunda.
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
                    Alamat Operasional
                  </h3>
                  <address className="not-italic mt-2 text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                    Kawasan Pelabuhan Bojonegara
                    <br />
                    Serang, Banten
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
                Buka di Google Maps
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
