"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { publicFetch } from "../../lib/api";
import type { Book } from "@/app/types";
import BookCard from "@/app/components/BookCard";
import Spinner from "@/app/components/Spinner";
import SectionHeading from "@/app/components/SectionHeading";
import Reveal from "@/app/components/Reveal";

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    publicFetch<Book[]>("/books?sort=newest&limit=6")
      .then(setBooks)
      .catch((e: unknown) => {
        console.error("Failed to load new arrivals:", e);
        setError("Could not load books right now. Is the API server running?");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading eyebrow="Fresh on the shelf" title="New Arrivals" subtitle="The latest books added by our community." />
      {loading ? (
        <Spinner className="min-h-[300px]" />
      ) : error ? (
        <p className="text-center text-error">{error}</p>
      ) : books.length === 0 ? (
        <p className="text-center text-base-content/60">No books yet. Be the first to add one!</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => (
            <Reveal key={book._id} delay={(i % 3) * 0.08} className="h-full">
              <BookCard book={book} />
            </Reveal>
          ))}
        </div>
      )}
      <div className="mt-10 text-center">
        <Link href="/books" className="btn btn-primary rounded-full px-8">
          See All Books
        </Link>
      </div>
    </section>
  );
}
