"use client";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";

export default function HeroServices() {
  const textVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 1,
      },
    },
  };

  return (
    <div className=" relative w-full min-h-screen [--color-primary:#003AF9] overflow-hidden py-16 rounded-b-4xl">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(125%_125%_at_50%_10%,#fff_40%,var(--color-primary)_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,var(--color-primary)_100%)]" />

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-start text-center pt-20 md:pt-10 px-4 pb-0 max-w-7xl mx-auto z-10 relative rounded-none">
        <AnimatedGroup
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            },
            item: textVariants,
          }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-5 leading-[1.1] px-6 md:px-0">
            Layanan Manajemen {""}
            <span className="relative inline-block text-primary">
              Stockpile Terpadu
            </span>{" "}
            &amp; Terpercaya
          </h1>
          <p className="text-sm sm:text-sm md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-[350px]  md:max-w-lg  mx-auto mb-6 md:mb-5">
            Fasilitas stockpile strategis di jalur Bojonegara dengan jembatan
            timbang, alat berat modern, kontrol kualitas ketat, serta pengawasan
            dan mitigasi swa-bakar 24/7.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-[300px] md:w-full mb-16 mx-auto">
            <Button
              variant={"default"}
              className="px-1 py-1 md:px-4 md:py-2 text-lg rounded-lg hover:bg-(--color-primary)/90 text-white w-full sm:w-auto shadow-lg shadow-(--color-primary)/20 transition-all hover:shadow-(--color-primary)/40  cursor-pointer"
            >
              Konsultasi Layanan
            </Button>

            <Button
              variant={"outline"}
              className="px-1 py-1 md:px-4 md:py-2 text-lg rounded-lg w-full sm:w-auto border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-800 transition-colors  cursor-pointer"
            >
              Unduh Profil Fasilitas
            </Button>
          </div>
        </AnimatedGroup>

        {/* Hero Images Section */}
        <div className="relative w-full mx-auto z-20">
          <div className="relative">
            {/* Desktop Screenshot */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative w-full rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl dark:bg-gray-900"
            >
              <Image
                src="https://cdn.21st.dev/assets/localized/fc3ccc2cd42f9a07d120f454efdd2c2ecf95bc252f30ee0abc007ae8c22665f9.png"
                alt="Desktop Dashboard"
                width={800}
                height={800}
                className="object-cover object-left w-full h-auto"
                priority
              />
            </motion.div>
          </div>

          {/* Fade Overlay for both images */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute -bottom-2 left-0 right-0 h-50 md:h-60 lg:h-80 bg-gradient-to-t from-white via-white/80 dark:from-black dark:via-black/80 to-transparent z-30 pointer-events-none rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
