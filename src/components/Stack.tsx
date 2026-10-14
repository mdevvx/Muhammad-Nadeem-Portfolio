import SectionHeading from "./SectionHeading";
import { stack } from "@/lib/site";

export default function Stack() {
  return (
    <section aria-labelledby="stack-title" className="py-12 sm:py-16">
      <div data-reveal className="container-page">
        <div className="card p-6 sm:p-10">
          <div id="stack-title">
            <SectionHeading
              eyebrow="Toolbox"
              title={
                <>
                  The stack behind <span className="text-gradient">the work</span>
                </>
              }
            />
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((g) => (
              <div key={g.group}>
                <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-muted">{g.group}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="rounded-lg border border-line bg-elevated/60 px-2.5 py-1.5 text-sm">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
