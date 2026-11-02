"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa6";
import { authClient } from "../../lib/auth-client";
import { safeRedirect } from "../../lib/utils";

function validatePassword(pw: string): string {
  if (pw.length < 6) return "Password must be at least 6 characters long";
  if (!/[A-Z]/.test(pw)) return "Password must contain an uppercase letter";
  if (!/[a-z]/.test(pw)) return "Password must contain a lowercase letter";
  return "";
}

export default function RegisterForm() {
  const router = useRouter();
  const redirect = safeRedirect(useSearchParams().get("redirect"));
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") ?? "");

    const pwError = validatePassword(password);
    setPasswordError(pwError);
    if (pwError) return; // never register with an invalid password

    const photo = String(form.get("photo") ?? "").trim();
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password,
      image: photo || undefined,
    });
    setLoading(false);

    if (error) {
      const msg = error.message || "Registration failed";
      setFormError(msg);
      toast.error(msg);
      return;
    }
    toast.success("Account created! Please log in.");
    router.push(`/login${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`);
  };

  const handleGoogle = async () => {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    if (error) toast.error(error.message || "Google sign-in failed");
  };

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm">
        <h1 className="section-title text-center">Register</h1>
        <p className="mt-2 text-center text-base-content/70">Create your free BookNook account.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="form-control block">
            <span className="mb-1 block text-sm font-medium">Name</span>
            <input name="name" type="text" required placeholder="Your full name" className="input input-bordered w-full" />
          </label>
          <label className="form-control block">
            <span className="mb-1 block text-sm font-medium">Email</span>
            <input name="email" type="email" required placeholder="you@example.com" className="input input-bordered w-full" />
          </label>
          <label className="form-control block">
            <span className="mb-1 block text-sm font-medium">Photo URL</span>
            <input name="photo" type="url" placeholder="https://example.com/photo.jpg" className="input input-bordered w-full" />
          </label>
          <label className="form-control block">
            <span className="mb-1 block text-sm font-medium">Password</span>
            <input
              name="password"
              type="password"
              required
              placeholder="Min 6 chars, upper & lower case"
              onChange={(e) => setPasswordError(e.target.value ? validatePassword(e.target.value) : "")}
              className={`input input-bordered w-full ${passwordError ? "input-error" : ""}`}
            />
            {passwordError && <span className="mt-1 block text-sm text-error">{passwordError}</span>}
          </label>

          {formError && <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{formError}</p>}

          <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Register"}
          </button>
        </form>

        <div className="divider my-6">or</div>

        <button onClick={handleGoogle} className="btn btn-outline w-full rounded-full">
          <FaGoogle /> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-base-content/70">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
