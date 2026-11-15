import { count, eq } from "drizzle-orm";
import { db } from "@/drizzle";
import { post } from "@/db/schemas/content-schema";

export type DashboardStats = {
  totalPosts: number;
  totalDraft: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const [totalRow, draftRow] = await Promise.all([
    db.select({ total: count() }).from(post),
    db.select({ total: count() }).from(post).where(eq(post.status, "Draf")),
  ]);

  return {
    totalPosts: Number(totalRow[0]?.total ?? 0),
    totalDraft: Number(draftRow[0]?.total ?? 0),
  };
}

