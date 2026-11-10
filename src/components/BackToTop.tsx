"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating round arrow, bottom right. Appears after scrolling down a screen and smooth-scrolls to the top. */
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-5 z-[60] grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/90 text-fg shadow-lg backdrop-blur transition duration-300 hover:border-accent/60 hover:text-accent print:hidden sm:bottom-6 sm:right-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
