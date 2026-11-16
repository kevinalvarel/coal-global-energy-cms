"use server";

import { desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle";
import { user } from "@/db/schemas/auth-schema";
import { auth } from "@/lib/auth";
import {
  createUserSchema,
  type CreateUserInput,
} from "@/validations/user-validations";

export type UserListItem = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserResult =
  | { success: true; data: { id: string; name: string; email: string } }
  | { success: false; error: string };

export async function getUsers(): Promise<UserListItem[]> {
  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
    .from(user)
    .orderBy(desc(user.createdAt));

  return users;
}

export async function createUserAction(
  input: CreateUserInput
): Promise<CreateUserResult> {
  const parsed = createUserSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Input tidak valid",
    };
  }

  const normalizedEmail = parsed.data.email.toLowerCase().trim();

  try {
    const ctx = await auth.$context;

    const existingUser = await ctx.internalAdapter.findUserByEmail(
      normalizedEmail
    );
    if (existingUser?.user) {
      return {
        success: false,
        error: "Email sudah terdaftar. Gunakan email lain.",
      };
    }

    const hash = await ctx.password.hash(parsed.data.password);

    const createdUser = await ctx.internalAdapter.createUser(
      {
        name: parsed.data.name.trim(),
        email: normalizedEmail,
        emailVerified: parsed.data.emailVerified,
      },
      { method: "email-password" }
    );

    if (!createdUser) {
      return {
        success: false,
        error: "Gagal membuat pengguna baru.",
      };
    }

    await ctx.internalAdapter.linkAccount({
      userId: createdUser.id,
      providerId: "credential",
      accountId: createdUser.id,
      password: hash,
    });

    revalidatePath("/admin/pengaturan-pengguna");

    return {
      success: true,
      data: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menambahkan pengguna",
    };
  }
}

