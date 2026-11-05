"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppSession } from "../../lib/session";
import { authFetch } from "../../lib/api";
import { errorMessage, formatDate } from "../../lib/utils";
import type { Book } from "@/app/types";
import Spinner from "@/app/components/Spinner";
import BorrowModal from "@/app/components/BorrowModal";
import Image from "next/image";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useAppSession();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    authFetch<Book>(`/books/${id}`)
      .then(setBook)
      .catch((e: unknown) => setError(errorMessage(e)))
      .finally(() => setLoading(false));
  }, [id, session, isPending, router, pathname]);

  const handleBorrowClick = () => {
    if (!session) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    setOpen(true);
  };

  const handleBorrowed = () => {
    setOpen(false);
    toast.success("Book borrowed successfully!");
    router.push("/my-borrows");
  };

  if (loading || isPending) return <Spinner />;

  if (error || !book) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="section-title">{error ? "Could not load book" : "Book not found"}</h1>
        <p className="mt-3 text-base-content/70">{error || "This book may have been removed."}</p>
        <Link href="/books" className="btn btn-primary mt-8 rounded-full px-8">
          Back to All Books
        </Link>
      </div>
    );
  }

  const available = (book.availableCopies ?? 0) > 0;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-3xl border border-base-300 bg-base-200">
         
            <Image src={book.image} alt={book.title} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="space-y-5 md:col-span-3">
          <span className="badge badge-secondary badge-outline">{book.category}</span>
          <h1 className="section-title">{book.title}</h1>
          <p className="text-lg text-base-content/70">by {book.author}</p>

          <p className="leading-relaxed text-base-content/80">{book.description}</p>

          <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-base-300 bg-base-200 p-5 text-sm">
            <div>
              <dt className="text-base-content/60">Added by</dt>
              <dd className="font-semibold">{book.addedBy?.name}</dd>
              <dd className="truncate text-base-content/60">{book.addedBy?.email}</dd>
            </div>
            <div>
              <dt className="text-base-content/60">Date added</dt>
              <dd className="font-semibold">{formatDate(book.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-base-content/60">Available copies</dt>
              <dd className="font-semibold">
                {book.availableCopies} of {book.totalCopies}
              </dd>
            </div>
          </dl>

          <button onClick={handleBorrowClick} disabled={!available} className="btn btn-primary rounded-full px-10">
            {available ? "Borrow This Book" : "Not Available"}
          </button>
        </div>
      </div>

      {open && session && (
        <BorrowModal book={book} user={session.user} onClose={() => setOpen(false)} onBorrowed={handleBorrowed} />
      )}
    </section>
  );
}
