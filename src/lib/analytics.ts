type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/**
 * Sends a Google Analytics event. Does nothing unless analytics is configured and the visitor accepted
 * cookies (gtag only exists after that). For plain links and buttons, prefer the data-track attributes:
 *   <a data-track="cta_start_project" data-track-label="hero">
 * which the Analytics component picks up with a single click listener.
 */
export function track(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}
