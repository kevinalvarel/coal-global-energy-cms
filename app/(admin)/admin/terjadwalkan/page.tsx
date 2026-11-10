import { PageHeader } from "@/components/admin/page-header";
import { PostsTable } from "@/components/admin/posts-table";

export default function TerjadwalkanPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Terjadwalkan"
        description="Postingan yang dijadwalkan terbit otomatis."
      />
      <PostsTable status="Terjadwal" />
    </div>
  );
}
