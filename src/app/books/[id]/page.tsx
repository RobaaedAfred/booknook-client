import type { Metadata } from "next";
import BookDetails from "@/app/components/BookDetails";

export const metadata: Metadata = { title: "BookNook | Book Details" };

export default function BookDetailsPage() {
  return <BookDetails />;
}
