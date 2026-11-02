import type { Metadata } from "next";
import { Suspense } from "react";
import AllBooks from "@/components/AllBooks";
import Spinner from "@/components/Spinner";

export const metadata: Metadata = { title: "BookNook | All Books" };

export default function BooksPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <AllBooks />
    </Suspense>
  );
}
