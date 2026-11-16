import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

import { auth } from "@/lib/auth";
import {
  POST_ATTACHMENT_CONTENT_TYPES,
  POST_ATTACHMENT_MAX_BYTES,
} from "@/validations/content-validations";

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        const session = await auth.api.getSession({
          headers: request.headers,
        });

        if (!session?.user) {
          throw new Error("Anda harus login untuk mengunggah lampiran");
        }

        return {
          allowedContentTypes: [...POST_ATTACHMENT_CONTENT_TYPES],
          maximumSizeInBytes: POST_ATTACHMENT_MAX_BYTES,
          addRandomSuffix: true,
        };
      },
    });

    return Response.json(jsonResponse);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Gagal mengunggah lampiran",
      },
      { status: 400 },
    );
  }
}
