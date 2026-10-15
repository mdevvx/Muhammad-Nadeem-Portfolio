"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Crown, Quote, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import CountUp from "./CountUp";
import { reviews, trackRecord, type Review } from "@/lib/site";

const slides = reviews.filter((r) => r.quote);
const AUTOPLAY_MS = 6000;

const who = (r: Review) => (r.company ? `${r.client}, ${r.company}` : r.client);
const initials = (r: Review) => {
  const words = r.client.split(" ");
  return (words.length === 1 ? words[0].slice(0, 2) : words.map((w) => w[0]).join("").slice(0, 2)).toUpperCase();
};
// Rough length at which a review overflows the clamped card body.
const isLong = (r: Review) => (r.quote?.length ?? 0) > 230;

/** Equal-size review cards in a swipeable row. Long reviews are clamped with a "Read more" dialog. */
export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<Review | null>(null);

  const step = useCallback(() => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.offsetWidth + gap;
  }, []);

  const goTo = useCallback(
    (p: number) => {
      const track = trackRef.current;
      if (!track) return;
      const perView = Math.max(1, Math.round(track.clientWidth / step()));
      const total = Math.max(1, slides.length - perView + 1);
      const n = ((p % total) + total) % total;
      track.scrollTo({ left: n * step(), behavior: "smooth" });
    },
    [step],
  );

  // Track position (for dots) on swipe, arrows and resize alike.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const s = step() || 1;
        const perView = Math.max(1, Math.round(track.clientWidth / s));
        setPages(Math.max(1, slides.length - perView + 1));
        setPage(Math.round(track.scrollLeft / s));
      });
    };
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [step]);

  useEffect(() => {
    if (paused || open || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => goTo(page + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [page, paused, open, goTo]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (slides.length === 0) return null;

  return (
    <section id="reviews" className="py-16 sm:py-20">
      <div data-reveal className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Client reviews"
            title={
              <>
                What clients said <span className="text-gradient">after the work</span>
              </>
            }
          />
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              aria-label="Previous reviews"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/60 hover:text-fg"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goTo(page + 1)}
              aria-label="Next reviews"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/60 hover:text-fg"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Track record band */}
        <div className="card relative mt-10 overflow-hidden">
          <div className="relative grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
            <ul className="flex flex-wrap gap-3 lg:flex-col">
              {trackRecord.badges.map((b, i) => (
                <li
                  key={b}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
                    i === 0 ? "border-pop/50 bg-pop/10" : "border-accent/50 bg-accent/10"
                  }`}
                >
                  {i === 0 ? <Crown size={16} className="text-pop" /> : <BadgeCheck size={16} className="text-accent" />}
                  {b}
                </li>
              ))}
            </ul>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:border-l lg:border-line lg:pl-10">
              {trackRecord.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="text-gradient block font-display text-3xl font-bold sm:text-5xl">
                      <CountUp value={s.value} />
                    </span>
                    <span className="mt-1 block text-xs text-muted sm:text-sm">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div
          className="mt-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client reviews"
            className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((r, i) => (
              <figure
                key={r.client + r.dates}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                className="card group relative flex h-[22rem] w-[85%] shrink-0 snap-center flex-col sm:snap-start overflow-hidden p-6 transition duration-300 hover:border-accent/50 sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]"
              >
                <div className="relative flex items-start justify-between gap-3">
                  <p className="line-clamp-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-accent">{r.project}</p>
                  <Quote size={28} className="shrink-0 text-accent/20" aria-hidden="true" />
                </div>

                <blockquote className="relative mt-4 line-clamp-6 whitespace-pre-line text-[15px] leading-relaxed text-fg/90">
                  &ldquo;{r.quote!.replace(/\n\n/g, " ")}&rdquo;
                </blockquote>
                {isLong(r) && (
                  <button
                    type="button"
                    onClick={() => setOpen(r)}
                    className="relative mt-2 self-start text-sm font-semibold text-accent hover:underline"
                  >
                    Read more
                  </button>
                )}

                <figcaption className="relative mt-auto flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-sm font-bold text-on-accent">
                    {initials(r)}
                  </span>
                  <span className="min-w-0 truncate font-semibold">{who(r)}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === page}
                className={`h-2 rounded-full transition-all duration-300 ${i === page ? "w-8 bg-accent" : "w-2 bg-line hover:bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Review from ${who(open)}`}>
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={() => setOpen(null)} aria-hidden="true" />
          <figure className="card relative max-h-[85vh] w-full max-w-2xl animate-msg-in overflow-y-auto p-6 sm:p-10">
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              autoFocus
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:text-fg"
            >
              <X size={16} />
            </button>
            <p className="pr-10 font-mono text-xs uppercase tracking-[0.16em] text-accent">{open.project}</p>
            <blockquote className="mt-5 space-y-4 text-base leading-relaxed sm:text-lg">
              {open.quote!.split("\n\n").map((p, i, all) => (
                <p key={i} className="whitespace-pre-line">
                  {i === 0 && "“"}
                  {p}
                  {i === all.length - 1 && "”"}
                </p>
              ))}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-sm font-bold text-on-accent">
                {initials(open)}
              </span>
              <span className="font-semibold">{who(open)}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
