import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContentForm } from "@/components/admin/content-form";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getContentById } from "@/servers/content-services";

interface EditPostinganPageProps {
  params: Promise<{ id: string }>;
}

function EditPostinganSkeleton() {
  return (
    <Card>
      <CardHeader className="gap-2">
        <Skeleton className="h-6 w-44" />
        <Skeleton className="h-4 w-72 max-w-full" />
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Skeleton className="h-9 w-full" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
        <Skeleton className="h-9 w-56 max-w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-48 w-full" />
      </CardContent>
    </Card>
  );
}

async function EditPostinganContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getContentById(id);

  if (!result.success) {
    if (result.error === "Konten tidak ditemukan") {
      notFound();
    }

    const isAuthError = result.error.toLowerCase().includes("login");

    return (
      <Card>
        <CardHeader>
          <CardTitle>Tidak Dapat Memuat Postingan</CardTitle>
          <CardDescription>{result.error}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {isAuthError ? (
            <Button nativeButton={false} render={<Link href="/auth/login" />}>
              Masuk ke Akun Admin
            </Button>
          ) : null}
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/admin/semua-postingan" />}
          >
            Kembali ke Semua Postingan
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <ContentForm mode="edit" initialData={result.data} />;
}

export default function EditPostinganPage({ params }: EditPostinganPageProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <PageHeader
        title="Edit Postingan"
        description="Perbarui judul, kategori, status, dan isi postingan."
      />
      <Suspense fallback={<EditPostinganSkeleton />}>
        <EditPostinganContent params={params} />
      </Suspense>
    </div>
  );
}

