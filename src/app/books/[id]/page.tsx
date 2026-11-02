import type { Metadata } from "next";
import BookDetails from "@/components/BookDetails";

export const metadata: Metadata = { title: "BookNook | Book Details" };

export default function BookDetailsPage() {
  return <BookDetails />;
}
