"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import { useAppSession } from "@/lib/session";
import { authFetch, publicFetch } from "@/lib/api";
import { errorMessage, formatDate } from "@/lib/utils";
import type { Book } from "@/types";
import Spinner from "@/components/Spinner";
import EditBookModal from "@/components/EditBookModal";

export default function MyBooks() {
  const { data: session, isPending } = useAppSession();
  const email = session?.user.email;
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!email) {
      setLoading(false);
      return;
    }
    publicFetch<Book[]>(`/books?email=${encodeURIComponent(email)}`)
      .then(setBooks)
      .catch((e: unknown) => toast.error(errorMessage(e)))
      .finally(() => setLoading(false));
  }, [email, isPending]);

  const confirmDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    try {
      await authFetch<{ deletedCount: number }>(`/books/${deleting._id}`, { method: "DELETE" });
      setBooks((prev) => prev.filter((b) => b._id !== deleting._id));
      toast.success("Book deleted successfully");
      setDeleting(null);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const handleSaved = (updated: Book) => {
    setBooks((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
    setEditing(null);
  };

  if (loading || isPending) return <Spinner />;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="section-title">My Books</h1>
        <p className="mt-2 text-base-content/70">Books you have added to BookNook.</p>
      </div>

      {books.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-base-content/60">You have not added any books yet.</p>
          <Link href="/add-book" className="btn btn-primary mt-6 rounded-full px-8">
            Add Book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>Book</th>
                <th>Category</th>
                <th>Copies</th>
                <th>Added</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b._id}>
                  <td>
                    <div className="flex items-center gap-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.image} alt={b.title} className="h-20 w-16 shrink-0 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold">{b.title}</p>
                        <p className="text-sm text-base-content/60">{b.author}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-secondary badge-outline">{b.category}</span>
                  </td>
                  <td>
                    {b.availableCopies} / {b.totalCopies}
                  </td>
                  <td className="whitespace-nowrap">{formatDate(b.createdAt)}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(b)} className="btn btn-sm btn-outline btn-primary rounded-full">
                        <FaPenToSquare /> Edit
                      </button>
                      <button onClick={() => setDeleting(b)} className="btn btn-sm btn-outline btn-error rounded-full">
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && <EditBookModal book={editing} onClose={() => setEditing(null)} onSaved={handleSaved} />}

      {deleting && (
        <div className="modal modal-open" role="dialog" aria-modal="true">
          <div className="modal-box rounded-3xl">
            <h3 className="font-display text-2xl font-bold">Delete this book?</h3>
            <p className="mt-3 text-base-content/70">
              “{deleting.title}” will be permanently removed, along with any active borrows of it. This cannot be undone.
            </p>
            <div className="modal-action">
              <button onClick={() => setDeleting(null)} className="btn btn-ghost rounded-full">
                Cancel
              </button>
              <button onClick={confirmDelete} disabled={busy} className="btn btn-error rounded-full px-8">
                {busy ? <span className="loading loading-spinner loading-sm" /> : "Yes, Delete"}
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/40" onClick={() => setDeleting(null)} />
        </div>
      )}
    </section>
  );
}
