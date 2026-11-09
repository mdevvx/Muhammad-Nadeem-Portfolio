"use client";

import { OPEN_COOKIE_PREFS_EVENT } from "@/lib/consent";

export default function CookiePrefsButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFS_EVENT))}>
      {children}
    </button>
  );
}
