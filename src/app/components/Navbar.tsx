
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/app/components/Logo";
import ThemeToggle from "@/app/components/ThemeToggole";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
    { href: "/add-book", label: "Add Book" },
    { href: "/my-books", label: "My Books" },
    { href: "/my-borrows", label: "My Borrows" },
  ];

  const isActive = (href: string) =>
    href === "/" || href === "/books"
      ? pathname === href
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">

        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle lg:hidden"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h8"
                />
              </svg>
            </div>

            <ul className="menu dropdown-content z-10 mt-3 w-56 gap-1 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      isActive(link.href)
                        ? "rounded-full bg-primary/10 text-primary"
                        : "rounded-full hover:bg-base-200"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Logo />
        </div>

    
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 font-medium ${
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-base-200"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-1 sm:gap-2">
          <ThemeToggle />

          <Link
            href="/login"
            className="btn btn-ghost rounded-full px-4"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="btn btn-primary rounded-full px-5"
          >
            Register
          </Link>
        </div>

      </div>
    </header>
  );
}
