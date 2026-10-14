import SectionHeading from "./SectionHeading";
import { process } from "@/lib/site";

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-28">
      <div data-reveal className="container-page">
        <SectionHeading
          eyebrow="How it works"
          align="center"
          title={
            <>
              A simple process, <span className="text-gradient">no runaround</span>
            </>
          }
        />

        <ol className="relative mt-14 grid gap-6 md:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block"
          />
          {process.map((p) => (
            <li key={p.step} className="relative">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface font-mono text-sm font-bold text-accent shadow-lg shadow-black/10">
                {p.step}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
