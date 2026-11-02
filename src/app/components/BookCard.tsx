import Link from "next/link";
import type { Book } from "@/types";
import Image from "next/image";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 transition hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[3/4] w-full overflow-hidden bg-base-200">
        <Image
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="badge badge-secondary badge-outline w-fit">{book.category}</span>
        <h3 className="line-clamp-1 font-display text-xl font-bold">{book.title}</h3>
        <p className="line-clamp-1 text-sm text-base-content/70">by {book.author}</p>
        <Link href={`/books/${book._id}`} className="btn btn-primary mt-auto rounded-full">
          View Details
        </Link>
      </div>
    </article>
  );
}
