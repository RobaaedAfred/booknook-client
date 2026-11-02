"use client";

import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { authFetch } from "@/lib/api";
import { errorMessage, uploadToImgbb } from "@/lib/utils";
import { CATEGORIES, type Book } from "@/types";

interface EditBookModalProps {
  book: Book;
  onClose: () => void;
  onSaved: (updated: Book) => void;
}

export default function EditBookModal({ book, onClose, onSaved }: EditBookModalProps) {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const file = form.get("image");

    setSaving(true);
    try {
      const image = file instanceof File && file.size ? await uploadToImgbb(file) : book.image;
      const updated = await authFetch<Book>(`/books/${book._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category: form.get("category"),
          image,
          description: form.get("description"),
          totalCopies: Number(form.get("totalCopies")),
        }),
      });
      toast.success("Book updated successfully!");
      onSaved(updated);
    } catch (err) {
      toast.error(errorMessage(err));
      setSaving(false);
    }
  };

  return (
    <div className="modal modal-open" role="dialog" aria-modal="true">
      <div className="modal-box max-w-2xl rounded-3xl">
        <h3 className="font-display text-2xl font-bold">Edit Book</h3>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Book Title</span>
            <input name="title" required defaultValue={book.title} className="input input-bordered w-full" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Author Name</span>
            <input name="author" required defaultValue={book.author} className="input input-bordered w-full" />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Category</span>
            <select name="category" required defaultValue={book.category} className="select select-bordered w-full">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Total Copies</span>
            <input name="totalCopies" type="number" min="1" step="1" required defaultValue={book.totalCopies} className="input input-bordered w-full" />
          </label>
          <div className="flex items-center gap-4 sm:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={book.image} alt="Current cover" className="h-20 w-16 rounded-lg border border-base-300 object-cover" />
            <label className="block flex-1">
              <span className="mb-1 block text-sm font-medium">Replace image (optional)</span>
              <input name="image" type="file" accept="image/*" className="file-input file-input-bordered w-full" />
            </label>
          </div>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-sm font-medium">Short Description</span>
            <textarea name="description" required rows={4} defaultValue={book.description} className="textarea textarea-bordered w-full" />
          </label>
          <div className="modal-action sm:col-span-2">
            <button type="button" onClick={onClose} className="btn btn-ghost rounded-full">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn btn-primary rounded-full px-8">
              {saving ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/40" onClick={onClose} />
    </div>
  );
}
