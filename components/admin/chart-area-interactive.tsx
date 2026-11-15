import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getVisitorSeries } from "@/lib/ga4"
import { ChartAreaInteractiveClient } from "./chart-area-interactive-client"

export async function ChartAreaInteractive() {
  const data = await getVisitorSeries(90)

  if (!data) {
    return (
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Kunjungan Website</CardTitle>
          <CardDescription>Data GA4 belum tersedia</CardDescription>
        </CardHeader>
        <CardContent className="flex h-[250px] items-center justify-center text-center text-sm text-muted-foreground">
          Tidak dapat memuat data pengunjung dari Google Analytics 4. Coba
          lagi nanti.
        </CardContent>
      </Card>
    )
  }

  return <ChartAreaInteractiveClient data={data} />
}
