export function formatDate(value?: string | Date | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


export function safeRedirect(path: string | null | undefined): string {
  return path && path.startsWith("/") && !path.startsWith("//") ? path : "/";
}

export async function uploadToImgbb(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("imgbb API key is missing (NEXT_PUBLIC_IMGBB_KEY)");

  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: form });
  const json = (await res.json()) as { data?: { url?: string } };
  if (!res.ok || !json.data?.url) throw new Error("Image upload failed");
  return json.data.url;
}


export function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Something went wrong";
}
