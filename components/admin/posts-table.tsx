"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CopyIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

import {
  deleteContent,
  duplicateContent,
  getContents,
  type ActionResult,
  type ContentSummary,
  type PaginatedContents,
} from "@/servers/content-services";
import {
  POST_CATEGORIES,
  type PostCategory,
  type PostStatus,
} from "@/validations/content-validations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CategoryFilter = "Semua" | PostCategory;

const CATEGORY_FILTER_ITEMS: Array<{ label: string; value: CategoryFilter }> = [
  { label: "Semua Kategori", value: "Semua" },
  ...POST_CATEGORIES.map((category) => ({ label: category, value: category })),
];

const DATE_FORMATTER = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatPostDate(value: Date | string): string {
  const parsed = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "-";
  }
  return DATE_FORMATTER.format(parsed);
}

function StatusBadge({ status }: { status: PostStatus }) {
  const variant =
    status === "Publikasi"
      ? "default"
      : status === "Draf"
        ? "secondary"
        : "outline";

  return <Badge variant={variant}>{status}</Badge>;
}

interface PostsTableProps {
  initialResult: ActionResult<PaginatedContents>;
  status?: PostStatus;
}

export function PostsTable({ initialResult, status }: PostsTableProps) {
  const router = useRouter();
  const [data, setData] = useState<PaginatedContents | null>(
    initialResult.success ? initialResult.data : null,
  );
  const [error, setError] = useState<string | null>(
    initialResult.success ? null : initialResult.error,
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("Semua");
  const [page, setPage] = useState(
    initialResult.success ? initialResult.data.pagination.page : 1,
  );
  const [isFetching, setIsFetching] = useState(false);
  const [busyPostId, setBusyPostId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContentSummary | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const isFirstMount = useRef(true);
  const requestIdRef = useRef(0);
  const cancelDeleteButtonRef = useRef<HTMLButtonElement | null>(null);

  const fetchPosts = useCallback(
    async (params: {
      search: string;
      categoryFilter: CategoryFilter;
      targetPage: number;
    }) => {
      const requestId = ++requestIdRef.current;
      setIsFetching(true);
      setError(null);

      try {
        const result = await getContents({
          status,
          category:
            params.categoryFilter === "Semua"
              ? undefined
              : params.categoryFilter,
          search: params.search.trim() || undefined,
          page: params.targetPage,
          limit: 10,
        });

        if (requestId !== requestIdRef.current) {
          return;
        }

        if (!result.success) {
          setError(result.error);
          return;
        }

        setData(result.data);
        setPage(result.data.pagination.page);
      } catch {
        if (requestId === requestIdRef.current) {
          setError("Gagal memuat daftar postingan. Silakan coba lagi.");
        }
      } finally {
        if (requestId === requestIdRef.current) {
          setIsFetching(false);
        }
      }
    },
    [status],
  );

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      void fetchPosts({
        search: query,
        categoryFilter: category,
        targetPage: 1,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query, category, fetchPosts]);

  useEffect(() => {
    if (!deleteTarget) {
      return;
    }

    cancelDeleteButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !isDeleting) {
        setDeleteTarget(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteTarget, isDeleting]);

  async function handleDuplicate(item: ContentSummary) {
    setBusyPostId(item.id);
    try {
      const result = await duplicateContent(item.id);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success(`"${item.title}" berhasil diduplikasi sebagai draf.`);
      await fetchPosts({
        search: query,
        categoryFilter: category,
        targetPage: 1,
      });
      router.refresh();
    } catch {
      toast.error("Gagal menduplikasi postingan.");
    } finally {
      setBusyPostId(null);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) {
      return;
    }

    setIsDeleting(true);
    setBusyPostId(deleteTarget.id);

    try {
      const result = await deleteContent(deleteTarget.id);
      if (!result.success) {
        toast.error(result.error);
        return;
      }

      const deletedTitle = deleteTarget.title;
      setDeleteTarget(null);
      toast.success(`"${deletedTitle}" berhasil dihapus.`);

      const currentItemsCount = data?.items.length ?? 0;
      const nextPage =
        currentItemsCount <= 1 && page > 1 ? page - 1 : page;

      await fetchPosts({
        search: query,
        categoryFilter: category,
        targetPage: nextPage,
      });
      router.refresh();
    } catch {
      toast.error("Gagal menghapus postingan.");
    } finally {
      setIsDeleting(false);
      setBusyPostId(null);
    }
  }

  function handleResetFilters() {
    setQuery("");
    setCategory("Semua");
  }

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const hasActiveFilter = query.trim().length > 0 || category !== "Semua";
  const isAuthError = error?.toLowerCase().includes("login") ?? false;

  const emptyMessage = hasActiveFilter
    ? "Tidak ada postingan yang cocok dengan pencarian atau filter kategori."
    : status === "Draf"
      ? "Belum ada postingan berstatus draf."
      : status === "Terjadwal"
        ? "Belum ada postingan yang dijadwalkan."
        : "Belum ada postingan yang dibuat.";

  return (
    <>
      <Card>
        <CardHeader className="gap-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>
                {status ? `Postingan ${status}` : "Semua Postingan"}
              </CardTitle>
              <CardDescription>
                {isFetching
                  ? "Memuat daftar postingan..."
                  : pagination
                    ? `${pagination.total} postingan ditemukan`
                    : "Daftar postingan CMS"}
              </CardDescription>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-64">
                <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Cari judul, ringkasan, slug..."
                  className="h-10 pl-8 sm:h-9"
                  aria-label="Cari postingan"
                />
              </div>

              <Select
                value={category}
                onValueChange={(value) => {
                  if (value) {
                    setCategory(value as CategoryFilter);
                  }
                }}
                items={CATEGORY_FILTER_ITEMS}
              >
                <SelectTrigger
                  aria-label="Filter kategori postingan"
                  className="h-10 w-full sm:h-9 sm:w-44"
                >
                  <SelectValue placeholder="Semua Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {CATEGORY_FILTER_ITEMS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-0">
          {error ? (
            <div
              role="alert"
              className="mx-4 flex flex-col items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm md:mx-6"
            >
              <div>
                <p className="font-medium text-destructive">
                  Gagal memuat daftar postingan
                </p>
                <p className="mt-0.5 text-muted-foreground">{error}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {isAuthError ? (
                  <Button
                    nativeButton={false}
                    size="sm"
                    className="min-h-10 sm:min-h-8"
                    render={<Link href="/auth/login" />}
                  >
                    Masuk ke Akun Admin
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="min-h-10 sm:min-h-8"
                    disabled={isFetching}
                    onClick={() =>
                      void fetchPosts({
                        search: query,
                        categoryFilter: category,
                        targetPage: page,
                      })
                    }
                  >
                    Coba Lagi
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className={isFetching ? "opacity-60 transition-opacity" : ""}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-4 md:pl-6">Judul</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Kategori
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Penulis
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Tanggal
                    </TableHead>
                    <TableHead className="pr-4 text-right md:pr-6">
                      <span className="sr-only">Aksi</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length > 0 ? (
                    items.map((item) => {
                      const isRowBusy = busyPostId === item.id;
                      return (
                        <TableRow key={item.id}>
                          <TableCell className="max-w-52 pl-4 font-medium sm:max-w-72 md:pl-6">
                            <Link
                              href={`/admin/semua-postingan/${item.id}/edit`}
                              className="block truncate hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                            >
                              {item.title}
                            </Link>
                            <span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground md:hidden">
                              {item.category}
                            </span>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {item.category}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={item.status} />
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {item.author?.name ?? "-"}
                          </TableCell>
                          <TableCell className="hidden text-muted-foreground lg:table-cell">
                            {formatPostDate(item.updatedAt ?? item.createdAt)}
                          </TableCell>
                          <TableCell className="pr-4 text-right md:pr-6">
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                disabled={isRowBusy}
                                render={
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-10 text-muted-foreground md:size-8"
                                  />
                                }
                              >
                                <EllipsisVerticalIcon />
                                <span className="sr-only">
                                  Buka menu aksi untuk {item.title}
                                </span>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem
                                  render={
                                    <Link
                                      href={`/admin/semua-postingan/${item.id}/edit`}
                                    />
                                  }
                                >
                                  <PencilIcon />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  disabled={isRowBusy}
                                  onClick={() => void handleDuplicate(item)}
                                >
                                  <CopyIcon />
                                  Duplikat
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  variant="destructive"
                                  disabled={isRowBusy}
                                  onClick={() => setDeleteTarget(item)}
                                >
                                  <Trash2Icon />
                                  Hapus
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="py-10 text-center">
                        <div className="mx-auto flex max-w-sm flex-col items-center gap-3 px-4">
                          <p className="text-sm text-muted-foreground">
                            {emptyMessage}
                          </p>
                          {hasActiveFilter ? (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="min-h-10 sm:min-h-8"
                              onClick={handleResetFilters}
                            >
                              Reset Filter
                            </Button>
                          ) : (
                            <Button
                              nativeButton={false}
                              size="sm"
                              className="min-h-10 sm:min-h-8"
                              render={<Link href="/admin/buat-postingan" />}
                            >
                              <PlusIcon />
                              Buat Postingan
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>

        {pagination && pagination.totalPages > 0 ? (
          <CardFooter className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              Halaman {pagination.page} dari {pagination.totalPages} (
              {pagination.total} postingan)
            </p>
            <div className="flex w-full gap-2 sm:w-auto">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="min-h-10 flex-1 sm:min-h-8 sm:flex-initial"
                disabled={isFetching || pagination.page <= 1}
                onClick={() =>
                  void fetchPosts({
                    search: query,
                    categoryFilter: category,
                    targetPage: pagination.page - 1,
                  })
                }
              >
                Sebelumnya
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="min-h-10 flex-1 sm:min-h-8 sm:flex-initial"
                disabled={
                  isFetching || pagination.page >= pagination.totalPages
                }
                onClick={() =>
                  void fetchPosts({
                    search: query,
                    categoryFilter: category,
                    targetPage: pagination.page + 1,
                  })
                }
              >
                Berikutnya
              </Button>
            </div>
          </CardFooter>
        ) : null}
      </Card>

      {deleteTarget ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => {
            if (!isDeleting) {
              setDeleteTarget(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-post-dialog-title"
            aria-describedby="delete-post-dialog-description"
            className="w-full max-w-md rounded-xl border bg-background p-6 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <h3
              id="delete-post-dialog-title"
              className="text-base font-semibold"
            >
              Hapus Postingan
            </h3>
            <p
              id="delete-post-dialog-description"
              className="mt-2 text-sm text-muted-foreground"
            >
              Apakah Anda yakin ingin menghapus postingan{" "}
              <span className="font-medium text-foreground">
                &ldquo;{deleteTarget.title}&rdquo;
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                ref={cancelDeleteButtonRef}
                type="button"
                variant="outline"
                disabled={isDeleting}
                className="min-h-11 sm:min-h-9"
                onClick={() => setDeleteTarget(null)}
              >
                Batal
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={isDeleting}
                className="min-h-11 sm:min-h-9"
                onClick={() => void handleConfirmDelete()}
              >
                {isDeleting ? "Menghapus..." : "Hapus Postingan"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
