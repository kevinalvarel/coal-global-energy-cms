import { ChartAreaInteractive } from "@/components/admin/chart-area-interactive";
import { PageHeader } from "@/components/admin/page-header";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Analytics"
        description="Pantau tren kunjungan dan keterlibatan pengunjung."
      />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
