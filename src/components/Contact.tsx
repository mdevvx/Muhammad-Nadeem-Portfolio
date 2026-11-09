"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CalendarCheck, Check, Clock, Copy, Loader2, Mail, Send, X } from "lucide-react";
import { track } from "@/lib/analytics";
import SectionHeading from "./SectionHeading";
import ServiceSelect from "./ServiceSelect";
import { contactServices, links, profile } from "@/lib/site";

type Status = { state: "idle" | "sending" | "success" | "error"; message?: string };

/** Other sections (e.g. the Health Check) dispatch this window event to fill in the form. */
export const PREFILL_EVENT = "contact:prefill";
export type ContactPrefill = { service?: string; message?: string; source?: "Health Check" };
/** Other pages store a ContactPrefill here before navigating to /#contact. */
export const PREFILL_STORAGE_KEY = "contact-prefill";

export default function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [sentTo, setSentTo] = useState<string | null>(null);
  const closeSent = useCallback(() => setSentTo(null), []);
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [source, setSource] = useState<"Contact form" | "Health Check">("Contact form");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { service: s, message: m, source: src } = (e as CustomEvent<ContactPrefill>).detail ?? {};
      if (src) setSource(src);
      if (s && (contactServices as readonly string[]).includes(s)) setService(s);
      if (m) setMessage(m);
      // Wait for the smooth scroll, then put the cursor at the end so they can add details.
      setTimeout(() => {
        const el = messageRef.current;
        if (!el) return;
        el.focus({ preventScroll: true });
        el.setSelectionRange(el.value.length, el.value.length);
      }, 700);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);

    // Arriving from /health-check with results to send.
    try {
      const stored = sessionStorage.getItem(PREFILL_STORAGE_KEY);
      if (stored) {
        sessionStorage.removeItem(PREFILL_STORAGE_KEY);
        onPrefill(new CustomEvent(PREFILL_EVENT, { detail: JSON.parse(stored) }));
        setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } catch {
      /* storage blocked */
    }

    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const firstName = String(data.name ?? "").trim().split(/\s+/)[0] ?? "";
    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus({ state: "error", message: json.error ?? "Something went wrong. Please try again." });
        return;
      }
      form.reset();
      setService("");
      setMessage("");
      setSource("Contact form");
      track("generate_lead", { label: data.source ?? "Contact form", service: data.service || undefined });
      setStatus({ state: "success" });
      // Short pause so the button settles before the confirmation pops up.
      setTimeout(() => setSentTo(firstName), 350);
    } catch {
      setStatus({ state: "error", message: `Network error. You can email me at ${profile.email}.` });
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="container-page">
        <div data-reveal className="card relative overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title={
                  <>
                    Let&apos;s fix your Discord, <span className="text-gradient">together</span>
                  </>
                }
                description="Tell me about your server or the bot you have in mind. I&apos;ll get back to you with an honest take and a rough scope."
              />
              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft/15 text-accent">
                    <Mail size={18} />
                  </span>
                  <a href={`mailto:${profile.email}`} className="min-w-0 truncate text-[13px] font-medium hover:text-accent sm:text-sm">
                    {profile.email}
                  </a>
                  <CopyEmail />
                </li>
                {links.booking && (
                  <li className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft/15 text-accent">
                      <CalendarCheck size={18} />
                    </span>
                    <a href={links.booking} data-track="cta_book_call" data-track-label="contact" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-accent">
                      Book a free 30 minute call
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft/15 text-accent">
                    <Clock size={18} />
                  </span>
                  <LocalTime />
                </li>
              </ul>
            </div>

            <form onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby="form-status">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    Name
                  </label>
                  <input id="name" name="name" required minLength={2} maxLength={100} autoComplete="name" className="field" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className="field" placeholder="you@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="handle" className="mb-1.5 block text-sm font-medium">
                    Discord or WhatsApp <span className="font-normal text-muted">(optional)</span>
                  </label>
                  <input id="handle" name="handle" maxLength={60} autoComplete="off" className="field" placeholder="@username or +1 555 0100" />
                </div>
                <div>
                  <label htmlFor="service" className="mb-1.5 block text-sm font-medium">
                    What do you need?
                  </label>
                  <ServiceSelect
                    id="service"
                    name="service"
                    options={contactServices}
                    placeholder="Select a service"
                    value={service}
                    onChange={setService}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Project details
                </label>
                <textarea
                  ref={messageRef}
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  minLength={10}
                  maxLength={3000}
                  rows={5}
                  className="field resize-y"
                  placeholder="Tell me about your community, your goals and any deadline."
                />
              </div>

              <input type="hidden" name="source" value={source} />

              {/* Honeypot: hidden from people and assistive tech */}
              <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              <button type="submit" disabled={status.state === "sending"} className="btn-primary w-full disabled:opacity-70 sm:w-auto">
                {status.state === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending
                  </>
                ) : (
                  <>
                    Send message <Send size={16} />
                  </>
                )}
              </button>

              <p
                id="form-status"
                role="status"
                aria-live="polite"
                className="min-h-[1.25rem] text-sm text-red-400"
              >
                {status.state === "error" && status.message}
              </p>
            </form>
          </div>
        </div>
      </div>

      {sentTo !== null && <SuccessModal name={sentTo} onClose={closeSent} />}
    </section>
  );
}

const AUTO_CLOSE_MS = 6000;

/** Confirmation shown after a successful send. Closes itself after a few seconds. */
function SuccessModal({ name, onClose }: { name: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, AUTO_CLOSE_MS);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="sent-title"
        aria-describedby="sent-body"
        className="card relative w-full max-w-md animate-msg-in overflow-hidden p-8 text-center"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          autoFocus
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:text-fg"
        >
          <X size={16} />
        </button>

        <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent text-on-accent shadow-lg shadow-accent/30">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/40 [animation-iteration-count:2]" aria-hidden="true" />
          <Check size={30} strokeWidth={3} className="relative" />
        </span>

        <h3 id="sent-title" className="relative mt-6 text-2xl font-bold">
          Message sent{name ? `, ${name}` : ""}!
        </h3>
        <p id="sent-body" className="relative mt-3 text-sm leading-relaxed text-muted">
          Thanks for reaching out. I&apos;ll read it properly and get back to you within one business day, usually sooner.
        </p>

        <button type="button" onClick={onClose} className="btn-primary relative mt-7 w-full">
          Sounds good
        </button>

        {/* Auto-close countdown */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-elevated" aria-hidden="true">
          <div className="h-full origin-left animate-[shrink_6s_linear_forwards] bg-accent-soft" />
        </div>
      </div>
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard can be blocked; the mailto link still works */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="ml-auto inline-flex h-8 shrink-0 items-center gap-1 rounded-full border border-line px-2.5 text-xs text-muted transition hover:border-accent/60 hover:text-fg sm:ml-1"
    >
      {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
      <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

/** Live clock for Lahore so clients see the time-zone overlap at a glance. */
function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  const time = now?.toLocaleTimeString("en-US", { timeZone: "Asia/Karachi", hour: "numeric", minute: "2-digit" });
  return (
    <span className="text-muted">
      {time ? (
        <>
          It&apos;s <span className="font-medium text-fg">{time}</span> in {profile.location.split(",")[0]} right now ({profile.timezone})
        </>
      ) : (
        <>
          Based in {profile.location} ({profile.timezone})
        </>
      )}
    </span>
  );
}
