import { authClient } from "./auth-client";
import type { AppSession } from "@/app/types";

/** TEST MODE: set NEXT_PUBLIC_AUTH_DISABLED=true to skip login (must match the server flag). */
export const AUTH_DISABLED = process.env.NEXT_PUBLIC_AUTH_DISABLED === "true";

const TEST_USER = {
  id: "dev-user",
  name: "Test User",
  email: "test@booknook.dev",
  image: null,
} as const;

/** Drop-in replacement for authClient.useSession(). In test mode it returns a fake logged-in user. */
export function useAppSession(): AppSession {
  const { data, isPending } = authClient.useSession();
  if (AUTH_DISABLED) {
    return { data: { user: { ...TEST_USER, createdAt: new Date() } }, isPending: false };
  }
  return { data: data ? { user: data.user } : null, isPending };
}
