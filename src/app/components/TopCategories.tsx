import Link from "next/link";
import { FaFeatherPointed, FaFlask, FaLandmark, FaChildReaching, FaLayerGroup } from "react-icons/fa6";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const categories = [
  { name: "Fiction", icon: FaFeatherPointed, text: "Novels & stories" },
  { name: "Science", icon: FaFlask, text: "Ideas that explain the world" },
  { name: "History", icon: FaLandmark, text: "People, places & past" },
  { name: "Kids", icon: FaChildReaching, text: "Picture & bedtime books" },
  { name: "Others", icon: FaLayerGroup, text: "Everything in between" },
];

export default function TopCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading eyebrow="Pick a shelf" title="Top Categories" subtitle="Jump straight to the kind of book you are in the mood for." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {categories.map(({ name, icon: Icon, text }, i) => (
          <Reveal key={name} delay={i * 0.06} className="h-full">
            <Link
              href={`/books?category=${name}`}
              className="group flex h-full flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-6 text-center transition hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-xl text-secondary transition group-hover:bg-secondary group-hover:text-secondary-content">
                <Icon />
              </span>
              <h3 className="font-display text-lg font-bold">{name}</h3>
              <p className="mt-1 text-sm text-base-content/60">{text}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
