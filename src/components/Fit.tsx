import Link from "next/link";
import { ArrowRight, Bot, Check, FileCheck2, Gem, MessageCircleWarning, Stethoscope, UserCheck, Users, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { fit, type FitIcon } from "@/lib/site";

const icons: Record<FitIcon, LucideIcon> = {
  gem: Gem,
  users: Users,
  feedback: MessageCircleWarning,
  docs: FileCheck2,
  team: UserCheck,
  bot: Bot,
};

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

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="card p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                <Check size={13} aria-hidden="true" /> You&apos;re a great fit if…
              </span>
              <span className="font-mono text-xs text-muted">{fit.good.length} signs</span>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {fit.good.map((g, i) => {
                const Icon = icons[g.icon];
                return (
                  <li key={g.title} className="rounded-xl border border-line bg-bg/40 p-4 transition hover:border-accent/50">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft/15 text-accent">
                        <Icon size={19} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">0{i + 1}</p>
                        <h3 className="text-base font-semibold leading-snug">{g.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{g.body}</p>
                    <p className="mt-3 border-l-2 border-accent/40 pl-3 text-xs leading-relaxed text-fg/70">{g.detail}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="card p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-pop/40 bg-pop/10 px-3 py-1 text-xs font-semibold text-pop">
                <X size={13} aria-hidden="true" /> Probably not a fit if…
              </span>
              <ul className="mt-6 space-y-5">
                {fit.notFit.map((n) => (
                  <li key={n.title} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pop/15 text-pop">
                      <X size={13} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{n.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">{n.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Best with</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {fit.bestFor.map((b) => (
                  <li key={b} className="chip">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-line bg-surface/60 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Not sure which side you&apos;re on?</p>
            <p className="mt-1 text-sm text-muted">Run the free two-minute health check, or send me a quick message and I&apos;ll tell you honestly.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/health-check" data-track="cta_health_check" data-track-label="fit" className="btn-ghost border-accent/60 text-accent hover:border-accent">
              <Stethoscope size={16} aria-hidden="true" /> Free health check
            </Link>
            <a href="#contact" data-track="cta_start_project" data-track-label="fit" className="btn-primary">
              Start a project <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
