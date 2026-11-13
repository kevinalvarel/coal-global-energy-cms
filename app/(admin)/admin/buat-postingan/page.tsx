import { ContentForm } from "@/components/admin/content-form";
import { PageHeader } from "@/components/admin/page-header";

export default function BuatPostinganPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Buat Postingan"
        description="Tulis artikel atau berita baru untuk website."
      />
      <ContentForm mode="create" />
    </div>
  );
}
