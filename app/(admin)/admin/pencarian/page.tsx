"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, SearchIcon } from "lucide-react";

import { PageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const items = [
  { title: "Dashboard", type: "Menu", href: "/admin" },
  { title: "Analytics", type: "Menu", href: "/admin/analytics" },
  { title: "Halaman", type: "Konten", href: "/admin/halaman" },
  {
    title: "Semua Postingan",
    type: "Konten",
    href: "/admin/semua-postingan",
  },
  { title: "Draf", type: "Konten", href: "/admin/draf" },
  { title: "Terjadwalkan", type: "Konten", href: "/admin/terjadwalkan" },
  {
    title: "Pengaturan Umum",
    type: "Pengaturan",
    href: "/admin/pengaturan-umum",
  },
  {
    title: "Pengaturan Pengguna",
    type: "Pengaturan",
    href: "/admin/pengaturan-pengguna",
  },
  { title: "Ekspor Batubara Indonesia Meningkat", type: "Postingan", href: "#" },
  { title: "Standar Keselamatan Tambang Terbaru", type: "Postingan", href: "#" },
];

export default function PencarianPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) {
      return items;
    }
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.type.toLowerCase().includes(keyword)
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Pencarian"
        description="Cari halaman, postingan, atau pengaturan admin."
      />

      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ketik untuk mencari..."
          className="h-10 pl-9"
          aria-label="Cari di admin"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hasil</CardTitle>
          <CardDescription>{results.length} hasil ditemukan</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {results.length ? (
            results.map((item) => (
              <Link
                key={`${item.type}-${item.title}`}
                href={item.href}
                className="flex items-center justify-between gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{item.type}</Badge>
                  <span className="font-medium">{item.title}</span>
                </div>
                <ArrowRightIcon className="size-4 text-muted-foreground" />
              </Link>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Tidak ada hasil untuk &ldquo;{query}&rdquo;.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
