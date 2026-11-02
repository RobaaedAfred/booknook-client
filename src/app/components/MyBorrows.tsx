"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRotateLeft } from "react-icons/fa6";
import { authFetch } from "../../lib/api";
import { useAppSession } from "../../lib/session";
import { errorMessage, formatDate } from "../../lib/utils";
import type { Borrow } from "@/app/types";
import Spinner from "@/app/components/Spinner";
import Image from "next/image";

export default function MyBorrows() {
  const { data: session, isPending } = useAppSession();
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  useEffect(() => {
    if (isPending) return;
    if (!session) {
      setLoading(false);
      return;
    }
    authFetch<Borrow[]>("/borrows")
      .then(setBorrows)
      .catch((e: unknown) => toast.error(errorMessage(e)))
      .finally(() => setLoading(false));
  }, [session, isPending]);

  const handleReturn = async (id: string) => {
    setReturningId(id);
    try {
      await authFetch<{ deletedCount: number }>(`/borrows/${id}`, { method: "DELETE" });
      setBorrows((prev) => prev.filter((b) => b._id !== id));
      toast.success("Book returned. Thank you!");
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setReturningId(null);
    }
  };

  if (loading || isPending) return <Spinner />;

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="section-title">My Borrows</h1>
        <p className="mt-2 text-base-content/70">Books you are currently reading.</p>
      </div>

      {borrows.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-base-content/60">You have not borrowed any books.</p>
          <Link href="/books" className="btn btn-primary mt-6 rounded-full px-8">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Borrow Date</th>
                <th>Return Date</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((b) => (
                <tr key={b._id}>
                  <td>
                    <Image src={b.bookImage} alt={b.bookTitle} className="h-20 w-16 rounded-lg object-cover" />
                  </td>
                  <td className="font-semibold">{b.bookTitle}</td>
                  <td className="whitespace-nowrap">{formatDate(b.borrowDate)}</td>
                  <td className="whitespace-nowrap">{formatDate(b.returnDate)}</td>
                  <td className="text-right">
                    <button
                      onClick={() => handleReturn(b._id)}
                      disabled={returningId === b._id}
                      className="btn btn-sm btn-primary rounded-full"
                    >
                      {returningId === b._id ? <span className="loading loading-spinner loading-xs" /> : <FaRotateLeft />}
                      Return Book
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
