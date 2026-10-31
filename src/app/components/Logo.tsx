import Link from "next/link";
import { FaBookOpen } from "react-icons/fa6";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="BookNook home">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-content">
        <FaBookOpen className="text-lg" />
      </span>
      <span className="font-display text-2xl font-bold tracking-tight text-base-content">BookNook</span>
    </Link>
  );
}
