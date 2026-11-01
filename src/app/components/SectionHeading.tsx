interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-10 space-y-2 ${align === "center" ? "text-center" : ""}`}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className={`text-base-content/70 ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{subtitle}</p>}
    </div>
  );
}
