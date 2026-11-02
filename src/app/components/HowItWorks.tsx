import { FaMagnifyingGlass, FaBookOpen, FaRotateLeft } from "react-icons/fa6";
import SectionHeading from "@/app/components/SectionHeading";
import Reveal from "@/app/components/Reveal";

const steps = [
  { icon: FaMagnifyingGlass, title: "1. Find a book", text: "Search the community shelf by title, author or category." },
  { icon: FaBookOpen, title: "2. Borrow it", text: "Confirm your borrow and pick a return date that suits you." },
  { icon: FaRotateLeft, title: "3. Return it", text: "Done reading? Return it from My Borrows so the next reader can enjoy it." },
];

export default function HowItWorks() {
  return (
    <section className="bg-base-200 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading eyebrow="Easy as 1-2-3" title="How Borrowing Works" subtitle="Three simple steps from browsing to reading." />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col items-center rounded-2xl border border-base-300 bg-base-100 p-8 text-center">
                <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
                  <Icon />
                </span>
                <h3 className="mb-2 font-display text-xl font-bold">{title}</h3>
                <p className="text-base-content/70">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
