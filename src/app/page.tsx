import type { Metadata } from "next";
import Hero from "@/app/components/Hero";
import NewArrivals from "@/app/components/NewArrivals";
import HowItWorks from "@/app/components/HowItWorks";
import TopCategories from "@/app/components/TopCategories";

export const metadata: Metadata = { title: "BookNook | Home" };

export default function Home() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <HowItWorks/>
      <TopCategories />
    </>
  );
}
