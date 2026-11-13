"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  createContent,
  updateContent,
  type ContentDetail,
} from "@/servers/content-services";
import {
  createContentSchema,
  POST_CATEGORIES,
  POST_STATUSES,
  updateContentSchema,
  type CreateContentInput,
  type CreateContentOutput,
  type PostStatus,
} from "@/validations/content-validations";
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
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORY_ITEMS = POST_CATEGORIES.map((value) => ({
  label: value,
  value,
}));

const STATUS_ITEMS = POST_STATUSES.map((value) => ({
  label: value,
  value,
}));

function slugifyTitle(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 220)
    .replace(/-+$/g, "");
}

interface ContentFormProps {
  mode: "create" | "edit";
  initialData?: ContentDetail;
}

export function ContentForm({ mode, initialData }: ContentFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittingStatus, setSubmittingStatus] = useState<PostStatus | null>(
    null,
  );

  const schema = mode === "edit" ? updateContentSchema : createContentSchema;

  const form = useForm<CreateContentInput, unknown, CreateContentOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialData?.title ?? "",
      slug: initialData?.slug ?? "",
      category: initialData?.category ?? "Berita",
      status: initialData?.status ?? "Draf",
      excerpt: initialData?.excerpt ?? "",
      content: initialData?.content ?? "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const watchedTitle = useWatch({ control, name: "title" }) ?? "";
  const watchedExcerpt = useWatch({ control, name: "excerpt" }) ?? "";
  const watchedStatus = useWatch({ control, name: "status" }) ?? "Draf";
  const isBusy = isSubmitting || submittingStatus !== null;

  const primaryStatus: PostStatus =
    watchedStatus === "Terjadwal" ? "Terjadwal" : "Publikasi";
  const primaryLabel =
    primaryStatus === "Terjadwal" ? "Jadwalkan" : "Publikasikan";

  async function submitWithStatus(
    values: CreateContentOutput,
    targetStatus: PostStatus,
  ) {
    setServerError(null);
    setSubmittingStatus(targetStatus);
    setValue("status", targetStatus);

    const payload: CreateContentInput = {
      title: values.title,
      slug: values.slug ?? "",
      category: values.category,
      status: targetStatus,
      excerpt: values.excerpt ?? "",
      content: values.content,
    };

    try {
      const result =
        mode === "edit" && initialData
          ? await updateContent(initialData.id, payload)
          : await createContent(payload);

      if (!result.success) {
        setServerError(result.error);
        if (result.error.toLowerCase().includes("slug")) {
          setError("slug", { type: "server", message: result.error });
        }
        toast.error(result.error);
        return;
      }

      const successMessage =
        mode === "edit"
          ? "Perubahan postingan berhasil disimpan."
          : targetStatus === "Draf"
            ? "Postingan berhasil disimpan sebagai draf."
            : targetStatus === "Terjadwal"
              ? "Postingan berhasil dijadwalkan."
              : "Postingan berhasil dipublikasikan.";

      toast.success(successMessage);
      router.push("/admin/semua-postingan");
      router.refresh();
    } catch {
      const fallback = "Terjadi gangguan saat menyimpan postingan. Coba lagi.";
      setServerError(fallback);
      toast.error(fallback);
    } finally {
      setSubmittingStatus(null);
    }
  }

  function handleGenerateSlug() {
    const generated = slugifyTitle(getValues("title") ?? "");
    if (!generated) {
      setError("title", {
        type: "manual",
        message: "Isi judul terlebih dahulu sebelum membuat slug",
      });
      return;
    }
    setValue("slug", generated, { shouldValidate: true, shouldDirty: true });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === "edit" ? "Edit Detail Postingan" : "Detail Postingan"}
        </CardTitle>
        <CardDescription>
          {mode === "edit"
            ? "Perbarui informasi artikel atau berita yang tersimpan."
            : "Isi informasi postingan baru untuk dipublikasikan atau disimpan sebagai draf."}
        </CardDescription>
      </CardHeader>

      <form
        id="content-form"
        noValidate
        onSubmit={handleSubmit((values) =>
          submitWithStatus(values, primaryStatus),
        )}
      >
        <CardContent>
          <FieldGroup>
            {serverError ? (
              <div
                role="alert"
                className="rounded-lg border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
              >
                {serverError}
              </div>
            ) : null}

            <Field data-invalid={!!errors.title}>
              <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="title">Judul</FieldLabel>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {watchedTitle.length}/200
                </span>
              </div>
              <Input
                id="title"
                placeholder="Masukkan judul postingan"
                aria-invalid={!!errors.title}
                disabled={isBusy}
                className="h-10 md:h-9"
                {...register("title")}
              />
              <FieldError errors={[errors.title]} />
            </Field>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field data-invalid={!!errors.slug}>
                <div className="flex items-center justify-between gap-2">
                  <FieldLabel htmlFor="slug">Slug</FieldLabel>
                  <button
                    type="button"
                    onClick={handleGenerateSlug}
                    disabled={isBusy}
                    className="inline-flex min-h-8 items-center rounded px-1.5 text-xs font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-50"
                  >
                    Buat dari judul
                  </button>
                </div>
                <Input
                  id="slug"
                  placeholder="judul-postingan"
                  aria-invalid={!!errors.slug}
                  disabled={isBusy}
                  className="h-10 md:h-9"
                  {...register("slug")}
                />
                <FieldDescription>
                  Kosongkan untuk membuat slug otomatis dari judul.
                </FieldDescription>
                <FieldError errors={[errors.slug]} />
              </Field>

              <Field data-invalid={!!errors.category}>
                <FieldLabel htmlFor="category">Kategori</FieldLabel>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? "Berita"}
                      onValueChange={(value) => {
                        if (value) {
                          field.onChange(value);
                        }
                      }}
                      items={CATEGORY_ITEMS}
                      disabled={isBusy}
                    >
                      <SelectTrigger
                        id="category"
                        aria-invalid={!!errors.category}
                        className="h-10 w-full md:h-9"
                      >
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {POST_CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.category]} />
              </Field>
            </div>

            <Field data-invalid={!!errors.status}>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? "Draf"}
                    onValueChange={(value) => {
                      if (value) {
                        field.onChange(value);
                      }
                    }}
                    items={STATUS_ITEMS}
                    disabled={isBusy}
                  >
                    <SelectTrigger
                      id="status"
                      aria-invalid={!!errors.status}
                      className="h-10 w-full md:h-9 md:w-56"
                    >
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {POST_STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldDescription>
                Pilih Terjadwal jika ingin menyimpan dengan status terjadwal,
                atau gunakan tombol aksi di bawah.
              </FieldDescription>
              <FieldError errors={[errors.status]} />
            </Field>

            <Field data-invalid={!!errors.excerpt}>
              <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="excerpt">Ringkasan</FieldLabel>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {watchedExcerpt.length}/500
                </span>
              </div>
              <textarea
                id="excerpt"
                rows={3}
                placeholder="Ringkasan singkat postingan (opsional)"
                aria-invalid={!!errors.excerpt}
                disabled={isBusy}
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                {...register("excerpt")}
              />
              <FieldError errors={[errors.excerpt]} />
            </Field>

            <Field data-invalid={!!errors.content}>
              <FieldLabel htmlFor="content">Konten</FieldLabel>
              <textarea
                id="content"
                rows={10}
                placeholder="Tulis isi postingan di sini..."
                aria-invalid={!!errors.content}
                disabled={isBusy}
                className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
                {...register("content")}
              />
              <FieldError errors={[errors.content]} />
            </Field>
          </FieldGroup>
        </CardContent>

        <CardFooter className="mt-6 flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            nativeButton={false}
            variant="outline"
            className="min-h-11 w-full sm:min-h-9 sm:w-auto"
            render={<Link href="/admin/semua-postingan" />}
          >
            Batal
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={isBusy}
            className="min-h-11 w-full sm:min-h-9 sm:w-auto"
            onClick={handleSubmit((values) => submitWithStatus(values, "Draf"))}
          >
            {submittingStatus === "Draf" ? "Menyimpan..." : "Simpan Draf"}
          </Button>
          <Button
            type="submit"
            disabled={isBusy}
            className="min-h-11 w-full sm:min-h-9 sm:w-auto"
          >
            {submittingStatus === primaryStatus
              ? "Menyimpan..."
              : primaryLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
