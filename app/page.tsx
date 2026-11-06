import { AboutUs } from "@/components/landing/AboutUs";
import { CtaSection } from "@/components/landing/Cta";
import { GallerySection } from "@/components/landing/Gallery";
import HeroSection from "@/components/landing/Hero";
import { LocationSection } from "@/components/landing/Location";

export default function Home() {
  return (
    <main className="bg-[#E5EAF0]/40 min-h-full">
      <HeroSection />
      <AboutUs />
      <GallerySection />
      <LocationSection />
      <CtaSection />
    </main>
  );
}
