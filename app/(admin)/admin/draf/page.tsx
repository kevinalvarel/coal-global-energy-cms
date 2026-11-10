import { PageHeader } from "@/components/admin/page-header";
import { PostsTable } from "@/components/admin/posts-table";

export default function DrafPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Draf"
        description="Postingan yang belum dipublikasikan."
      />
      <PostsTable status="Draf" />
    </div>
  );
}
