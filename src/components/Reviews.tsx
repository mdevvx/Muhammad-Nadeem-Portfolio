"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { reviews } from "@/lib/site";

const slides = reviews.filter((r) => r.quote);
const AUTOPLAY_MS = 7000;

const who = (client: string, company?: string) => (company ? `${client}, ${company}` : client);

/** Swipeable testimonial carousel: native scroll-snap, arrow buttons, dots and gentle autoplay. */
export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const n = (i + slides.length) % slides.length;
    track.scrollTo({ left: n * track.clientWidth, behavior: "smooth" });
  }, []);

  // Keep the dots in sync with swipes and arrow clicks alike.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIndex(Math.round(track.scrollLeft / track.clientWidth)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, goTo]);

  if (slides.length === 0) return null;

  return (
    <section id="reviews" className="py-16 sm:py-20">
      <div data-reveal className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Client reviews"
            title={
              <>
                Don&apos;t take my word, <span className="text-gradient">take theirs</span>
              </>
            }
          />
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous review"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/60 hover:text-fg"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next review"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 text-muted transition hover:border-accent/60 hover:text-fg"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          className="relative mt-10"
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
            className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((r, i) => (
              <figure
                key={r.client + r.dates}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}`}
                className="w-full shrink-0 snap-center"
              >
                <div className="card relative mx-auto flex h-full flex-col justify-center overflow-hidden p-6 sm:p-10 lg:p-14">
                  <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pop/10 blur-3xl" aria-hidden="true" />
                  <Quote size={56} className="absolute right-6 top-6 text-accent/15 sm:right-10 sm:top-10" aria-hidden="true" />

                  <p className="relative font-mono text-xs uppercase tracking-[0.18em] text-accent">{r.project}</p>
                  <blockquote
                    className={`relative mt-5 space-y-4 font-display font-semibold leading-snug ${
                      r.quote!.length > 400 ? "text-base sm:text-lg" : "text-lg sm:text-2xl"
                    }`}
                  >
                    {r.quote!.split("\n\n").map((para, p, all) => (
                      <p key={p} className="whitespace-pre-line">
                        {p === 0 && "“"}
                        {para}
                        {p === all.length - 1 && "”"}
                      </p>
                    ))}
                  </blockquote>
                  <figcaption className="relative mt-8 flex items-center gap-3">
                    <span className="h-px w-8 bg-gradient-to-r from-accent to-pop" aria-hidden="true" />
                    <span className="font-semibold">{who(r.client, r.company)}</span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {slides.map((r, i) => (
              <button
                key={r.client + r.dates}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show review ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-accent" : "w-2 bg-line hover:bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
