import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { experience, links } from "@/lib/site";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-16 sm:py-20">
      <div className="container-page">
        <div data-reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title={
              <>
                Where I&apos;ve <span className="text-gradient">put in the work</span>
              </>
            }
            description="My experience running Discord communities and building the bots behind them."
          />
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0 self-start sm:self-auto">
              Full history on LinkedIn <ArrowUpRight size={15} />
            </a>
          )}
        </div>

        <ol className="relative mt-10 space-y-4 border-l border-line pl-6 sm:pl-8">
          {experience.map((e) => (
            <li key={e.role + e.org} data-reveal className="relative">
              <span className="absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-accent bg-bg sm:-left-[39px]" aria-hidden="true" />
              <div className="card p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-pop">{e.period}</p>
                <h3 className="mt-2 text-lg font-semibold">{e.role}</h3>
                <p className="text-sm text-muted">{e.org}</p>
                <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-accent">
                  {e.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
