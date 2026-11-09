import { Footer } from "@/components/layouts/Footer";
import { NavbarLanding } from "@/components/layouts/NavbarLanding";
import { ReactNode } from "react";

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
