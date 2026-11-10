import Link from "next/link";
import { ArrowRight, Check, Stethoscope, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { fit } from "@/lib/site";

type Item = { title: string; body: string };

/** One side of the comparison. Both sides share this layout so the rows line up. */
function Column({ label, items, tone }: { label: string; items: Item[]; tone: "good" | "bad" }) {
  const good = tone === "good";
  const Icon = good ? Check : X;
  return (
    <div className="card p-6 sm:p-8">
      <span
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
          good ? "border-accent/40 bg-accent/10 text-accent" : "border-pop/40 bg-pop/10 text-pop"
        }`}
      >
        <Icon size={13} aria-hidden="true" /> {label}
      </span>
      <ul className="mt-6 space-y-6">
        {items.map((it) => (
          <li key={it.title} className="flex gap-3.5">
            <span
              className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${good ? "bg-accent/15 text-accent" : "bg-pop/15 text-pop"}`}
            >
              <Icon size={14} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold">{it.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{it.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** "Who this is for": sets expectations and signals a premium, selective service. */
export default function Fit() {
  return (
    <section id="fit" className="py-16 sm:py-20">
      <div data-reveal className="container-page">
        <SectionHeading
          eyebrow="Who this is for"
          title={
            <>
              Let&apos;s see if we&apos;re <span className="text-gradient">a good match</span>
            </>
          }
          description="I do my best work with brands that see their community as something worth investing in. Here's a quick way to tell if that's you."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Column label="You're a great fit if…" items={fit.good} tone="good" />
          <Column label="Probably not a fit if…" items={fit.notFit} tone="bad" />
        </div>

        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-line bg-surface/60 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-semibold">Not sure which side you&apos;re on?</p>
            <p className="mt-1 text-sm text-muted">Run the free two-minute health check, or send me a quick message.</p>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/health-check" data-track="cta_health_check" data-track-label="fit" className="btn-ghost w-full justify-center border-accent/60 py-3.5 text-accent hover:border-accent sm:w-auto sm:py-3">
              <Stethoscope size={16} aria-hidden="true" /> Free health check
            </Link>
            <a href="#contact" data-track="cta_start_project" data-track-label="fit" className="btn-primary w-full justify-center py-3.5 sm:w-auto sm:py-3">
              Start a project <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
