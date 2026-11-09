"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { OPEN_COOKIE_PREFS_EVENT, readConsent, saveConsent } from "@/lib/consent";

/**
 * Cookie banner on first visit, plus a preferences dialog reachable any time from the footer.
 * Necessary storage (theme, saved health-check progress, this choice) is always on; analytics is opt-in.
 */
export default function CookieConsent() {
  const [banner, setBanner] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = readConsent();
    if (saved) setAnalytics(saved.analytics);
    else setBanner(true);

    const open = () => {
      setAnalytics(readConsent()?.analytics ?? false);
      setDialog(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFS_EVENT, open);
    return () => window.removeEventListener(OPEN_COOKIE_PREFS_EVENT, open);
  }, []);

  useEffect(() => {
    if (!dialog) return;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDialog(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog]);

  function choose(value: boolean) {
    saveConsent(value);
    setAnalytics(value);
    setBanner(false);
    setDialog(false);
  }

  return (
    <>
      {banner && !dialog && (
        <div
          role="region"
          aria-label="Cookie notice"
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-3xl animate-msg-in rounded-2xl border border-line bg-surface/95 p-5 shadow-2xl backdrop-blur-md print:hidden sm:bottom-5"
        >
          <div className="flex gap-3">
            <Cookie size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">We use cookies</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Essential storage keeps the site working (theme, saved progress). With your OK, analytics cookies help me see which pages are useful. Read the{" "}
                <Link href="/cookies" className="text-fg underline underline-offset-2 hover:text-accent">
                  Cookie Policy
                </Link>
                .
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => choose(true)} className="btn-primary px-4 py-2">
                  Accept all
                </button>
                <button type="button" onClick={() => choose(false)} className="btn-ghost px-4 py-2">
                  Reject non-essential
                </button>
                <button type="button" onClick={() => setDialog(true)} className="btn px-4 py-2 text-muted hover:text-fg">
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {dialog && (
        <div className="fixed inset-0 z-[80] grid place-items-center p-4 print:hidden">
          <button type="button" aria-label="Close" className="absolute inset-0 bg-black/60" onClick={() => setDialog(false)} />
          <div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-title"
            className="card relative w-full max-w-lg animate-msg-in bg-surface p-6 shadow-2xl outline-none"
          >
            <button
              type="button"
              onClick={() => setDialog(false)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-elevated hover:text-fg"
            >
              <X size={16} />
            </button>
            <h2 id="cookie-title" className="text-lg font-semibold">
              Cookie preferences
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">Choose which optional cookies you are happy with. You can change this at any time.</p>

            <ul className="mt-5 space-y-3">
              <li className="flex items-start justify-between gap-4 rounded-xl border border-line p-4">
                <div>
                  <p className="text-sm font-semibold">Strictly necessary</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">Theme, saved health-check progress and this choice. Always on.</p>
                </div>
                <span className="chip shrink-0">Always on</span>
              </li>
              <li className="flex items-start justify-between gap-4 rounded-xl border border-line p-4">
                <div>
                  <p className="text-sm font-semibold">Analytics</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">Anonymous visit counts and popular pages, so I can improve the site.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  aria-label="Analytics cookies"
                  onClick={() => setAnalytics((v) => !v)}
                  className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full border transition ${analytics ? "border-accent bg-accent-soft" : "border-line bg-elevated"}`}
                >
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${analytics ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" onClick={() => choose(analytics)} className="btn-primary px-4 py-2">
                Save preferences
              </button>
              <button type="button" onClick={() => choose(true)} className="btn-ghost px-4 py-2">
                Accept all
              </button>
              <button type="button" onClick={() => choose(false)} className="btn-ghost px-4 py-2">
                Reject non-essential
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
