import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getContents } from "@/servers/content-services";
import type { PostStatus } from "@/validations/content-validations";
import { PostsTable } from "./posts-table";

export function PostsTableSkeleton() {
  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-52 max-w-full" />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Skeleton className="h-9 w-full sm:w-64" />
            <Skeleton className="h-9 w-full sm:w-44" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export async function PostsTableSection({ status }: { status?: PostStatus }) {
  const initialResult = await getContents({
    status,
    page: 1,
    limit: 10,
  });

  return <PostsTable initialResult={initialResult} status={status} />;
}

