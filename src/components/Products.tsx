import { ArrowUpRight, Check, LayoutDashboard } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { products } from "@/lib/site";

export default function Products() {
  return (
    <section id="products" className="py-16 sm:py-20">
      <div className="container-page">
        <div data-reveal>
          <SectionHeading
            eyebrow="Products"
            title={
              <>
                Bots you can <span className="text-gradient">add today</span>
              </>
            }
            description="Our own Discord products, live and used by real servers. Each one comes with a web dashboard, and more are on the way."
          />
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <article key={p.name} data-reveal className="card group flex flex-col p-6 sm:p-8">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-fg">
                <LayoutDashboard size={13} className="text-accent" aria-hidden="true" /> Dashboard available
              </span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight">{p.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{p.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.blurb}</p>
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-fg/90">{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
                <span className="font-semibold text-fg">Pricing:</span> {p.pricing}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={p.url} data-track="product_click" data-track-label={p.name} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Visit {p.name} <ArrowUpRight size={16} />
                </a>
                {p.dashboardUrl && (
                  <a href={p.dashboardUrl} data-track="product_dashboard_click" data-track-label={p.name} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    Open dashboard
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <p data-reveal className="mt-6 text-sm text-muted">
          More products coming soon.
        </p>
      </div>
    </section>
  );
}
