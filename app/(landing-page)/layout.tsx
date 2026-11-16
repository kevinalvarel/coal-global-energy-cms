import type { Metadata } from "next";
import { Footer } from "@/components/layouts/Footer";
import { NavbarLanding } from "@/components/layouts/NavbarLanding";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default:
      "PT Coal Global Energy | Strategic Coal Stockpile & Industrial Energy Supply",
    template: "%s | PT Coal Global Energy",
  },
  description:
    "Leading provider of high-capacity coal stockpiling, integrated port distribution, and industrial energy supply located in Bojonegara, Banten.",
  openGraph: {
    title:
      "PT Coal Global Energy | Strategic Coal Stockpile & Industrial Energy Supply",
    description:
      "Strategic coal stockpiling, maritime logistics, and multi-commodity energy supply based in Bojonegara, Banten, Indonesia.",
    url: "/",
    siteName: "PT Coal Global Energy",
    images: [
      {
        url: "/images/landing/hero.png",
        width: 1200,
        height: 630,
        alt: "PT Coal Global Energy Stockpile Facility and Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "PT Coal Global Energy | Strategic Coal Stockpile & Industrial Energy Supply",
    description:
      "Strategic coal stockpiling, maritime logistics, and multi-commodity energy supply based in Bojonegara, Banten, Indonesia.",
    images: ["/images/landing/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LandingPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <NavbarLanding />
      {children}
      <Footer />
    </div>
  );
}
