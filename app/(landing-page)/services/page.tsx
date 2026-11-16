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

export default function ServicesPage() {
  return (
    <main className="w-full pb-24">
      <HeroServices />
      <DetailServices />
    </main>
  );
}
