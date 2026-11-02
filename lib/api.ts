import { authClient } from "@/lib/auth-client";
import { AUTH_DISABLED } from "@/lib/session";

export const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function parse<T>(res: Response): Promise<T> {
  const body = (await res.json().catch(() => ({}))) as { message?: string };
  if (!res.ok) throw new Error(body.message || "Something went wrong");
  return body as T;
}


export async function publicFetch<T>(path: string): Promise<T> {
  return parse<T>(await fetch(`${API}${path}`, { cache: "no-store" }));
}

export async function authFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  let token = "dev-token"; // ignored by the server when AUTH_DISABLED=true
  if (!AUTH_DISABLED) {
    const { data, error } = await authClient.token();
    if (error || !data?.token) throw new Error("Please log in again");
    token = data.token;
  }

  const res = await fetch(`${API}${path}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  return parse<T>(res);
}
