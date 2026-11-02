import type { Metadata } from "next";
import { Suspense } from "react";
import RegisterForm from "@/app/components/RegisterForm";
import Spinner from "@/app/components/Spinner";

export const metadata: Metadata = { title: "BookNook | Register" };

export default function RegisterPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <RegisterForm />
    </Suspense>
  );
}
