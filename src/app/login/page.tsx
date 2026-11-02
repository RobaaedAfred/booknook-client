import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/app/components/LoginForm";
import Spinner from "@/app/components/Spinner";

export const metadata: Metadata = { title: "BookNook | Login" };

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  );
}
