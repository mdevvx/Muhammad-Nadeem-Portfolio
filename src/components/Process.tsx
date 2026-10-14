import SectionHeading from "./SectionHeading";
import { process } from "@/lib/site";

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-20">
      <div data-reveal className="container-page">
        <div className="card overflow-hidden">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.8fr_2.2fr] lg:gap-10">
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  A simple process, <span className="text-gradient">no runaround</span>
                </>
              }
            />
            <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {process.map((p) => (
                <li key={p.step} className="bg-surface p-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft/15 font-mono text-xs font-bold text-accent">
                      {p.step}
                    </span>
                    <h3 className="text-base font-semibold">{p.title}</h3>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
