import { queryOptions } from "@tanstack/react-query";
import type { NewsApiResponse, PublishedPost } from "@/app/api/news/route";

export type { PublishedPost };

export const newsQueryKeys = {
  all: ["published-news"] as const,
  list: (params?: { category?: string; page?: number; limit?: number }) =>
    [...newsQueryKeys.all, params ?? {}] as const,
};

export function newsQueryOptions(params?: {
  category?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set("category", params.category);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));

  return queryOptions<NewsApiResponse>({
    queryKey: newsQueryKeys.list(params),
    queryFn: async () => {
      const qs = searchParams.toString();
      const res = await fetch(`/api/news${qs ? `?${qs}` : ""}`);
      if (!res.ok) throw new Error("Gagal memuat berita");
      return res.json() as Promise<NewsApiResponse>;
    },
    staleTime: 60_000, // 1 minute
  });
}
