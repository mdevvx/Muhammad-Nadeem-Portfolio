"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { CONSENT_CHANGE_EVENT, readConsent, type Consent } from "@/lib/consent";
import { track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Loads Google Analytics only when NEXT_PUBLIC_GA_ID is set AND the visitor accepted analytics cookies.
 * With no ID configured the site sets no analytics cookies at all.
 */
export default function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(readConsent()?.analytics === true);
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<Consent>).detail.analytics;
      setAllowed(next);
      // Withdrawing consent: stop sending data right away (cookies expire or can be cleared in the browser).
      if (!next && GA_ID) (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  // One listener for every element marked with data-track="event_name" [data-track-label="where"].
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (el?.dataset.track) track(el.dataset.track, { label: el.dataset.trackLabel, link_url: (el as HTMLAnchorElement).href || undefined });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID || !allowed) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
