"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import { addressLines, mapLink, mapSrc } from "@/lib/map";
import { useLanguage } from "@/hooks/use-language";

export function Footer() {
  const { t } = useLanguage();

  const navItems = [
    { name: t.navbar.items.products, href: "/products" },
    { name: t.navbar.items.services, href: "/services" },
    { name: t.navbar.items.solutions, href: "/solution" },
    { name: t.navbar.items.news, href: "/news" },
    { name: t.navbar.items.legal, href: "/legal" },
  ];

  const contacts = [t.common.labels.email, t.common.labels.hotlineNumber];

  return (
    <footer className="bg-[#0b1a33] text-[#c9d4e6] rounded-t-4xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/images/company-logo.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-base font-bold text-white">
                {t.common.companyName}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              {t.footer.companyDescription}
            </p>
            <address className="not-italic mt-6 flex items-start gap-2 text-sm leading-relaxed">
              <MapPin
                className="w-4 h-4 mt-0.5 shrink-0 text-[#8ab4ff]"
                aria-hidden="true"
              />
              <span>
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8ab4ff] hover:underline"
            >
              {t.common.buttons.openGoogleMaps}
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <nav className="lg:col-span-2" aria-label={t.footer.navigationTitle}>
            <h2 className="text-sm font-bold text-white">
              {t.footer.navigationTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold text-white">
              {t.footer.contactTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {contacts.map((contact) => (
                <li key={contact}>{contact}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold text-white">
              {t.footer.locationTitle}
            </h2>
            <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
              <iframe
                title={t.footer.locationTitle}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-48 border-0"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-[#8a97ad]">
          {t.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
