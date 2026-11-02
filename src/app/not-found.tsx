import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "BookNook | Page Not Found" };

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-bold text-primary">404</p>
      <h1 className="section-title mt-4">This page wandered off the shelf</h1>
      <p className="mt-3 text-base-content/70">
        The page you are looking for does not exist or has been moved. Let&apos;s get you back to the stacks.
      </p>
      <Link href="/" className="btn btn-primary mt-8 rounded-full px-8">
        Back to Home
      </Link>
    </section>
  );
}
