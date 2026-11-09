"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, Lock } from "lucide-react";
import { OPEN_COOKIE_PREFS_EVENT, readConsent, saveConsent } from "@/lib/consent";

/**
 * Privacy bar pinned to the bottom of the page. Shown on the first visit and whenever the footer's
 * "Cookie Preferences" link is used. Necessary storage is always on; analytics is opt-in (off until switched on).
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    if (saved) setAnalytics(saved.analytics);
    else setOpen(true);

    const show = () => {
      setAnalytics(readConsent()?.analytics ?? false);
      setOpen(true);
    };
    window.addEventListener(OPEN_COOKIE_PREFS_EVENT, show);
    return () => window.removeEventListener(OPEN_COOKIE_PREFS_EVENT, show);
  }, []);

  function save(value: boolean) {
    saveConsent(value);
    setAnalytics(value);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="Privacy choices"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-6xl animate-msg-in rounded-2xl border border-line bg-surface/95 p-4 shadow-2xl backdrop-blur-md print:hidden sm:bottom-5 sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
        <div className="flex min-w-0 flex-1 gap-4">
          <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft/15 text-accent sm:grid">
            <Cookie size={22} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-base font-semibold">Your privacy choices</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              We only store what the site needs to work. Analytics stay off unless you turn them on.{" "}
              <Link href="/cookies" className="font-medium text-accent underline underline-offset-4 hover:brightness-110">
                Cookie Policy
              </Link>
            </p>

            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <div className="flex flex-1 items-center justify-between gap-4 rounded-xl border border-line bg-bg/40 px-4 py-2.5 sm:max-w-[17rem]">
                <div>
                  <p className="text-sm font-semibold">Essential</p>
                  <p className="text-xs text-muted">Theme and your choices</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                  <Lock size={12} className="text-muted" aria-hidden="true" /> Always on
                </span>
              </div>

              <div className="flex flex-1 items-center justify-between gap-4 rounded-xl border border-line bg-bg/40 px-4 py-2.5 sm:max-w-[17rem]">
                <div>
                  <p className="text-sm font-semibold">Analytics</p>
                  <p className="text-xs text-muted">Privacy friendly page counts</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  aria-label="Analytics cookies"
                  onClick={() => setAnalytics((v) => !v)}
                  className={`relative h-6 w-11 shrink-0 rounded-full border transition ${analytics ? "border-accent bg-accent-soft" : "border-line bg-elevated"}`}
                >
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${analytics ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 sm:gap-3">
          <button type="button" onClick={() => save(analytics)} className="btn-ghost flex-1 px-5 py-2.5 lg:flex-none">
            Save choices
          </button>
          <button type="button" onClick={() => save(true)} className="btn-primary flex-1 px-5 py-2.5 lg:flex-none">
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
