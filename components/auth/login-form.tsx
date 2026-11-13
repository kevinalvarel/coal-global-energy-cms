"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/servers/auth-services";
import { loginSchemas, type LoginSchema } from "@/validations/auth-validations";

function isRedirectError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const digest = (error as { digest?: unknown }).digest;
  return typeof digest === "string" && digest.startsWith("NEXT_REDIRECT");
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchemas),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    setServerError(null);
    try {
      const res = await loginAction(data);
      if (res?.error) {
        setServerError(res.error);
        toast.error(res.error);
      }
    } catch (error) {
      if (isRedirectError(error)) {
        throw error;
      }
      const fallback =
        "Terjadi gangguan saat mencoba masuk. Silakan coba lagi.";
      setServerError(fallback);
      toast.error(fallback);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Masuk ke akun Admin</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Masukkan email yang terdaftar pada sistem CGE
          </p>
        </div>

        {serverError ? (
          <div
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-sm text-destructive"
          >
            {serverError}
          </div>
        ) : null}

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="contoh@example.com"
            autoComplete="email"
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.password}>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Kata Sandi</FieldLabel>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isSubmitting}
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <FieldError errors={[errors.password]} />
        </Field>

        <Field>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-h-11 w-full sm:min-h-9"
          >
            {isSubmitting ? "Memproses..." : "Masuk"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
