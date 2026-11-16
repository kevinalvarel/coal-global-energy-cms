import type { Metadata } from "next";
import HeroProducts from "@/components/landing/products/hero-products";
import { ProductDetails } from "@/components/landing/products/product-details";

export const metadata: Metadata = {
  title: "Products & Commodities",
  description:
    "High-grade thermal coal, palm kernel shells, wood chips, and split stone supplied by PT Coal Global Energy, backed by strategic stockpile facilities in Bojonegara, Banten.",
  openGraph: {
    title: "Products & Commodities | PT Coal Global Energy",
    description:
      "Reliable supply of thermal coal, biomass fuels, and construction aggregates from Bojonegara, Banten.",
  },
};

export default function ProductPage() {
  return (
    <main className="w-full pb-24">
      <HeroProducts />
      <ProductDetails />
    </main>
  );
}
