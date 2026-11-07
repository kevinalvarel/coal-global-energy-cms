import type { Metadata } from "next";
import Link from "next/link";
import HeroSolutions from "@/components/landing/solutions/hero-solutions";

export const metadata: Metadata = {
  title: "Solusi per Sektor Industri | PT Coal Global Energy",
  description:
    "Solusi pasokan batu bara, cangkang sawit, wood chip, dan batu split untuk pembangkit listrik, manufaktur, biomassa, pulp dan kertas, serta konstruksi, didukung stockpile Bojonegara.",
};

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

const featured = {
  sector: "Pembangkit Listrik & Energi",
  segment: "PLTU dan industri energi",
  description:
    "Pasokan batu bara dari tambang berizin untuk kebutuhan pembangkit, dengan opsi cangkang sawit untuk program co-firing. Setiap pengiriman batu bara dilengkapi SKAB resmi dari pemegang IUP-OP.",
  needs: [
    "Pasokan batu bara yang stabil untuk kebutuhan operasi pembangkit.",
    "Opsi biomassa untuk program co-firing dan uji campuran bahan bakar.",
    "Titik penyimpanan sementara sebelum material didistribusikan.",
  ],
  products: ["Batu Bara", "Cangkang Sawit", "Stockpile Bojonegara"],
};

const sectors = [
  {
    sector: "Manufaktur & Industri Berat",
    segment: "Tekstil, semen, kimia, kertas, dan smelter",
    description:
      "Batu bara untuk kebutuhan boiler, kiln, dan proses produksi. Spesifikasi kalori, moisture, ash, dan sulfur dikonfirmasi per pengiriman melalui COA.",
    products: ["Batu Bara"],
  },
  {
    sector: "Biomassa & Co-firing",
    segment: "Boiler biomassa industri dan program co-firing PLTU",
    description:
      "Cangkang sawit dan wood chip sebagai bahan bakar biomassa. Parameter nilai kalor, moisture, dan kapasitas suplai dibahas langsung saat permintaan penawaran.",
    products: ["Cangkang Sawit", "Wood Chip"],
  },
  {
    sector: "Pulp, Kertas & Pengolahan Kayu",
    segment:
      "Pabrik pulp dan kertas, boiler biomassa, industri pengolahan kayu",
    description:
      "Wood chip untuk kebutuhan pabrik pulp dan kertas, dengan batu bara sebagai opsi bahan bakar pendukung operasi.",
    products: ["Wood Chip", "Batu Bara"],
  },
  {
    sector: "Konstruksi & Infrastruktur",
    segment:
      "Kontraktor infrastruktur, batching plant, proyek jalan dan pelabuhan",
    description:
      "Batu split dalam beberapa fraksi untuk batching plant beton, pekerjaan jalan, dan proyek pelabuhan, dengan pengiriman truk atau tongkang sesuai kebutuhan.",
    products: ["Batu Split"],
  },
];

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

export default function SolutionPage() {
  return (
    <main className="w-full pb-24">
      <HeroSolutions />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        <section>
          <article className="rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
                  Sektor prioritas
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
                  {featured.sector}
                </h2>
                <p className="mt-2 text-sm text-white/80">
                  Untuk {featured.segment}.
                </p>
                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
                  {featured.description}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={rfqHref(featured.sector)}
                    className={`${buttonClass} bg-[#0CC0DF] text-[#06317F] hover:bg-[#0CC0DF]/90 focus-visible:ring-[#0CC0DF] focus-visible:ring-offset-[#0b1a33]`}
                  >
                    Minta Penawaran Pembangkit
                  </a>
                  <Link
                    href="/services"
                    className={`${buttonClass} border border-white/30 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-[#0b1a33]`}
                  >
                    Lihat Layanan Stockpile
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
                  Kebutuhan yang dibantu
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
                  Komoditas terkait
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
              Sektor lain yang dilayani
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
              Pilih sektor yang paling dekat dengan operasi Anda. Komoditas dan
              spesifikasi akan dibahas pada tahap permintaan penawaran.
            </p>
          </div>

          <ol className="mt-10 border-y border-border divide-y divide-border">
            {sectors.map((item, index) => (
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
                    Diskusikan kebutuhan {item.sector}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 md:mt-28 rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Belum yakin komoditas mana yang cocok?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                Sampaikan sektor, volume per bulan, dan lokasi tujuan
                pengiriman. Tim kami akan mencocokkan komoditas, spesifikasi,
                dan jalur distribusi yang sesuai.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass} bg-[#0CC0DF] text-[#06317F] hover:bg-[#0CC0DF]/90 focus-visible:ring-[#0CC0DF] focus-visible:ring-offset-[#0b1a33]`}
              >
                Konsultasi via WhatsApp
              </a>
              <a
                href={rfqHref("Konsultasi Solusi")}
                className={`${buttonClass} border border-white/30 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-[#0b1a33]`}
              >
                Kirim Permintaan Penawaran
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
