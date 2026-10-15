import { ArrowRight, BadgeCheck, Crown, Star } from "lucide-react";
import ServerMock from "./ServerMock";
import { formatCount, formatRating, profile, reviews, stats, trackRecord } from "@/lib/site";
import CountUp from "./CountUp";

const heroProof = [
  { value: `${formatCount(stats.botsBuilt)}+`, label: "Bots built" },
  { value: formatCount(stats.jobsCompleted), label: "Jobs completed" },
  { value: `${stats.yearsExperience}+ yrs`, label: "On Discord" },
];

const featuredCompany = reviews.find((r) => r.featured)?.company;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-44 sm:pb-16 sm:pt-52">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip h-8 gap-1.5 border-pop/40 bg-pop/10 py-0 text-fg">
              <Crown size={13} className="text-pop" aria-hidden="true" />
              Top Rated
            </span>
            <span className="chip h-8 gap-1.5 border-accent/40 bg-accent/10 py-0 text-fg">
              <BadgeCheck size={13} className="text-accent" aria-hidden="true" />
              100% Job Success
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            A Discord your members{" "}
            <span className="text-gradient">actually stay in</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I&apos;m {profile.name}, a Discord community manager and bot developer. I run, build and secure
            servers for ecommerce, trading, gaming, AI and Web3 brands, with over {stats.yearsExperience} years of hands-on Discord work.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
            <a href="#contact" className="btn-primary w-full py-3.5 sm:w-auto sm:py-3">
              Start a project <ArrowRight size={16} />
            </a>
            <a href="/health-check" className="btn-ghost w-full py-3.5 sm:w-auto sm:py-3">
              Free server health check
            </a>
          </div>
          <p className="mt-3 text-xs text-muted">Free 30-minute call · No pitch, no pressure · Replies within 24 hours</p>

          <a href="#reviews" className="group mt-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted transition hover:text-fg">
            <span className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={14} className="fill-pop text-pop" />
              ))}
            </span>
            <span>
              Rated <span className="font-semibold text-fg">{formatRating(trackRecord.rating)}</span> from {formatCount(trackRecord.reviewCount)} client reviews
              {featuredCompany && <>, including {featuredCompany}</>}
            </span>
            <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
          </a>

          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-y border-line py-5">
            {heroProof.map((p) => (
              <div key={p.label}>
                <dt className="sr-only">{p.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold">
                    <CountUp value={p.value} />
                  </span>
                  <span className="text-xs text-muted">{p.label}</span>
                </dd>
              </div>
            ))}
          </dl>

        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <ServerMock />
        </div>
      </div>
    </section>
  );
}
