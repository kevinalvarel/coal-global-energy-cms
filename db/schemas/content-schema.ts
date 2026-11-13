import { relations } from "drizzle-orm/_relations";
import { index, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const postCategoryEnum = pgEnum("post_category", [
  "Berita",
  "Artikel",
  "Edukasi",
  "Laporan",
]);

export const postStatusEnum = pgEnum("post_status", [
  "Draf",
  "Terjadwal",
  "Publikasi",
]);

export const post = pgTable(
  "post",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    category: postCategoryEnum("category").default("Berita").notNull(),
    status: postStatusEnum("status").default("Draf").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    authorId: text("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("post_authorId_idx").on(table.authorId),
    index("post_status_idx").on(table.status),
    index("post_category_idx").on(table.category),
    index("post_createdAt_idx").on(table.createdAt),
  ],
);

export const postRelations = relations(post, ({ one }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.id],
  }),
}));

