"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Check, Clock, Copy, Loader2, Mail, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import ServiceSelect from "./ServiceSelect";
import { contactServices, links, profile } from "@/lib/site";

type Status = { state: "idle" | "sending" | "success" | "error"; message?: string };

/** Other sections (e.g. the Health Check) dispatch this window event to fill in the form. */
export const PREFILL_EVENT = "contact:prefill";
export type ContactPrefill = { service?: string; message?: string; source?: "Health Check" };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
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
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
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
      setStatus({ state: "success", message: "Thanks! Your message is in. I usually reply within one business day." });
    } catch {
      setStatus({ state: "error", message: `Network error. You can email me at ${profile.email}.` });
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="container-page">
        <div data-reveal className="card relative overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent-soft/20 blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title={
                  <>
                    Let&apos;s fix your Discord, <span className="text-gradient">together</span>
                  </>
                }
                description="Tell me about your server or the bot you have in mind. I will reply with an honest read and a rough scope."
              />
              <ul className="mt-8 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft/15 text-accent">
                    <Mail size={18} />
                  </span>
                  <a href={`mailto:${profile.email}`} className="min-w-0 truncate font-medium hover:text-accent">
                    {profile.email}
                  </a>
                  <CopyEmail />
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft/15 text-accent">
                    <CalendarCheck size={18} />
                  </span>
                  <a href={links.booking} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-accent">
                    Book a free 30 minute call
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft/15 text-accent">
                    <Clock size={18} />
                  </span>
                  <LocalTime />
                </li>
              </ul>
            </div>

            <form onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby="form-status">
              <div className="grid gap-4 sm:grid-cols-2">
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

              <div className="grid gap-4 sm:grid-cols-2">
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
                className={`min-h-[1.25rem] text-sm ${status.state === "error" ? "text-red-400" : "text-mint"}`}
              >
                {status.message}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
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
      className="ml-1 inline-flex shrink-0 items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs text-muted transition hover:border-accent/60 hover:text-fg"
    >
      {copied ? <Check size={13} className="text-mint" /> : <Copy size={13} />}
      {copied ? "Copied" : "Copy"}
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
