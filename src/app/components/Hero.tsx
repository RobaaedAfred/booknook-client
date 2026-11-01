"use client";

import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaBookOpen, FaHandshakeAngle, FaRotateLeft } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Slide {
  icon: IconType;
  eyebrow: string;
  title: string;
  text: string;
}

const slides: Slide[] = [
  {
    icon: FaBookOpen,
    eyebrow: "A library built by readers",
    title: "Find your next favourite story",
    text: "Browse books shared by our community and borrow them with a single click.",
  },
  {
    icon: FaHandshakeAngle,
    eyebrow: "Share what you love",
    title: "Put your bookshelf to work",
    text: "Add the books you have finished and let other readers enjoy them too.",
  },
  {
    icon: FaRotateLeft,
    eyebrow: "Simple & fair",
    title: "Borrow, read, return",
    text: "Track every borrow in one place and return a book whenever you are done.",
  },
];

const swiperStyle = {
  "--swiper-navigation-color": "var(--color-primary)",
  "--swiper-navigation-size": "22px",
} as CSSProperties;

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="overflow-hidden rounded-3xl border border-base-300"
        style={swiperStyle}
      >
        {slides.map(({ icon: Icon, eyebrow, title, text }, i) => (
          <SwiperSlide key={title}>
            <div className="relative flex min-h-[420px] items-center overflow-hidden bg-linear-to-br from-base-200 to-base-300 px-8 py-16 sm:px-16 md:min-h-[480px]">
              <Icon
                aria-hidden
                className={`absolute -right-10 -bottom-10 text-[18rem] md:text-[24rem] ${
                  i === 0 ? "text-primary/10" : i === 1 ? "text-secondary/15" : "text-accent/25"
                }`}
              />
              <div className="relative max-w-2xl space-y-5">
                <p className="section-eyebrow">{eyebrow}</p>
                <h1 className="section-title !text-4xl md:!text-6xl">{title}</h1>
                <p className="max-w-xl text-lg text-base-content/70">{text}</p>
                <Link href="/books" className="btn btn-primary rounded-full px-8">
                  Browse Books
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
