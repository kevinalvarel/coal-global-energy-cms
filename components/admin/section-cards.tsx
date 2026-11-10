"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarClockIcon,
  ClockIcon,
  FileTextIcon,
  NewspaperIcon,
} from "lucide-react";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Postingan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            128
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <NewspaperIcon />
              +12 bulan ini
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Publikasi rutin berjalan
          </div>
          <div className="text-muted-foreground">
            Artikel, berita, dan informasi perusahaan
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Draf</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            6
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <ClockIcon />6 perlu ditinjau
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Draf menunggu publikasi
          </div>
          <div className="text-muted-foreground">
            Belum tampil di halaman publik
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card col-span-2 md:col-span-1">
        <CardHeader>
          <CardDescription>Terjadwalkan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            3
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <CalendarClockIcon />3 minggu ini
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Jadwal terbit otomatis
          </div>
          <div className="text-muted-foreground">
            Postingan terbit sesuai jadwal
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
