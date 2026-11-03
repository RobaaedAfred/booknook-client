import { authClient } from "./auth-client";
import type { AppSession } from "@/app/types";

export function useAppSession(): AppSession {
  const { data, isPending } = authClient.useSession();

  return { data: data ? { user: data.user } : null, isPending };
}
