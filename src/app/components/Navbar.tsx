"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useAppSession } from "@/lib/session";
import type { AppUser } from "@/types";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

function Avatar({ user }: { user: AppUser }) {
  if (user.image) {
    return (
      <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
        <img src={user.image} alt={user.name || "User"} referrerPolicy="no-referrer" />
      </div>
    );
  }
  return (
    <div className="flex w-10 items-center justify-center rounded-full bg-primary text-primary-content">
      <span className="text-sm font-semibold">{(user.name || "U").charAt(0).toUpperCase()}</span>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useAppSession();
  const user = session?.user;

  const links = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
    ...(user
      ? [
          { href: "/add-book", label: "Add Book" },
          { href: "/my-books", label: "My Books" },
          { href: "/my-borrows", label: "My Borrows" },
        ]
      : []),
  ];

  const isActive = (href: string) => (href === "/" || href === "/books" ? pathname === href : pathname.startsWith(href));

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/");
    router.refresh();
  };

  const navItems = links.map((l) => (
    <li key={l.href}>
      <Link
        href={l.href}
        className={`rounded-full px-4 font-medium ${isActive(l.href) ? "bg-primary/10 text-primary" : "hover:bg-base-200"}`}
      >
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle lg:hidden" aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h8" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu dropdown-content z-10 mt-3 w-56 gap-1 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              {navItems}
            </ul>
          </div>
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{navItems}</ul>
        </div>

        <div className="navbar-end gap-1 sm:gap-2">
          <ThemeToggle />
          {isPending ? (
            <span className="skeleton h-10 w-10 rounded-full" />
          ) : user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" aria-label="Open user menu">
                <Avatar user={user} />
              </div>
              <ul tabIndex={0} className="menu dropdown-content z-10 mt-3 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                <li className="pointer-events-none px-3 py-2">
                  <span className="block truncate text-base font-semibold">{user.name}</span>
                  <span className="block truncate text-xs text-base-content/60">{user.email}</span>
                </li>
                <li>
                  <Link href="/profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-error">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost rounded-full px-4">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary rounded-full px-5">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
