"use client";

import { useLanguage } from "@/hooks/use-language";
import { Globe } from "lucide-react";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer ${className}`}
      aria-label="Ganti bahasa / Switch language"
      title={
        locale === "id" ? "Beralih ke Bahasa Inggris" : "Switch to Indonesian"
      }
    >
      <Globe className="w-3.5 h-3.5 text-neutral-500" />
      <span
        className={
          locale === "id" ? "font-bold text-primary" : "text-neutral-400"
        }
      >
        ID
      </span>
      <span className="text-neutral-300 dark:text-neutral-600">/</span>
      <span
        className={
          locale === "en" ? "font-bold text-primary" : "text-neutral-400"
        }
      >
        EN
      </span>
    </button>
  );
}
