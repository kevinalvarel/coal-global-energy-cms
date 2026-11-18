import type { Metadata } from "next";
import { LegalContent } from "@/components/landing/legal/legal-content";

export const metadata: Metadata = {
  title: "Permits & Legal",
  description:
    "Corporate permits and licensing documents of PT Coal Global Energy are kept private and available for verification directly via WhatsApp.",
};

export default function LegalPage() {
  return <LegalContent />;
}
