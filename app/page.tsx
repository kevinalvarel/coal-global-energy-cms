import { AboutUs } from "@/components/landing/sections/AboutUs";
import { GallerySection } from "@/components/landing/sections/Gallery";
import HeroSection from "@/components/landing/sections/Hero";
import { LocationSection } from "@/components/landing/sections/Location";

export default function Home() {
  return (
    <main className="bg-[#E5EAF0]/40 min-h-full">
      <HeroSection />
      <AboutUs />
      <GallerySection />
      <LocationSection />
    </main>
  );
}
