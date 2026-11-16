import z from "zod";

export const POST_CATEGORIES = [
  "Berita",
  "Artikel",
  "Edukasi",
  "Laporan",
] as const;

export const POST_STATUSES = ["Draf", "Terjadwal", "Publikasi"] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];
export type PostStatus = (typeof POST_STATUSES)[number];

export const POST_ATTACHMENT_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const MAX_ATTACHMENTS = 8;
export const POST_ATTACHMENT_MAX_BYTES = 5 * 1024 * 1024;

export const postAttachmentSchema = z.object({
  url: z.url({ error: "URL lampiran tidak valid" }),
  pathname: z.string().min(1, { error: "Path lampiran tidak valid" }),
  name: z
    .string()
    .min(1, { error: "Nama file wajib diisi" })
    .max(255, { error: "Nama file terlalu panjang" }),
  size: z.number().int().nonnegative(),
  contentType: z.string().min(1, { error: "Tipe file tidak valid" }),
});

export type PostAttachment = z.infer<typeof postAttachmentSchema>;

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const createContentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { error: "Judul wajib diisi" })
    .max(200, { error: "Judul maksimal 200 karakter" }),
  slug: z
    .string()
    .trim()
    .max(220, { error: "Slug maksimal 220 karakter" })
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined))
    .refine((value) => value === undefined || SLUG_REGEX.test(value), {
      error: "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (-)",
    }),
  category: z
    .enum(POST_CATEGORIES, { error: "Kategori tidak valid" })
    .default("Berita"),
  status: z
    .enum(POST_STATUSES, { error: "Status tidak valid" })
    .default("Draf"),
  excerpt: z
    .string()
    .trim()
    .max(500, { error: "Ringkasan maksimal 500 karakter" })
    .optional()
    .nullable()
    .transform((value) => (value && value.length > 0 ? value : null)),
  content: z.string().trim().min(1, { error: "Konten wajib diisi" }),
  attachments: z
    .array(postAttachmentSchema)
    .max(MAX_ATTACHMENTS, {
      error: `Lampiran maksimal ${MAX_ATTACHMENTS} file`,
    })
    .default([]),
});

export const getContentsQuerySchema = z.object({
  status: z.enum(POST_STATUSES, { error: "Status tidak valid" }).optional(),
  category: z
    .enum(POST_CATEGORIES, { error: "Kategori tidak valid" })
    .optional(),
  search: z.string().trim().max(100).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

export const getPublishedContentsQuerySchema = getContentsQuerySchema.omit({
  status: true,
});

export const contentIdSchema = z
  .string()
  .trim()
  .min(1, { error: "ID konten wajib diisi" });

export const contentSlugSchema = z
  .string()
  .trim()
  .min(1, { error: "Slug konten wajib diisi" })
  .max(220, { error: "Slug maksimal 220 karakter" });

export const updateContentSchema = createContentSchema;

export type CreateContentInput = z.input<typeof createContentSchema>;
export type CreateContentOutput = z.output<typeof createContentSchema>;
export type UpdateContentInput = z.input<typeof updateContentSchema>;
export type GetContentsQuery = z.input<typeof getContentsQuerySchema>;
export type GetPublishedContentsQuery = z.input<
  typeof getPublishedContentsQuerySchema
>;

