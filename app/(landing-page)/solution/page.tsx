import type { Metadata } from "next";
import HeroSolutions from "@/components/landing/solutions/hero-solutions";
import { SolutionDetails } from "@/components/landing/solutions/solution-details";

export const metadata: Metadata = {
  title: "Industry Energy Solutions",
  description:
    "Tailored coal, biomass, and aggregate supply solutions for power generation, manufacturing, cement, pulp & paper, and heavy infrastructure.",
  openGraph: {
    title: "Industry Energy Solutions | PT Coal Global Energy",
    description:
      "Tailored energy supply and logistics solutions for major industrial sectors, powered by the Bojonegara stockpile hub.",
  },
};

export default function SolutionPage() {
  return (
    <main className="w-full pb-24">
      <HeroSolutions />
      <SolutionDetails />
    </main>
  );
}
