import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTotalVisitors } from "@/lib/ga4";
import { getDashboardStats } from "@/servers/dashboard-queries";
import { FileTextIcon, NewspaperIcon, UsersIcon } from "lucide-react";

export async function SectionCards() {
  const [stats, totalVisitors] = await Promise.all([
    getDashboardStats(),
    getTotalVisitors(30),
  ]);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pengunjung</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalVisitors !== null
              ? totalVisitors.toLocaleString("id-ID")
              : "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <UsersIcon />
              30 hari terakhir
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {totalVisitors !== null
              ? "Data dari Google Analytics"
              : "GA4 belum dikonfigurasi"}
          </div>
          <div className="text-muted-foreground">
            Pengguna aktif unik di website
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Postingan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalPosts.toLocaleString("id-ID")}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <NewspaperIcon />
              semua status
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Seluruh konten tersimpan
          </div>
          <div className="text-muted-foreground">
            Artikel, berita, dan informasi perusahaan
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card col-span-2 md:col-span-1">
        <CardHeader>
          <CardDescription>Total Draf</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.totalDraft.toLocaleString("id-ID")}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <FileTextIcon />
              {stats.totalDraft === 1 ? "1 draf" : `${stats.totalDraft} draf`}
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
    </div>
  );
}
