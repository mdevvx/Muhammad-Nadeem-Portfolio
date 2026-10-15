import { clients } from "@/lib/site";

/** Endless scrolling strip of client names. Pauses on hover; static for reduced-motion users. */
export default function ClientMarquee() {
  if (clients.length === 0) return null;
  const row = [...clients, ...clients];

  return (
    <section aria-label="Clients" className="border-y border-line bg-surface/40 py-6">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        Trusted by communities in ecommerce, trading, gaming, AI and Web3
      </p>
      <div className="group relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row.map((c, i) => (
            <li
              key={`${c}-${i}`}
              aria-hidden={i >= clients.length}
              className="flex items-center gap-12 whitespace-nowrap font-display text-xl font-bold text-fg/55 transition hover:text-fg sm:text-2xl"
            >
              {c}
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
