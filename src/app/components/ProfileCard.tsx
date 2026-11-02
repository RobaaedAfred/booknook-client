"use client";

import { useAppSession } from "../../lib/session";
import { formatDate } from "../../lib/utils";
import Spinner from "@/app/components/Spinner";
import Image from "next/image";

export default function ProfileCard() {
  const { data: session, isPending } = useAppSession();
  if (isPending) return <Spinner />;
  const user = session?.user;
  if (!user) return null;

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-3xl border border-base-300 bg-base-100 p-8 text-center">
        <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full ring-4 ring-primary/30">
          {user.image ? (
            
            <Image src={user.image} alt={user.name} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary text-4xl font-bold text-primary-content">
              {(user.name || "U").charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h1 className="section-title">{user.name}</h1>
        <p className="mt-2 text-base-content/70">{user.email}</p>
        <p className="mt-4 text-sm text-base-content/60">Member since {formatDate(user.createdAt)}</p>
      </div>
    </section>
  );
}
