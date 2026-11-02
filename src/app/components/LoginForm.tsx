"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { safeRedirect } from "@/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  const redirect = safeRedirect(useSearchParams().get("redirect"));
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    const form = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    });
    setLoading(false);

    if (error) {
      const msg = error.message || "Invalid email or password";
      setFormError(msg);
      toast.error(msg);
      return;
    }
    toast.success("Welcome back!");
    router.push(redirect);
    router.refresh();
  };

  const handleGoogle = async () => {
    const { error } = await authClient.signIn.social({ provider: "google", callbackURL: redirect });
    if (error) toast.error(error.message || "Google login failed");
  };

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm">
        <h1 className="section-title text-center">Login</h1>
        <p className="mt-2 text-center text-base-content/70">Welcome back to BookNook.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="form-control block">
            <span className="mb-1 block text-sm font-medium">Email</span>
            <input name="email" type="email" required placeholder="you@example.com" className="input input-bordered w-full" />
          </label>
          <label className="form-control block">
            <span className="mb-1 block text-sm font-medium">Password</span>
            <input name="password" type="password" required placeholder="Your password" className="input input-bordered w-full" />
          </label>
          <div className="text-right">
            <button
              type="button"
              onClick={() => toast("Password reset is not available yet.", { icon: "ℹ️" })}
              className="link link-hover text-sm text-primary"
            >
              Forget Password?
            </button>
          </div>

          {formError && <p className="rounded-lg bg-error/10 px-3 py-2 text-sm text-error">{formError}</p>}

          <button type="submit" disabled={loading} className="btn btn-primary w-full rounded-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Login"}
          </button>
        </form>

        <div className="divider my-6">or</div>

        <button onClick={handleGoogle} className="btn btn-outline w-full rounded-full">
          <FaGoogle /> Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-base-content/70">
          New to BookNook?{" "}
          <Link href={`/register${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="font-semibold text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
