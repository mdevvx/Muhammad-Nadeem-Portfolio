import { Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { caseStudy as c } from "@/lib/site";

export default function CaseStudy() {
  return (
    <section id="results" className="py-16 sm:py-20">
      <div className="container-page">
        <div data-reveal>
          <SectionHeading
            eyebrow="Case study"
            title={
              <>
                {c.tagline.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="text-gradient">{c.tagline.split(" ").slice(-2).join(" ")}</span>
              </>
            }
            description={`How I helped keep ${c.client} organised, friendly and safe as it grew.`}
          />
        </div>

        <dl data-reveal className="mt-10 grid grid-cols-3 gap-4">
          {c.metrics.map((m) => (
            <div key={m.label} className="card p-5 text-center sm:p-6">
              <dd className="font-display text-3xl font-bold text-accent sm:text-4xl">{m.value}</dd>
              <dt className="mt-1 text-xs text-muted sm:text-sm">{m.label}</dt>
            </div>
          ))}
        </dl>

        <div data-reveal className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="card p-6">
            <p className="eyebrow">Situation</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{c.situation}</p>
          </article>
          <article className="card p-6">
            <p className="eyebrow">What I did</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-accent">
              {c.actions.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </article>
          <article className="card p-6">
            <p className="eyebrow">Outcome</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{c.outcome}</p>
          </article>
        </div>

        <figure data-reveal className="card mt-4 flex gap-4 p-6 sm:p-8">
          <Quote size={28} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <blockquote className="text-lg font-medium leading-relaxed sm:text-xl">&ldquo;{c.quote}&rdquo;</blockquote>
            <figcaption className="mt-3 text-sm text-muted">{c.quoteBy}</figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
