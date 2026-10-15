import { Check, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { fit } from "@/lib/site";

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

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="card relative overflow-hidden p-6 sm:p-8">
            <p className="relative text-sm font-semibold text-accent">You&apos;re a great fit if…</p>
            <ul className="relative mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {fit.good.map((g) => (
                <li key={g.title} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check size={14} />
                  </span>
                  <span>
                    <span className="block font-semibold">{g.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{g.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 sm:p-8">
            <p className="text-sm font-semibold text-pop">Probably not a fit if…</p>
            <ul className="mt-5 space-y-4">
              {fit.notFit.map((n) => (
                <li key={n} className="flex gap-3 text-sm">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pop/15 text-pop">
                    <X size={14} />
                  </span>
                  <span className="pt-0.5 text-muted">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
