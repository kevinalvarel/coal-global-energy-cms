import type { Metadata } from "next";
import HeroProducts from "@/components/landing/products/hero-products";

export const metadata: Metadata = {
  title: "Produk & Komoditas | PT Coal Global Energy",
  description:
    "Batu bara, cangkang sawit, wood chip, dan batu split dari PT. Coal Global Energy, didukung fasilitas stockpile di Bojonegara, Banten.",
};

const CONTACT_EMAIL = "pt.coalglobalenergy@gmail.com";

function rfqHref(kind: string, product: string) {
  const subject = `${kind} ${product} - PT. Coal Global Energy`;
  const body = [
    `Halo PT. Coal Global Energy, saya ingin meminta ${kind.toLowerCase()} ${product}.`,
    "",
    "Perusahaan:",
    "Nama PIC dan jabatan:",
    "Nomor WhatsApp:",
    "Email korporat:",
    "Estimasi kebutuhan (MT/bulan):",
    "Spesifikasi yang dibutuhkan:",
    "Lokasi tujuan pengiriman:",
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const products = [
  {
    name: "Batu Bara",
    alt: "Steam / Thermal Coal",
    segment:
      "PLTU, pabrik tekstil, smelter, pabrik semen, industri kimia dan kertas",
    description:
      "Batu bara untuk kebutuhan pembangkit dan industri, bersumber dari tambang berizin.",
    specs: [
      "Kalori GAR / ADB",
      "Total Moisture (TM)",
      "Inherent Moisture (IM)",
      "Ash Content",
      "Total Sulfur",
      "Ukuran 0-50 mm / crushed",
      "Asal tambang",
    ],
    note: "Setiap pengiriman batu bara dilengkapi SKAB resmi dari pemegang IUP-OP.",
    cta: "Minta COA & Harga Batu Bara",
  },
  {
    name: "Cangkang Sawit",
    alt: "Palm Kernel Shell (PKS)",
    segment:
      "Boiler biomassa industri, program co-firing PLTU, ekspor energi hijau",
    description:
      "Bahan bakar biomassa untuk boiler industri dan program co-firing pembangkit.",
    specs: [
      "Nilai kalor (kcal/kg)",
      "Moisture",
      "Ash",
      "Kemurnian / bebas kontaminan",
      "Kapasitas suplai bulanan",
    ],
    cta: "Minta Penawaran Cangkang Sawit",
  },
  {
    name: "Wood Chip",
    alt: "Serpihan Kayu Industri",
    segment:
      "Pabrik pulp dan kertas, boiler biomassa, industri pengolahan kayu",
    description:
      "Serpihan kayu untuk pabrik pulp dan kertas serta boiler biomassa.",
    specs: [
      "Chip size distribution",
      "Moisture content",
      "Nilai kalor",
      "Jenis kayu",
      "Metode pengiriman (curah / jumbo bag)",
    ],
    cta: "Minta Penawaran Wood Chip",
  },
  {
    name: "Batu Split",
    alt: "Crushed Stone Aggregate",
    segment:
      "Kontraktor infrastruktur, batching plant beton, proyek jalan dan pelabuhan",
    description:
      "Agregat untuk batching plant, proyek jalan, dan infrastruktur pelabuhan.",
    specs: [
      "Ukuran fraksi (Split 1-2, Split 2-3, abu batu, basecourse)",
      "Abrasi",
      "Kapasitas pengiriman truk / tongkang",
    ],
    cta: "Minta Penawaran Batu Split",
  },
];

const buttonClass =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

function SpecList({
  specs,
  inverted,
}: {
  specs: string[];
  inverted?: boolean;
}) {
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

export default function ProductPage() {
  const [coal, ...commodities] = products;

  return (
    <main className="w-full pb-24">
      <HeroProducts />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <article className="lg:col-span-3 rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
                  Komoditas Utama
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
                <p className="mt-2 text-sm text-white/60">
                  Untuk {coal.segment}.
                </p>
                <p className="mt-4 text-sm text-white/70">{coal.note}</p>
                <a
                  href={rfqHref("COA & Harga", coal.name)}
                  className={`${buttonClass} mt-6 w-full sm:w-auto bg-[#0CC0DF] text-[#06317F] hover:bg-[#0CC0DF]/90 focus-visible:ring-[#0CC0DF]`}
                >
                  {coal.cta}
                </a>
              </div>

              <div className="lg:col-span-5">
                <p className="text-xs font-semibold tracking-wider uppercase text-white/60">
                  Parameter spesifikasi
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
                Untuk {product.segment}.
              </p>

              <p className="mt-5 text-xs font-semibold tracking-wider uppercase text-slate-600 dark:text-neutral-400">
                Parameter spesifikasi
              </p>
              <div className="mt-2">
                <SpecList specs={product.specs} />
              </div>

              <a
                href={rfqHref("Penawaran", product.name)}
                className={`${buttonClass} mt-6 border border-border bg-background text-foreground hover:bg-muted focus-visible:ring-ring`}
              >
                {product.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
