"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  TrendingUp,
  Truck,
  Leaf,
  Users2,
  CheckCircle2,
  Anchor,
  Globe2,
  Building2,
  ChevronRight,
  Flame,
} from "lucide-react";
import LogoLoop from "@/components/react-bits/logo-loop";

export function AboutUs() {
  const [activeTab, setActiveTab] = useState<"visi" | "misi">("visi");

  const missionList = [
    {
      title: "Kualitas Produk Prima",
      desc: "Menyediakan batu bara berkualitas tinggi teruji kalori dan parameter teknis sesuai standar operasional klien.",
      icon: ShieldCheck,
    },
    {
      title: "Kemitraan Jangka Panjang",
      desc: "Membangun sinergi berkelanjutan dengan para pelanggan dan tambang mitra atas dasar transparansi serta integritas.",
      icon: Users2,
    },
    {
      title: "Rantai Pasok Tepat Waktu",
      desc: "Distribusi logistik laut & darat yang terukur, aman, dan efisien via akses pelabuhan strategis Bojonegara.",
      icon: Truck,
    },
    {
      title: "Tanggung Jawab Lingkungan",
      desc: "Menjalankan tata kelola komoditas energi dengan standar mitigasi swa-bakar dan pemenuhan regulasi lingkungan hidup.",
      icon: Leaf,
    },
    {
      title: "Integritas & Kompetensi SDM",
      desc: "Didukung tim operasional serta teknisi berpengalaman yang berdedikasi menjaga kepuasan klien 24/7.",
      icon: TrendingUp,
    },
  ];

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

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 overflow-hidden "
    >
      {/* Ambient Gradient Glows (Corporate Blue & Electric Cyan) */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#0CC0DF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Tagline & Section Title */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#103984]/10 dark:bg-[#0CC0DF]/10 border border-[#103984]/20 dark:border-[#0CC0DF]/30 mb-4"
          >
            <Building2 className="w-4 h-4 text-[#103984] dark:text-[#0CC0DF]" />
            <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-[#103984] dark:text-[#0CC0DF]">
              Profil Perusahaan & Dedikasi
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.2]"
          >
            Menghubungkan Tambang Terpercaya dengan{" "}
            <span className="text-gray-900 dark:text-white">
              Kebutuhan Energi Masa Depan
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-sm sm:text-sm md:text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed"
          >
            <strong className="text-gray-900 dark:text-white font-semibold">
              PT. Coal Global Energy
            </strong>{" "}
            adalah perseroan swasta nasional yang bergerak dalam perdagangan
            besar bahan bakar padat, komoditas biomassa, serta penyediaan
            fasilitas stockpile modern berkapasitas masif di simpul pelabuhan
            Bojonegara, Banten.
          </motion.p>
        </div>

        {/* Core Presentation: Narrative & Visi-Misi Interactive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          {/* Left Column: Company Story & Value Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-between bg-white dark:bg-neutral-900/90 rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-200/90 dark:border-neutral-800 shadow-xl shadow-slate-900/5 relative overflow-hidden"
          >
            {/* Watermark logo siluet */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 pointer-events-none opacity-5 dark:opacity-10">
              <Image
                src="/images/company-logo.png"
                alt="Watermark Logo"
                width={256}
                height={256}
                className="object-contain filter grayscale"
              />
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-2 w-10 bg-[#0CC0DF] rounded-full" />
                <span className="text-xs font-bold tracking-widest text-[#06317F] dark:text-[#0CC0DF] uppercase">
                  Tentang PT. Coal Global Energy
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-5 leading-snug">
                Pilar Rantai Pasok Terintegrasi dengan Tata Kelola Berstandar
                Tinggi
              </h3>

              <div className="space-y-4 text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Didirikan dengan komitmen profesionalisme mutlak, kami
                  menjembatani pasokan komoditas batu bara berkualitas langsung
                  dari tambang berizin resmi (IUP-OP) di Indonesia
                </p>
                <p>
                  Melalui kepemilikan dan pengelolaan langsung fasilitas
                  penyimpanan sementara (<strong>Stockpiling Services</strong>)
                  di Bojonegara, kami menjamin kestabilan suplai, inspeksi mutu
                  berkala, mitigasi swa-bakar, dan kecepatan distribusi logistik
                  tongkang maupun armada darat.
                </p>
              </div>

              {/* Point of Proof */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-neutral-800 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#103984]/10 dark:bg-neutral-800 text-[#103984] dark:text-[#0CC0DF]">
                    <Anchor className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      Hub Maritim Strategis
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Akses cepat dermaga tongkang Selat Sunda
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#0CC0DF]/15 dark:bg-neutral-800 text-[#06317F] dark:text-[#0CC0DF]">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      Kesiapan Ekspor
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Standar pemenuhan pasar Asia Tenggara
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visi & Misi Interactive Switcher */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col bg-gradient-to-br from-[#103984] via-[#06317F] to-[#0a2352] rounded-2xl p-6 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden"
          >
            {/* Subtle decorative glow */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-[#0CC0DF]/20 rounded-full blur-2xl pointer-events-none" />

            {/* Header Tabs */}
            <div className="relative z-10 flex items-center justify-between mb-8 pb-4 border-b border-white/15">
              <span className="text-xs font-bold tracking-widest text-[#0CC0DF] uppercase">
                Arah Strategis
              </span>
              <div className="flex p-1 bg-black/25 backdrop-blur-md rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveTab("visi")}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    activeTab === "visi"
                      ? "bg-[#0CC0DF] text-[#06317F] shadow-md shadow-[#0CC0DF]/30"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Visi
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("misi")}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    activeTab === "misi"
                      ? "bg-[#0CC0DF] text-[#06317F] shadow-md shadow-[#0CC0DF]/30"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  5 Pilar Misi
                </button>
              </div>
            </div>

            {/* Tab Contents with Framer Motion AnimatePresence */}
            <div className="relative z-10 flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activeTab === "visi" ? (
                  <motion.div
                    key="tab-visi"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-md mb-6 border border-white/15">
                        <Flame className="w-8 h-8 text-[#0CC0DF]" />
                      </div>
                      <h4 className="text-sm font-semibold tracking-wider uppercase text-white/70 mb-3">
                        Visi Perusahaan
                      </h4>
                      <blockquote className="text-xl sm:text-2xl font-semibold leading-relaxed tracking-tight text-white mb-6">
                        &ldquo;Menjadi perusahaan jasa penjualan batu bara yang
                        terpercaya, berdaya saing tinggi, dan berkomitmen pada
                        kualitas serta keberlanjutan di pasar nasional maupun
                        internasional.&rdquo;
                      </blockquote>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 mt-6">
                      <p className="text-xs text-white/80 leading-relaxed">
                        Fokus utama kami adalah konsistensi pasokan bahan bakar
                        energi yang aman dan memenuhi spesifikasi teknis
                        pembangkit dan industri secara berkelanjutan.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="tab-misi"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3.5"
                  >
                    <h4 className="text-xs font-semibold tracking-wider uppercase text-white/70 mb-2">
                      5 Komitmen Operasional & Kemitraan:
                    </h4>
                    {missionList.map((misi, idx) => {
                      const Icon = misi.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
                        >
                          <div className="p-1.5 rounded-md bg-[#0CC0DF]/20 text-[#0CC0DF] shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-white block">
                              {idx + 1}. {misi.title}
                            </span>
                            <span className="text-xs text-white/75 leading-tight block mt-0.5">
                              {misi.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Trusted by Leader */}
        <div
          id="trusted-by-leaders-placeholder"
          className="pt-12 border-t border-slate-200/80 dark:border-neutral-800"
        >
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
      </div>
    </section>
  );
}
