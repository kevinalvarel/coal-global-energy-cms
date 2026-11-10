import z from "zod";

export const registerSchemas = z
  .object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password tidak sama!",
  });

export const loginSchemas = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type LoginSchema = z.infer<typeof loginSchemas>;
export type RegisterSchema = z.infer<typeof registerSchemas>;
