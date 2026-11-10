import { ChartAreaInteractive } from "@/components/admin/chart-area-interactive";
import { PageHeader } from "@/components/admin/page-header";
import { SectionCards } from "@/components/admin/section-cards";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Dashboard"
        description="Ringkasan konten profil perusahaan dan kunjungan website."
      />
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
