import Link from "next/link";
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaLocationDot } from "react-icons/fa6";
import Logo from "@/app/components/Logo";

const socials = [
  { icon: FaXTwitter, href: "https://x.com", label: "X" },
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="border-t border-base-300 bg-base-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4 lg:col-span-2">
          <Logo />
          <p className="max-w-md text-base-content/70">
            BookNook is a friendly community library where readers share the books they love and borrow the ones they have
            been waiting to read.
          </p>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="btn btn-circle btn-outline btn-sm border-base-300 hover:border-primary hover:bg-primary hover:text-primary-content"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold">Explore</h3>
          <ul className="space-y-2 text-base-content/70">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/books" className="hover:text-primary">All Books</Link></li>
            <li><Link href="/add-book" className="hover:text-primary">Add a Book</Link></li>
            <li><Link href="/my-borrows" className="hover:text-primary">My Borrows</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold">Contact</h3>
          <ul className="space-y-3 text-base-content/70">
            <li className="flex items-center gap-3"><FaEnvelope className="text-primary" /> hello@booknook.com</li>
            <li className="flex items-center gap-3"><FaPhone className="text-primary" /> +880 1700 000000</li>
            <li className="flex items-center gap-3"><FaLocationDot className="text-primary" /> Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-base-300 py-5 text-center text-sm text-base-content/60">
       2026 BookNook. All rights reserved.
      </div>
    </footer>
  );
}
