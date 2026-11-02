"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { publicFetch } from "@/lib/api";
import { CATEGORIES, isCategory, type Book, type Category } from "@/types";
import BookCard from "@/components/BookCard";
import Spinner from "@/components/Spinner";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

export default function AllBooks() {
  const initialCategory = useSearchParams().get("category");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "All">(isCategory(initialCategory) ? initialCategory : "All");

  useEffect(() => {
    publicFetch<Book[]>("/books")
      .then(setBooks)
      .catch((e: unknown) => {
        console.error("Failed to load books:", e);
        setError("Could not load books right now. Is the API server running?");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return books.filter(
      (b) =>
        (category === "All" || b.category === category) &&
        (!q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q))
    );
  }, [books, search, category]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeading eyebrow="The community shelf" title="All Books" subtitle="Every book shared by BookNook readers." />

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or author"
          className="input input-bordered w-full sm:flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(isCategory(e.target.value) ? e.target.value : "All")}
          className="select select-bordered w-full sm:w-52"
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-center text-error">{error}</p>
      ) : filtered.length === 0 ? (
        <p className="py-16 text-center text-base-content/60">No books match your search.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((book, i) => (
            <Reveal key={book._id} delay={(i % 3) * 0.06} className="h-full">
              <BookCard book={book} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
