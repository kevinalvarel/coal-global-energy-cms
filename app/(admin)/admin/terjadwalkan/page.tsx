import { Suspense } from "react";

import { PageHeader } from "@/components/admin/page-header";
import {
  PostsTableSection,
  PostsTableSkeleton,
} from "@/components/admin/posts-table-section";

export default function TerjadwalkanPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Terjadwalkan"
        description="Postingan yang dijadwalkan terbit otomatis."
      />
      <Suspense fallback={<PostsTableSkeleton />}>
        <PostsTableSection status="Terjadwal" />
      </Suspense>
    </div>
  );
}
