"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAppSession } from "../../lib/session";
import { authFetch } from "../../lib/api";
import { errorMessage, uploadToImgbb } from "../../lib/utils";
import { CATEGORIES, type Book } from "@/app/types";
import Spinner from "@/app/components/Spinner";
import Image from "next/image";

export default function AddBookForm() {
  const router = useRouter();
  const { data: session, isPending } = useAppSession();
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState("");

  if (isPending) return <Spinner />;
  const user = session?.user;

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const file = form.get("image");
    if (!(file instanceof File) || !file.size) {
      toast.error("Please choose a book image");
      return;
    }

    setSubmitting(true);
    try {
      const image = await uploadToImgbb(file);
      await authFetch<Book>("/books", {
        method: "POST",
        body: JSON.stringify({
          title: form.get("title"),
          author: form.get("author"),
          category: form.get("category"),
          image,
          description: form.get("description"),
          totalCopies: Number(form.get("totalCopies")),
        }),
      });
      toast.success("Book added successfully!");
      router.push("/my-books");
    } catch (err) {
      toast.error(errorMessage(err));
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="section-title">Add a Book</h1>
        <p className="mt-2 text-base-content/70">Share a book with the BookNook community.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 rounded-3xl border border-base-300 bg-base-100 p-6 sm:grid-cols-2 sm:p-8">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Book Title</span>
          <input name="title" required placeholder="e.g. The Quiet Orchard" className="input input-bordered w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Author Name</span>
          <input name="author" required placeholder="e.g. Maren Hollis" className="input input-bordered w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Category</span>
          <select name="category" required defaultValue="" className="select select-bordered w-full">
            <option value="" disabled>
              Select a category
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Total Copies</span>
          <input name="totalCopies" type="number" min="1" step="1" required defaultValue="1" className="input input-bordered w-full" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium">Book Image</span>
          <input name="image" type="file" accept="image/*" required onChange={handleFile} className="file-input file-input-bordered w-full" />
        </label>
        {preview && (
          <div className="sm:col-span-2">
       
            <Image src={preview} alt="Preview" className="h-40 rounded-xl border border-base-300 object-cover" />
          </div>
        )}
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium">Short Description</span>
          <textarea name="description" required rows={4} placeholder="What is this book about?" className="textarea textarea-bordered w-full" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Your Name</span>
          <input value={user?.name || ""} readOnly className="input input-bordered w-full bg-base-200" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Your Email</span>
          <input value={user?.email || ""} readOnly className="input input-bordered w-full bg-base-200" />
        </label>

        <button type="submit" disabled={submitting} className="btn btn-primary rounded-full sm:col-span-2">
          {submitting ? <span className="loading loading-spinner loading-sm" /> : "Add Book"}
        </button>
      </form>
    </section>
  );
}
