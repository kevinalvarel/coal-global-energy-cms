'use server'

import { and, count, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { db } from "@/drizzle";
import { user } from "@/db/schemas/auth-schema";
import { post } from "@/db/schemas/content-schema";
import { auth } from "@/lib/auth";
import {
  contentIdSchema,
  contentSlugSchema,
  createContentSchema,
  getContentsQuerySchema,
  getPublishedContentsQuerySchema,
  type CreateContentInput,
  type GetContentsQuery,
  type GetPublishedContentsQuery,
  type PostCategory,
  type PostStatus,
} from "@/validations/content-validations";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type ContentAuthor = {
  id: string;
  name: string;
};

export type ContentSummary = {
  id: string;
  title: string;
  slug: string;
  category: PostCategory;
  status: PostStatus;
  excerpt: string | null;
  author: ContentAuthor | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ContentDetail = ContentSummary & {
  content: string;
};

export type PaginatedContents = {
  items: ContentSummary[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type PostRowBase = {
  id: string;
  title: string;
  slug: string;
  category: PostCategory;
  status: PostStatus;
  excerpt: string | null;
  authorId: string;
  authorName: string | null;
  createdAt: Date;
  updatedAt: Date;
};

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

function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, "\\$&");
}

function isUniqueConstraintError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const record = error as { code?: unknown; cause?: unknown };
  if (record.code === "23505") return true;
  if (typeof record.cause === "object" && record.cause !== null) {
    return (record.cause as { code?: unknown }).code === "23505";
  }
  return false;
}

function mapSummaryRow(row: PostRowBase): ContentSummary {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    status: row.status,
    excerpt: row.excerpt,
    author: row.authorName
      ? { id: row.authorId, name: row.authorName }
      : null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

async function requireAuthSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user ? session : null;
}

function revalidateContentPaths(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/semua-postingan");
  revalidatePath("/admin/draf");
  revalidatePath("/admin/terjadwalkan");
  revalidatePath("/news");
  if (slug) {
    revalidatePath(`/news/${slug}`);
  }
}

async function fetchContentList(filters: {
  status?: PostStatus;
  category?: PostCategory;
  search?: string;
  page: number;
  limit: number;
}): Promise<PaginatedContents> {
  const conditions: SQL[] = [];

  if (filters.status) {
    conditions.push(eq(post.status, filters.status));
  }
  if (filters.category) {
    conditions.push(eq(post.category, filters.category));
  }
  if (filters.search) {
    const pattern = `%${escapeLikePattern(filters.search)}%`;
    const searchCondition = or(
      ilike(post.title, pattern),
      ilike(post.excerpt, pattern),
      ilike(post.slug, pattern),
    );
    if (searchCondition) {
      conditions.push(searchCondition);
    }
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;
  const offset = (filters.page - 1) * filters.limit;

  const [rows, countRows] = await Promise.all([
    db
      .select({
        id: post.id,
        title: post.title,
        slug: post.slug,
        category: post.category,
        status: post.status,
        excerpt: post.excerpt,
        authorId: post.authorId,
        authorName: user.name,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      })
      .from(post)
      .leftJoin(user, eq(post.authorId, user.id))
      .where(whereClause)
      .orderBy(desc(post.createdAt))
      .limit(filters.limit)
      .offset(offset),
    db.select({ total: count() }).from(post).where(whereClause),
  ]);

  const total = Number(countRows[0]?.total ?? 0);

  return {
    items: rows.map(mapSummaryRow),
    pagination: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages: total === 0 ? 0 : Math.ceil(total / filters.limit),
    },
  };
}

async function fetchContentDetail(
  whereClause: SQL,
): Promise<ContentDetail | null> {
  const rows = await db
    .select({
      id: post.id,
      title: post.title,
      slug: post.slug,
      category: post.category,
      status: post.status,
      excerpt: post.excerpt,
      content: post.content,
      authorId: post.authorId,
      authorName: user.name,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    })
    .from(post)
    .leftJoin(user, eq(post.authorId, user.id))
    .where(whereClause)
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  return {
    ...mapSummaryRow(row),
    content: row.content,
  };
}

async function fetchAdminContentDetail(
  schema: typeof contentIdSchema | typeof contentSlugSchema,
  value: string,
  invalidFallback: string,
  buildWhere: (parsedValue: string) => SQL,
): Promise<ActionResult<ContentDetail>> {
  const session = await requireAuthSession();
  if (!session) {
    return {
      success: false,
      error: "Anda harus login untuk mengakses konten admin",
    };
  }

  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? invalidFallback,
    };
  }

  const item = await fetchContentDetail(buildWhere(parsed.data));
  if (!item) {
    return { success: false, error: "Konten tidak ditemukan" };
  }

  return { success: true, data: item };
}


export async function createContent(
  input: CreateContentInput,
): Promise<ActionResult<ContentDetail>> {
  const session = await requireAuthSession();
  if (!session) {
    return {
      success: false,
      error: "Anda harus login untuk membuat konten",
    };
  }

  const parsed = createContentSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Input konten tidak valid",
    };
  }

  const resolvedSlug = parsed.data.slug ?? slugifyTitle(parsed.data.title);
  if (!resolvedSlug) {
    return {
      success: false,
      error: "Slug gagal dibuat dari judul, silakan isi slug secara manual",
    };
  }

  const existing = await db
    .select({ id: post.id })
    .from(post)
    .where(eq(post.slug, resolvedSlug))
    .limit(1);

  if (existing.length > 0) {
    return {
      success: false,
      error: "Slug sudah digunakan, silakan gunakan slug lain",
    };
  }

  try {
    const [inserted] = await db
      .insert(post)
      .values({
        title: parsed.data.title,
        slug: resolvedSlug,
        category: parsed.data.category,
        status: parsed.data.status,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        authorId: session.user.id,
      })
      .returning();

    if (!inserted) {
      return { success: false, error: "Gagal menyimpan konten" };
    }

    revalidateContentPaths(
      inserted.status === "Publikasi" ? inserted.slug : undefined,
    );

    return {
      success: true,
      data: {
        id: inserted.id,
        title: inserted.title,
        slug: inserted.slug,
        category: inserted.category,
        status: inserted.status,
        excerpt: inserted.excerpt,
        content: inserted.content,
        author: {
          id: session.user.id,
          name: session.user.name,
        },
        createdAt: inserted.createdAt,
        updatedAt: inserted.updatedAt,
      },
    };
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return {
        success: false,
        error: "Slug sudah digunakan, silakan gunakan slug lain",
      };
    }
    return { success: false, error: "Terjadi kesalahan saat menyimpan konten" };
  }
}

export async function getContents(
  query: GetContentsQuery = {},
): Promise<ActionResult<PaginatedContents>> {
  const session = await requireAuthSession();
  if (!session) {
    return {
      success: false,
      error: "Anda harus login untuk mengakses konten admin",
    };
  }

  const parsed = getContentsQuerySchema.safeParse(query);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Parameter query tidak valid",
    };
  }

  const data = await fetchContentList(parsed.data);
  return { success: true, data };
}

export async function getContentById(
  id: string,
): Promise<ActionResult<ContentDetail>> {
  return fetchAdminContentDetail(
    contentIdSchema,
    id,
    "ID konten tidak valid",
    (parsedId) => eq(post.id, parsedId),
  );
}

export async function getContentBySlug(
  slug: string,
): Promise<ActionResult<ContentDetail>> {
  return fetchAdminContentDetail(
    contentSlugSchema,
    slug,
    "Slug konten tidak valid",
    (parsedSlug) => eq(post.slug, parsedSlug),
  );
}

export async function getPublishedContents(
  query: GetPublishedContentsQuery = {},
): Promise<ActionResult<PaginatedContents>> {
  const parsed = getPublishedContentsQuerySchema.safeParse(query);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Parameter query tidak valid",
    };
  }

  const data = await fetchContentList({
    ...parsed.data,
    status: "Publikasi",
  });
  return { success: true, data };
}

export async function getPublishedContentBySlug(
  slug: string,
): Promise<ActionResult<ContentDetail>> {
  const parsed = contentSlugSchema.safeParse(slug);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Slug konten tidak valid",
    };
  }

  const whereClause = and(
    eq(post.slug, parsed.data),
    eq(post.status, "Publikasi"),
  );
  if (!whereClause) {
    return { success: false, error: "Slug konten tidak valid" };
  }

  const item = await fetchContentDetail(whereClause);
  if (!item) {
    return { success: false, error: "Konten tidak ditemukan" };
  }

  return { success: true, data: item };
}

