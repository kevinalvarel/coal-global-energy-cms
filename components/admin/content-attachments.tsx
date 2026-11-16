"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { upload } from "@vercel/blob/client";
import { ImagePlus, X } from "lucide-react";
import { Controller, type Control } from "react-hook-form";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldTitle,
} from "@/components/ui/field";
import {
  MAX_ATTACHMENTS,
  POST_ATTACHMENT_CONTENT_TYPES,
  POST_ATTACHMENT_MAX_BYTES,
  type CreateContentInput,
  type CreateContentOutput,
} from "@/validations/content-validations";

const ACCEPT = POST_ATTACHMENT_CONTENT_TYPES.join(",");
const MAX_MB = POST_ATTACHMENT_MAX_BYTES / (1024 * 1024);

function formatFileSize(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

type PendingUpload = {
  id: string;
  name: string;
  previewUrl: string;
};

interface ContentAttachmentsProps {
  control: Control<CreateContentInput, unknown, CreateContentOutput>;
  disabled?: boolean;
  onUploadingChange?: (uploading: boolean) => void;
}

export function ContentAttachments({
  control,
  disabled = false,
  onUploadingChange,
}: ContentAttachmentsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<PendingUpload[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);

  return (
    <Controller
      name="attachments"
      control={control}
      render={({ field, fieldState }) => {
        const attachments = field.value ?? [];
        const slots = MAX_ATTACHMENTS - attachments.length - pending.length;
        const canAdd = slots > 0 && !disabled;

        async function handleFiles(fileList: FileList | null) {
          if (!fileList?.length) return;

          const files = Array.from(fileList);
          const accepted = files
            .filter(
              (file) =>
                (POST_ATTACHMENT_CONTENT_TYPES as readonly string[]).includes(
                  file.type,
                ) && file.size <= POST_ATTACHMENT_MAX_BYTES,
            )
            .slice(0, Math.max(0, slots));

          setUploadError(
            accepted.length < files.length
              ? `Hanya menerima ${ACCEPT} maksimal ${MAX_MB} MB, dan maksimal ${MAX_ATTACHMENTS} lampiran.`
              : null,
          );
          if (inputRef.current) inputRef.current.value = "";
          if (accepted.length === 0) return;

          const next = [...attachments];
          onUploadingChange?.(true);
          for (const file of accepted) {
            const id = crypto.randomUUID();
            const previewUrl = URL.createObjectURL(file);
            setPending((items) => [...items, { id, name: file.name, previewUrl }]);

            try {
              const blob = await upload(`attachments/${file.name}`, file, {
                access: "public",
                handleUploadUrl: "/api/blob/upload",
              });
              next.push({
                url: blob.url,
                pathname: blob.pathname,
                name: file.name,
                size: file.size,
                contentType: file.type,
              });
              field.onChange([...next]);
              setUploadError(null);
            } catch (error) {
              setUploadError(
                error instanceof Error
                  ? error.message
                  : "Gagal mengunggah lampiran, coba lagi.",
              );
            } finally {
              setPending((items) => items.filter((item) => item.id !== id));
              URL.revokeObjectURL(previewUrl);
            }
          }
          onUploadingChange?.(false);
        }

        function removeAttachment(url: string) {
          field.onChange(attachments.filter((item) => item.url !== url));
        }

        return (
          <Field data-invalid={!!(fieldState.error || uploadError)}>
            <div className="flex items-center justify-between gap-2">
              <FieldTitle>Lampiran Gambar</FieldTitle>
              <span className="text-xs text-muted-foreground tabular-nums">
                {attachments.length}/{MAX_ATTACHMENTS}
              </span>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              multiple
              hidden
              disabled={!canAdd}
              onChange={(event) => void handleFiles(event.target.files)}
            />

            <AttachmentGroup>
              {attachments.map((attachment) => (
                <Attachment
                  key={attachment.url}
                  orientation="vertical"
                  state="done"
                >
                  <AttachmentMedia variant="image">
                    <Image
                      src={attachment.url}
                      alt={attachment.name}
                      width={120}
                      height={120}
                      sizes="96px"
                    />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>{attachment.name}</AttachmentTitle>
                    <AttachmentDescription>
                      {formatFileSize(attachment.size)}
                    </AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction
                      aria-label={`Hapus lampiran ${attachment.name}`}
                      disabled={disabled}
                      className="size-8 after:absolute after:-inset-2 after:content-[''] md:size-6"
                      onClick={() => removeAttachment(attachment.url)}
                    >
                      <X aria-hidden="true" />
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
              ))}

              {pending.map((item) => (
                <Attachment key={item.id} orientation="vertical" state="uploading">
                  <AttachmentMedia variant="image">
                    {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview lokal, tidak bisa dioptimasi next/image */}
                    <img
                      src={item.previewUrl}
                      alt=""
                      width={120}
                      height={120}
                    />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>{item.name}</AttachmentTitle>
                    <AttachmentDescription>Mengunggah...</AttachmentDescription>
                  </AttachmentContent>
                </Attachment>
              ))}

              {canAdd ? (
                <Attachment orientation="vertical" state="idle">
                  <AttachmentMedia>
                    <ImagePlus aria-hidden="true" />
                  </AttachmentMedia>
                  <AttachmentContent className="text-center">
                    <AttachmentTitle>Tambah</AttachmentTitle>
                  </AttachmentContent>
                  <AttachmentTrigger
                    aria-label="Tambah lampiran gambar"
                    disabled={disabled}
                    onClick={() => inputRef.current?.click()}
                  />
                </Attachment>
              ) : null}
            </AttachmentGroup>

            <FieldDescription>
              JPG, PNG, WebP, atau GIF. Maksimal {MAX_MB} MB per gambar, sampai{" "}
              {MAX_ATTACHMENTS} gambar.
              {/* shortcut: blob lama tidak dihapus saat lampiran dilepas, bersihkan lewat cron kalau kuota mulai penuh */}
            </FieldDescription>

            {fieldState.error || uploadError ? (
              <FieldError>{fieldState.error?.message ?? uploadError}</FieldError>
            ) : null}
          </Field>
        );
      }}
    />
  );
}
