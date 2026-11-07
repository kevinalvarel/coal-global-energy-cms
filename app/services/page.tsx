import type { Metadata } from "next";
import { ExternalLink, MessageCircle } from "lucide-react";
import { mapLink } from "@/lib/map";

export const metadata: Metadata = {
  title: "Stockpiling Services | PT Coal Global Energy",
  description:
    "Layanan penyimpanan sementara (stockpile) PT. Coal Global Energy di Bojonegara, Banten: bongkar muat, penimbangan, kontrol kualitas, hingga pemuatan untuk distribusi.",
};

const WHATSAPP_URL =
  "https://wa.me/6289504836618?text=" +
  encodeURIComponent(
    "Halo PT. Coal Global Energy, saya ingin menanyakan layanan stockpile di Bojonegara."
  );

const advantages = [
  {
    title: "Kapasitas Besar",
    description:
      "Area penyimpanan luas untuk menampung volume tinggi dan kebutuhan stok jangka panjang.",
  },
  {
    title: "Kontrol Kualitas Ketat",
    description:
      "Monitoring berkala untuk menjaga stabilitas kalori batu bara dan meminimalkan degradasi material selama penyimpanan.",
  },
  {
    title: "Lokasi Strategis di Bojonegara",
    description:
      "Berada di jalur pelabuhan Bojonegara dengan akses ke jalur distribusi utama, pelabuhan bongkar-muat, dan jalan hauling.",
  },
  {
    title: "Keamanan 24/7 dan Mitigasi Swa-Bakar",
    description:
      "Pengawasan sepanjang waktu serta manajemen risiko self-combustion selama material berada di area penyimpanan.",
  },
  {
    title: "Infrastruktur dan Alat Berat Lengkap",
    description:
      "Jembatan timbang (weighbridge), wheel loader L20, excavator, dan peralatan penunjang produksi batu bara.",
  },
];

const steps = [
  { label: "Unloading", detail: "Bongkar muat material" },
  { label: "Weighing", detail: "Penimbangan di jembatan timbang" },
  { label: "Stockpiling & QC", detail: "Penyimpanan dan kontrol kualitas" },
  { label: "Loading / Dispatch", detail: "Pemuatan dan pengiriman" },
];

const facilityFacts = [
  {
    term: "Akses",
    value:
      "Jalur distribusi utama, pelabuhan bongkar-muat, dan jalan hauling.",
  },
  {
    term: "Pengawasan",
    value: "Pengawasan 24/7 dan manajemen risiko swa-bakar.",
  },
  {
    term: "Peralatan",
    value: "Jembatan timbang, wheel loader L20, excavator, dan alat penunjang.",
  },
  {
    term: "Komoditas",
    value: "Batu bara dari tambang berizin di Indonesia.",
  },
];

export default function ServicesPage() {
  return (
    <main className="w-full pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
            Stockpiling{" "}
            <span className="relative inline-block text-primary">
              Services
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
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M5 9.5 C40 5, 80 10, 120 7 C155 4, 180 8.5, 196 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 text-sm md:text-lg text-slate-600 dark:text-neutral-300 leading-relaxed">
            Fasilitas penyimpanan sementara PT. Coal Global Energy di Bojonegara,
            Banten, menjaga stok batu bara tetap terlindungi dan siap
            didistribusikan ke pelanggan industri.
          </p>
          <p className="mt-3 text-sm text-slate-600 dark:text-neutral-400">
            Layanan mencakup bongkar muat, penimbangan, penyimpanan dengan
            kontrol kualitas, hingga pemuatan untuk pengiriman.
          </p>
        </header>

        <section className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#0CC0DF]">
              Fasilitas
            </p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">
              Stockpile Bojonegara, Banten
            </h2>
            <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed">
              Fasilitas berada di Jl. Raya Bojonegara No. 04 Kp. Pangsoran
              RT.002/RW.007, Desa Bojonegara, Kecamatan Bojonegara, Kabupaten
              Serang, Banten 42454.
            </p>

            <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {facilityFacts.map((fact) => (
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

          <div className="lg:col-span-5 flex flex-col justify-center rounded-2xl border-2 border-dashed border-border bg-card p-6 sm:p-8 text-center">
            <p className="text-xs font-semibold tracking-wider uppercase text-slate-600 dark:text-neutral-400">
              [FOTO FASILITAS MENYUSUL]
            </p>
            <p className="mt-3 text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
              Foto asli area stockpile Bojonegara akan ditampilkan setelah
              dokumentasi dan data kapasitas dikonfirmasi perusahaan.
            </p>
          </div>
        </section>

        <section className="mt-20 md:mt-28">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Lima keunggulan fasilitas
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
              Setiap bagian fasilitas dirancang untuk menjaga mutu material dan
              kelancaran alur distribusi.
            </p>
          </div>

          <ol className="mt-10 border-y border-border divide-y divide-border">
            {advantages.map((advantage, index) => (
              <li
                key={advantage.title}
                className="grid grid-cols-[auto_1fr] gap-4 md:gap-8 py-6 md:py-8"
              >
                <span className="text-xl md:text-2xl font-bold tabular-nums text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-foreground">
                    {advantage.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20 md:mt-28 rounded-2xl bg-[#E5EAF0]/60 dark:bg-muted p-6 sm:p-8 md:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Alur operasional
            </h2>
            <p className="mt-4 text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
              Setiap kiriman melewati empat tahap yang sama, dari kedatangan
              hingga siap didistribusikan.
            </p>
          </div>

          <ol className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
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

        <section className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Lokasi fasilitas
            </h2>
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
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#0b1a33] text-white p-6 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Butuh ruang penyimpanan atau stok siap kirim?
            </h2>
            <p className="mt-3 text-sm text-white/75 leading-relaxed">
              Sampaikan kebutuhan volume, jadwal, dan spesifikasi komoditas
              Anda. Tim kami akan menyesuaikan skema layanan stockpile.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-green-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1a33]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              Hubungi via WhatsApp
            </a>
            <p className="mt-4 text-xs text-white/60">
              Hotline 0895-0483-6618
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
