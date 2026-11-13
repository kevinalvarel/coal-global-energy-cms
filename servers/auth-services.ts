'use server'

import { z } from "zod"
import { APIError } from "better-auth/api"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { loginSchemas } from "@/validations/auth-validations"

export async function loginAction(input: z.infer<typeof loginSchemas>) {
  const parsed = loginSchemas.safeParse(input)
  if (!parsed.success) return { error: "Input tidak valid" }

  try {
    await auth.api.signInEmail({ body: parsed.data })
  } catch (e) {
    if (e instanceof APIError) {
      return { error: "Email atau password salah" }
    }
    throw e 
  }

  redirect("/admin")
}