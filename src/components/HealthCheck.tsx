"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Clock, MailX, RotateCcw, Send, Stethoscope, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { healthAreas, healthQuestions, type HealthArea } from "@/lib/site";
import { PREFILL_EVENT, type ContactPrefill } from "./Contact";

/** Dispatch this window event (or link to #health-check) to open the quiz from anywhere. */
export const OPEN_HEALTH_EVENT = "health-check:open";

type Answer = 0 | 0.5 | 1;

const choices: { label: string; value: Answer }[] = [
  { label: "Yes", value: 1 },
  { label: "Partly", value: 0.5 },
  { label: "No", value: 0 },
];

function band(score: number) {
  if (score >= 80) return { label: "Solid foundation", tone: "text-accent", note: "A few tweaks will take this server from good to great." };
  if (score >= 50) return { label: "Gaps worth fixing", tone: "text-amber-400", note: "Members are probably slipping through some of these gaps right now." };
  return { label: "At risk", tone: "text-red-400", note: "These gaps cost members and expose the server to raids and scams." };
}

const isHealthLink = (href: string | null) => !!href && /(^|\/)#health-check$/.test(href);

export default function HealthCheck() {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<(Answer | undefined)[]>(() => healthQuestions.map(() => undefined));
  const [step, setStep] = useState(0);
  const done = step >= healthQuestions.length;
  const returnFocus = useRef<HTMLElement | null>(null);

  // Open from any "#health-check" link, the custom event, or a URL that lands on #health-check.
  useEffect(() => {
    const openQuiz = () => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a || !isHealthLink(a.getAttribute("href"))) return;
      e.preventDefault();
      openQuiz();
    };
    document.addEventListener("click", onClick);
    window.addEventListener(OPEN_HEALTH_EVENT, openQuiz);
    if (window.location.hash === "#health-check") openQuiz();
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener(OPEN_HEALTH_EVENT, openQuiz);
    };
  }, []);

  // Escape to close, lock page scroll while open, return focus afterwards.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      returnFocus.current?.focus?.();
    };
  }, [open]);

  const result = useMemo(() => {
    if (!done) return null;
    const vals = answers.map((a) => a ?? 0);
    const score = Math.round((vals.reduce<number>((t, v) => t + v, 0) / vals.length) * 100);
    const areas = healthAreas.map(({ area, service }) => {
      const idx = healthQuestions.flatMap((q, i) => (q.area === area ? [i] : []));
      const pct = Math.round((idx.reduce((t, i) => t + vals[i], 0) / idx.length) * 100);
      return { area, service, pct };
    });
    const weakest = [...areas].sort((a, b) => a.pct - b.pct)[0];
    const fixes = healthQuestions
      .map((q, i) => ({ ...q, value: vals[i] }))
      .filter((q) => q.value < 1)
      .sort((a, b) => a.value - b.value);
    return { score, areas, weakest, fixes };
  }, [done, answers]);

  function answer(v: Answer) {
    setAnswers((prev) => prev.map((a, i) => (i === step ? v : a)));
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers(healthQuestions.map(() => undefined));
    setStep(0);
  }

  function sendResults() {
    if (!result) return;
    const lines = [
      `Server Health Check score: ${result.score}/100 (${band(result.score).label}).`,
      `By area: ${result.areas.map((a) => `${a.area} ${a.pct}%`).join(", ")}.`,
    ];
    if (result.fixes.length) lines.push(`Top gaps: ${result.fixes.slice(0, 3).map((f) => f.q.replace(/\.$/, "")).join("; ")}.`);
    lines.push("", "About my server: ");
    const detail: ContactPrefill = { service: result.weakest.service, message: lines.join("\n"), source: "Health Check" };
    setOpen(false);
    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }));
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  const q = healthQuestions[Math.min(step, healthQuestions.length - 1)];
  const b = result ? band(result.score) : null;

  return (
    <section id="health-check" className="py-16 sm:py-20">
      <div data-reveal className="container-page">
        <div className="card relative overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pop/15 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent-soft/10 blur-3xl" aria-hidden="true" />

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Free Discord server audit"
                title={
                  <>
                    How healthy is <span className="text-gradient">your server?</span>
                  </>
                }
                description="Answer ten quick questions and get an instant score, a breakdown by area and the three fixes that'll make the biggest difference."
              />
              <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm text-muted sm:grid-cols-2">
                {healthAreas.map((a) => (
                  <li key={a.area} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-pop" />
                    <span>
                      <span className="font-medium text-fg">{a.area}</span>, {areaBlurb[a.area]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-bg/50 p-6 text-center sm:p-8">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft/15 text-accent">
                <Stethoscope size={26} />
              </span>
              <p className="mt-4 font-display text-xl font-bold">Free server health check</p>
              <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted">
                <li className="inline-flex items-center gap-1.5">
                  <Clock size={13} /> About 2 minutes
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <MailX size={13} /> No email needed
                </li>
              </ul>
              <button
                type="button"
                onClick={() => {
                  returnFocus.current = document.activeElement as HTMLElement | null;
                  setOpen(true);
                }}
                className="btn-primary mt-6 w-full py-3.5"
              >
                {done ? "See my results" : step > 0 ? "Continue the check" : "Start the free check"} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4">
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Server health check"
            className="card relative max-h-[92vh] w-full max-w-xl animate-msg-in overflow-y-auto rounded-b-none p-6 sm:rounded-2xl sm:p-8"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-pop/10 blur-3xl" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close health check"
              autoFocus
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition hover:text-fg"
            >
              <X size={16} />
            </button>

            {!done && (
              <div className="relative">
                <div className="flex items-center justify-between pr-12 text-xs text-muted">
                  <span className="inline-flex items-center gap-2 font-mono uppercase tracking-widest text-accent">
                    <Stethoscope size={14} /> {q.area}
                  </span>
                  <span className="font-mono">
                    {step + 1} / {healthQuestions.length}
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-elevated" aria-hidden="true">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-soft to-pop transition-all duration-500"
                    style={{ width: `${(step / healthQuestions.length) * 100}%` }}
                  />
                </div>

                <p key={step} className="mt-8 min-h-[4.5rem] animate-msg-in font-display text-xl font-semibold leading-snug sm:text-2xl" aria-live="polite">
                  {q.q}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {choices.map((c) => (
                    <button
                      key={c.label}
                      type="button"
                      onClick={() => answer(c.value)}
                      className={`rounded-xl border px-4 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-accent/70 hover:bg-elevated ${
                        answers[step] === c.value ? "border-accent bg-accent-soft/15 text-fg" : "border-line bg-bg/40 text-fg"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg disabled:invisible"
                >
                  <ArrowLeft size={15} /> Back
                </button>
              </div>
            )}

            {result && b && (
              <div className="relative animate-msg-in" aria-live="polite">
                <div className="flex flex-wrap items-center gap-6 pr-10">
                  <ScoreRing score={result.score} />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-muted">Your score</p>
                    <p className={`mt-1 font-display text-2xl font-bold ${b.tone}`}>{b.label}</p>
                    <p className="mt-1 max-w-xs text-sm text-muted">{b.note}</p>
                  </div>
                </div>

                <ul className="mt-8 space-y-3">
                  {result.areas.map((a) => (
                    <li key={a.area}>
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{a.area}</span>
                        <span className="font-mono text-muted">{a.pct}%</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-elevated">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${a.pct >= 80 ? "bg-accent" : a.pct >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                          style={{ width: `${Math.max(a.pct, 4)}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                {result.fixes.length > 0 && (
                  <div className="mt-8">
                    <p className="text-sm font-semibold">Fix these first</p>
                    <ol className="mt-3 space-y-2.5">
                      {result.fixes.slice(0, 3).map((f, i) => (
                        <li key={f.q} className="flex gap-3 rounded-xl border border-line bg-bg/40 p-3.5 text-sm leading-relaxed text-muted">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft/20 font-mono text-xs font-bold text-accent">
                            {i + 1}
                          </span>
                          {f.fix}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={sendResults} className="btn-primary">
                    Get a free fix plan <Send size={16} />
                  </button>
                  <button type="button" onClick={restart} className="btn-ghost">
                    <RotateCcw size={15} /> Retake
                  </button>
                </div>
                <p className="mt-4 text-xs text-muted">
                  Suggested starting point: <span className="font-medium text-fg">{result.weakest.service}</span>. This is a
                  self-check. A real audit looks at your actual server.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

const areaBlurb: Record<HealthArea, string> = {
  Security: "verification, AutoMod and permissions",
  Structure: "onboarding and channel layout",
  Engagement: "events and how many members actually talk",
  Operations: "tickets, mod playbooks and automation",
};

function ScoreRing({ score }: { score: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="score-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent-soft))" />
            <stop offset="100%" stopColor="rgb(var(--pop))" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgb(var(--elevated))" strokeWidth="9" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#score-grad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          className="transition-[stroke-dashoffset] duration-1000"
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center">
        <span className="font-display text-3xl font-bold">
          {score}
          <span className="text-sm font-medium text-muted">/100</span>
        </span>
      </span>
    </div>
  );
}
