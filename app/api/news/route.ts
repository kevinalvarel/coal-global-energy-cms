import { NextRequest, NextResponse } from "next/server";
import { and, count, desc, eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { post } from "@/db/schemas/content-schema";
import { POST_CATEGORIES, type PostCategory } from "@/validations/content-validations";

export type PublishedPost = {
  id: string;
  title: string;
  slug: string;
  category: PostCategory;
  excerpt: string | null;
  imageUrl: string | null;
  createdAt: string; // ISO string (serializable)
};

export type NewsApiResponse = {
  items: PublishedPost[];
  total: number;
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const categoryParam = searchParams.get("category");
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") ?? "12")));
  const offset = (page - 1) * limit;

  const category =
    categoryParam && (POST_CATEGORIES as readonly string[]).includes(categoryParam)
      ? (categoryParam as PostCategory)
      : undefined;

  const conditions = [eq(post.status, "Publikasi")];
  if (category) conditions.push(eq(post.category, category));
  const whereClause = and(...conditions);

  const [rows, countRows] = await Promise.all([
    db
      .select({
        id: post.id,
        title: post.title,
        slug: post.slug,
        category: post.category,
        excerpt: post.excerpt,
        attachments: post.attachments,
        createdAt: post.createdAt,
      })
      .from(post)
      .where(whereClause)
      .orderBy(desc(post.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(post).where(whereClause),
  ]);

  const response: NewsApiResponse = {
    items: rows.map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      category: row.category,
      excerpt: row.excerpt,
      imageUrl: row.attachments[0]?.url ?? null,
      createdAt: row.createdAt.toISOString(),
    })),
    total: Number(countRows[0]?.total ?? 0),
  };

  return NextResponse.json(response);
}
