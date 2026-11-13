import { Suspense } from "react";

import { PageHeader } from "@/components/admin/page-header";
import {
  PostsTableSection,
  PostsTableSkeleton,
} from "@/components/admin/posts-table-section";

export default function DrafPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Draf"
        description="Postingan yang belum dipublikasikan."
      />
      <Suspense fallback={<PostsTableSkeleton />}>
        <PostsTableSection status="Draf" />
      </Suspense>
    </div>
  );
}
