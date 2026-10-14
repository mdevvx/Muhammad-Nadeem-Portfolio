import { Plus } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { faqs } from "@/lib/site";

export default function Faq() {
  return (
    <section id="faq" className="py-16 sm:py-20">
      <div data-reveal className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Straight answers, <span className="text-gradient">no fluff</span>
            </>
          }
          description="Do not see your question? Send a message below and I will reply personally."
        />

        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card group open:border-accent/50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus size={18} className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
