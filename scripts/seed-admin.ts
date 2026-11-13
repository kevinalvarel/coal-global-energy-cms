import "dotenv/config";
import { db } from "@/drizzle";
import { user } from "@/db/schemas/auth-schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

async function main() {
  const email = "admin@cge.com";
  const password = "password123";
  const name = "Admin CGE";

  console.log("Mengecek user di database:", email);
  const existing = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existing.length > 0) {
    console.log("User sudah ada:", existing[0].id, existing[0].email);
    return;
  }

  console.log("Mendaftarkan user admin via Better Auth...");
  const res = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });

  console.log("Admin berhasil dibuat:", res);
}

main().catch((err) => {
  console.error("Gagal melakukan seeding admin:", err);
  process.exit(1);
});

