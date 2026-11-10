"use client";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";
import LogoLoop from "@/components/react-bits/logo-loop";
import { Link } from "react-scroll";

const imageLogos = [
  {
    src: "/icons/kingland.png",
    alt: "Kingland Logo",
    href: "https://company1.com",
  },
  {
    src: "/icons/pokphand.png",
    alt: "Pokphand Logo",
    href: "https://company2.com",
  },
  {
    src: "/icons/monokem.png",
    alt: "Monokem Logo",
    href: "https://company3.com",
  },
  {
    src: "/icons/sge.png",
    alt: "SGE Logo",
    href: "https://company3.com",
  },
  {
    src: "/icons/xinyuan.png",
    alt: "Monokem Logo",
    href: "https://company3.com",
  },
];

export default function HeroSolutions() {
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
            Solusi Efisiensi {""}
            <span className="relative inline-block text-primary">
              Rantai Pasok
            </span>{" "}
            Berbagai Sektor Industri
          </h1>
          <p className="text-sm sm:text-sm md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-[350px]  md:max-w-lg  mx-auto mb-6 md:mb-5">
            Menjawab tantangan kontinuitas energi untuk PLTU, pabrik semen,
            tekstil, smelter, hingga industri manufaktur dengan integrasi
            komoditas dan logistik andal.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-[300px] md:w-full mb-16 mx-auto">
            <Button
              variant={"default"}
              nativeButton={false}
              render={
                <Link to="cta" smooth={true} duration={500} offset={-100} />
              }
              className="px-1 py-1 md:px-4 md:py-2 text-lg rounded-lg hover:bg-(--color-primary)/90 text-white w-full sm:w-auto shadow-lg shadow-(--color-primary)/20 transition-all hover:shadow-(--color-primary)/40  cursor-pointer"
            >
              Konsultasi Solusi Industri
            </Button>

            <Button
              variant={"outline"}
              nativeButton={false}
              render={
                <Link
                  to="solution-details"
                  smooth={true}
                  duration={500}
                  offset={-100}
                />
              }
              className="px-1 py-1 md:px-4 md:py-2 text-lg rounded-lg w-full sm:w-auto border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-800 transition-colors  cursor-pointer"
            >
              Pelajari Sektor Industri
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
            >
              {/* Trusted by Leader */}
              <div id="trusted-by-leaders-placeholder" className="pt-12">
                <div className="text-center max-w-xl mx-auto mb-8">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 dark:text-neutral-500">
                    Dipercaya oleh Pelaku Industri & Mitra Terkemuka
                  </span>
                </div>

                {/* Container Slot Mitra: Siap Anda tambahkan logo-logo mitra (Kingland, Pokphand, Monokem Surya, dll) */}
                <div className="w-full min-h-[110px]">
                  <LogoLoop
                    logos={imageLogos}
                    direction="left"
                    focus={0.5}
                    tiltX={0}
                    tiltY={0}
                    logoHeight={120}
                    fadeOut
                    speed={50}
                    fadeOutWidth={0.12}
                    scrollBoost={0}
                    draggable
                    intro
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Fade Overlay for both images */}
        </div>
      </div>
    </div>
  );
}
