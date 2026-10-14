"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide scroll behaviour in one listener set:
 * - a reading-progress bar at the top
 * - reveal-on-scroll for any element with [data-reveal]
 * - marks the nav link of the section in view with [data-active]
 */
export default function ScrollEffects() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            reveal.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = `#${e.target.id}`;
          links.forEach((l) => l.toggleAttribute("data-active", l.getAttribute("href") === id));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const target = document.querySelector(l.getAttribute("href") ?? "");
      if (target) spy.observe(target);
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      reveal.disconnect();
      spy.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden="true">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent-soft via-accent to-pop" />
    </div>
  );
}
