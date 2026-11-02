import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "@/components/RegisterForm";
import Spinner from "@/components/Spinner";

export const metadata: Metadata = { title: "BookNook | Register" };

export default function RegisterPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <RegisterForm />
    </Suspense>
  );
}
