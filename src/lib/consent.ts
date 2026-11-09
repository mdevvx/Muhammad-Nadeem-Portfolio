export const CONSENT_KEY = "cookie-consent";
/** Fired on window with the new Consent as `detail` whenever the visitor saves a choice. */
export const CONSENT_CHANGE_EVENT = "cookie-consent:change";
/** Dispatch this to open the preferences dialog (used by the footer link). */
export const OPEN_COOKIE_PREFS_EVENT = "cookie-consent:open";

export type Consent = { analytics: boolean; decidedAt: number };

export function readConsent(): Consent | null {
  try {
    const raw = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
    if (raw && typeof raw.analytics === "boolean") return { analytics: raw.analytics, decidedAt: Number(raw.decidedAt) || 0 };
  } catch {}
  return null;
}

export function saveConsent(analytics: boolean): Consent {
  const consent: Consent = { analytics, decidedAt: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {}
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }));
  return consent;
}
