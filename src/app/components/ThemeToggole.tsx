"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "booknook-dark");
  }, []);

  const toggle = () => {
    const next = dark ? "booknook" : "booknook-dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("booknook-theme", next);
    } catch {}
    setDark(!dark);
  };

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost btn-circle"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light theme" : "Dark theme"}
    >
      {dark ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
    </button>
  );
}
