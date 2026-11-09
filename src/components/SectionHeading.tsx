type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  /** Let the title run the full width, for long one-line headings. */
  wide?: boolean;
};

export default function SectionHeading({ eyebrow, title, description, align = "left", wide }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : wide ? "" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-bold tracking-tight sm:text-4xl ${wide ? "lg:whitespace-nowrap" : ""}`}>{title}</h2>
      {description && <p className={`mt-4 text-base leading-relaxed text-muted sm:text-lg ${wide ? "max-w-2xl" : ""}`}>{description}</p>}
    </div>
  );
}
