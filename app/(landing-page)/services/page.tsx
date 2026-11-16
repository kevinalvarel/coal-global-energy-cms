import type { Metadata } from "next";
import HeroServices from "@/components/landing/services/hero-services";
import { DetailServices } from "@/components/landing/services/detail-services";

export const metadata: Metadata = {
  title: "Stockpile & Maritime Logistics Services",
  description:
    "Comprehensive coal stockpiling and port-side logistics services in Bojonegara, Banten: high-capacity storage, loading and unloading, weight verification, and quality preservation.",
  openGraph: {
    title: "Stockpile & Maritime Logistics Services | PT Coal Global Energy",
    description:
      "Strategic coal stockpiling, port logistics, quality control, and distribution dispatch in Bojonegara, Banten.",
  },
};

const WHATSAPP_URL =
  "https://wa.me/6289504836618?text=" +
  encodeURIComponent(
    "Halo PT. Coal Global Energy, saya ingin menanyakan layanan stockpile di Bojonegara.",
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
    value: "Jalur distribusi utama, pelabuhan bongkar-muat, dan jalan hauling.",
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
    <main className="w-full pb-24">
      <HeroServices />
      <DetailServices
        facilityFacts={facilityFacts}
        advantages={advantages}
        steps={steps}
      />
    </main>
  );
}
