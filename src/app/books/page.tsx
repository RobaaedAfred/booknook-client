import type { Metadata } from "next";
import { Suspense } from "react";
import AllBooks from "@/app/components/AllBooks";
import Spinner from "@/app/components/Spinner";

export const metadata: Metadata = { title: "BookNook | All Books" };

export default function BooksPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <AllBooks />
    </Suspense>
  );
}
