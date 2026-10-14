import { ArrowRight, MapPin, Star } from "lucide-react";
import ServerMock from "./ServerMock";
import { niches, profile, reviews } from "@/lib/site";

const heroProof = [
  { value: "30+", label: "Bots built" },
  { value: "5+ yrs", label: "Running servers" },
  { value: "Py + JS", label: "Bot stacks" },
];

const featuredCompany = reviews.find((r) => r.featured)?.company;
const clientCount = new Set(reviews.map((r) => `${r.client}|${r.company ?? ""}`)).size;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-12 pt-36 sm:pb-16 sm:pt-44">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up">
          <span className="chip gap-2 border-accent/40 text-fg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open for new projects
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            A Discord your members{" "}
            <span className="text-gradient">actually stay in</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            I am {profile.name}. I manage communities, build custom bots and lock down
            servers for ecommerce, trading, gaming, AI and Web3 brands, with over five years of hands-on Discord work.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
            <a href="#contact" className="btn-primary w-full py-3.5 sm:w-auto sm:py-3">
              Start a project <ArrowRight size={16} />
            </a>
            <a href="#health-check" className="btn-ghost w-full py-3.5 sm:w-auto sm:py-3">
              Free server health check
            </a>
          </div>

          <a href="#reviews" className="group mt-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted transition hover:text-fg">
            <span className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={14} className="fill-pop text-pop" />
              ))}
            </span>
            <span>
              Rated <span className="font-semibold text-fg">5.0</span> by {clientCount} clients
              {featuredCompany && <>, including {featuredCompany}</>}
            </span>
            <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
          </a>

          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-y border-line py-5">
            {heroProof.map((p) => (
              <div key={p.label}>
                <dt className="sr-only">{p.label}</dt>
                <dd>
                  <span className="block font-display text-2xl font-bold">{p.value}</span>
                  <span className="text-xs text-muted">{p.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} /> {profile.location}
            </span>
            <span aria-hidden="true" className="hidden h-4 w-px bg-line sm:block" />
            <ul className="flex flex-wrap gap-2">
              {niches.map((n) => (
                <li key={n} className="chip">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <ServerMock />
        </div>
      </div>
    </section>
  );
}
