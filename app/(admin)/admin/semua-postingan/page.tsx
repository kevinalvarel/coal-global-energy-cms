import { Suspense } from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { PageHeader } from "@/components/admin/page-header";
import {
  PostsTableSection,
  PostsTableSkeleton,
} from "@/components/admin/posts-table-section";
import { Button } from "@/components/ui/button";

export default function SemuaPostinganPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Semua Postingan"
        description="Kelola seluruh artikel, berita, dan konten website."
      >
        <Button
          nativeButton={false}
          render={<Link href="/admin/buat-postingan" />}
        >
          <PlusIcon />
          Buat Postingan
        </Button>
      </PageHeader>
      <Suspense fallback={<PostsTableSkeleton />}>
        <PostsTableSection />
      </Suspense>
    </div>
  );
}
