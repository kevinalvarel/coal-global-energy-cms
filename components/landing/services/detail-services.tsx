"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { mapLink } from "@/lib/map";
import { FaWhatsapp } from "react-icons/fa";
import JellyRadio from "@/components/react-bits/jelly-radio";

interface FacilityFact {
  term: string;
  value: string;
}

interface Advantage {
  title: string;
  description: string;
}

interface Step {
  label: string;
  detail: string;
}

interface DetailServicesProps {
  facilityFacts: FacilityFact[];
  advantages: Advantage[];
  steps: Step[];
}

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

// --- Data Jual Beli Batu Bara ---
const batuBaraFacts: FacilityFact[] = [
  {
    term: "Asal Tambang",
    value: "Tambang berizin (IUP-OP) di Jambi, Sumatera, dan Kalimantan.",
  },
  {
    term: "Dokumen",
    value: "Setiap pengiriman dilengkapi SKAB resmi dari pemegang IUP-OP.",
  },
  {
    term: "Spesifikasi",
    value:
      "Kalori GAR/ADB, Moisture, Ash Content, Total Sulfur, ukuran 0–50 mm.",
  },
  {
    term: "Target Pasar",
    value: "Industri domestik, Asia Tenggara, dan pasar ekspor global.",
  },
];

const batuBaraAdvantages: Advantage[] = [
  {
    title: "Sumber dari Tambang Berizin",
    description:
      "Batu bara bersumber langsung dari mitra tambang pemegang IUP-OP yang telah terverifikasi, termasuk PT. Anugerah Mining Persada di Kabupaten Bungo, Jambi.",
  },
  {
    title: "Dilengkapi SKAB Resmi",
    description:
      "Setiap pengiriman disertai Surat Keterangan Asal Batubara (SKAB) resmi sebagai jaminan legalitas rantai pasok dari tambang ke tangan pembeli.",
  },
  {
    title: "Spesifikasi Teknis Tersedia",
    description:
      "COA (Certificate of Analysis) tersedia atas permintaan, mencakup parameter kalori GAR/ADB, moisture, ash content, total sulfur, dan ukuran butir.",
  },
  {
    title: "Pasokan Berkesinambungan",
    description:
      "Didukung jaringan tambang dan fasilitas stockpile Bojonegara, pasokan dapat dijaga konsistensinya untuk kebutuhan industri jangka panjang.",
  },
  {
    title: "Fleksibel untuk Ekspor",
    description:
      "Memiliki akses distribusi ke pelabuhan Bojonegara untuk pengiriman ke pasar Asia Tenggara dan internasional sesuai permintaan pembeli.",
  },
];

const batuBaraSteps: Step[] = [
  {
    label: "Permintaan & Spesifikasi",
    detail:
      "Buyer menyampaikan kebutuhan kalori, volume, dan tujuan pengiriman",
  },
  {
    label: "COA & Penawaran Harga",
    detail: "Tim kami mengirimkan Certificate of Analysis dan penawaran harga",
  },
  {
    label: "Konfirmasi & Kontrak",
    detail: "Kesepakatan volume, jadwal, dan skema pembayaran",
  },
  {
    label: "Pengiriman & SKAB",
    detail: "Batu bara dikirim dengan SKAB resmi dari pemegang IUP-OP",
  },
];

export function DetailServices({
  facilityFacts,
  advantages,
  steps,
}: DetailServicesProps) {
  const [mode, setMode] = useState<"stockpile" | "batubara">("stockpile");

  const isStockpile = mode === "stockpile";

  const displayFacts = isStockpile ? facilityFacts : batuBaraFacts;
  const displayAdvantages = isStockpile ? advantages : batuBaraAdvantages;
  const displaySteps = isStockpile ? steps : batuBaraSteps;
  const whatsappUrl = isStockpile ? WHATSAPP_STOCKPILE : WHATSAPP_BATU_BARA;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        {/* Jelly Radio Toggle */}
        <div className="flex justify-center mb-12">
          <JellyRadio
            items={[
              { value: "stockpile", label: "Stockpiling Services" },
              { value: "batubara", label: "Jual Beli Batu Bara" },
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
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
              {isStockpile ? "Fasilitas" : "Komoditas"}
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
              {isStockpile
                ? "Stockpile Bojonegara, Banten"
                : "Batu Bara — Steam & Thermal Coal"}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
              {isStockpile
                ? "Fasilitas berada di Jl. Raya Bojonegara No. 04 Kp. Pangsoran RT.002/RW.007, Desa Bojonegara, Kecamatan Bojonegara, Kabupaten Serang, Banten 42454."
                : "Penyediaan batu bara untuk kebutuhan pembangkit dan industri — PLTU, pabrik tekstil, smelter, pabrik semen, industri kimia dan kertas — bersumber dari tambang berizin di Indonesia."}
            </p>

            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {displayFacts.map((fact) => (
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

          <div className="lg:col-span-1 flex flex-col justify-center rounded-2xl border-2 border-dashed border-border bg-card p-6 sm:p-8 text-center">
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-600 dark:text-neutral-400">
              {isStockpile
                ? "[FOTO FASILITAS MENYUSUL]"
                : "[FOTO KOMODITAS MENYUSUL]"}
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
              {isStockpile
                ? "Foto asli area stockpile Bojonegara akan ditampilkan setelah dokumentasi dan data kapasitas dikonfirmasi perusahaan."
                : "Foto dokumentasi tumpukan batu bara dan aktivitas distribusi akan ditampilkan setelah dikonfirmasi perusahaan."}
            </p>
          </div>
        </section>

        {/* Advantages */}
        <section className="mt-20 md:mt-28">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              {isStockpile
                ? "Lima keunggulan fasilitas"
                : "Lima keunggulan layanan"}
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
              {isStockpile
                ? "Setiap bagian fasilitas dirancang untuk menjaga mutu material dan kelancaran alur distribusi."
                : "Proses jual beli yang transparan, berdokumen resmi, dan didukung jaringan pasokan yang kuat."}
            </p>
          </div>

          <ol className="mt-10 border-y border-border divide-y divide-border">
            {displayAdvantages.map((adv, index) => (
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
              {isStockpile ? "Alur operasional" : "Alur transaksi"}
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
              {isStockpile
                ? "Setiap kiriman melewati empat tahap yang sama, dari kedatangan hingga siap didistribusikan."
                : "Proses pembelian yang terstruktur dari permintaan hingga pengiriman berdokumen resmi."}
            </p>
          </div>

          <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displaySteps.map((step, index) => (
              <li
                key={step.label}
                className="rounded-xl border border-border bg-background p-5"
              >
                <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                  Tahap {index + 1}
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
        <section className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {isStockpile ? "Lokasi fasilitas" : "Distribusi & Pengiriman"}
            </h2>
            {isStockpile ? (
              <>
                <address className="not-italic mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                  Jl. Raya Bojonegara No. 04 Kp. Pangsoran RT.002/RW.007
                  <br />
                  Desa Bojonegara, Kecamatan Bojonegara
                  <br />
                  Kabupaten Serang, Banten 42454
                </address>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Buka di Google Maps
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </>
            ) : (
              <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                Pengiriman batu bara dapat dilakukan melalui jalur darat (truk)
                maupun tongkang melalui pelabuhan Bojonegara, Banten. Kami
                mendukung distribusi ke seluruh wilayah industri domestik, serta
                siap mengakomodasi kebutuhan ekspor ke Asia Tenggara dan pasar
                internasional.
              </p>
            )}
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {isStockpile
                ? "Butuh ruang penyimpanan atau stok siap kirim?"
                : "Butuh batu bara dengan spesifikasi tertentu?"}
            </h2>
            <p className="mt-3 text-sm text-white/75 leading-relaxed">
              {isStockpile
                ? "Sampaikan kebutuhan volume, jadwal, dan spesifikasi komoditas Anda. Tim kami akan menyesuaikan skema layanan stockpile."
                : "Sampaikan spesifikasi kalori, estimasi tonase, dan tujuan pengiriman. Tim kami akan mengirimkan COA dan penawaran harga."}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-green-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1a33]"
            >
              <FaWhatsapp size={20} /> Hubungi via WhatsApp
            </a>
            <p className="mt-4 text-xs text-white/60">Hotline 0895-0483-6618</p>
          </div>
        </section>
      </div>
    </>
  );
}
