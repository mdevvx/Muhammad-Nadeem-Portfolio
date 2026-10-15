"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Keyboard, Link2, Printer, RotateCcw, Send, Stethoscope } from "lucide-react";
import { botService, healthAreas, healthQuestions, services, type HealthArea } from "@/lib/site";
import { PREFILL_STORAGE_KEY, type ContactPrefill } from "./Contact";

type Answer = 0 | 0.5 | 1;
type Phase = "context" | "quiz" | "results";

const choices: { label: string; key: string; value: Answer; code: string }[] = [
  { label: "Yes", key: "Y", value: 1, code: "y" },
  { label: "Partly", key: "P", value: 0.5, code: "p" },
  { label: "No", key: "N", value: 0, code: "n" },
];

const sizes = ["Under 500", "500 to 5,000", "5,000 to 50,000", "50,000+"] as const;
const niches = ["Ecommerce", "Trading", "Gaming", "AI", "Web3", "Other"] as const;
const STORAGE_KEY = "health-check-progress";

// Results live in the URL so they can be shared: ?r=<y|p|n per question>&s=<size>&n=<niche>
const toCode = (a: Answer) => (a === 1 ? "y" : a === 0.5 ? "p" : "n");
const fromCode = (c: string): Answer | undefined => (c === "y" ? 1 : c === "p" ? 0.5 : c === "n" ? 0 : undefined);

function band(score: number) {
  if (score >= 80) return { label: "Solid foundation", tone: "text-accent", note: "A few tweaks will take this server from good to great." };
  if (score >= 50) return { label: "Gaps worth fixing", tone: "text-amber-400", note: "Members are probably slipping through some of these gaps right now." };
  return { label: "At risk", tone: "text-red-400", note: "These gaps are costing you members and leave the server open to raids and scams." };
}

/** Context-aware tip shown with the results. */
function nicheTip(niche: string, weakest: HealthArea) {
  if ((niche === "Trading" || niche === "Web3") && weakest !== "Security")
    return "Trading and Web3 servers are the top target for scam DMs and fake support accounts, so keep security tight even when it scores well.";
  if (niche === "Trading" || niche === "Web3") return "In trading and Web3 servers, one scam link can cost members real money. Fix security first.";
  if (niche === "Gaming") return "Gaming communities live or die by activity. Regular events and a clear XP or role system keep people coming back.";
  if (niche === "Ecommerce") return "For ecommerce, fast answers matter most. A ticket system that routes buyers to the right person protects sales.";
  if (niche === "AI") return "AI communities grow fast and noisy. Clear channels and good onboarding stop new members from getting lost.";
  return "Fix the weakest area first. Small structural changes usually make the biggest difference.";
}

/** Match a health area to the service card (and its price) on the home page. */
function serviceFor(area: HealthArea) {
  const name = healthAreas.find((a) => a.area === area)!.service.toLowerCase();
  const s = services.find((x) => x.title.toLowerCase() === name);
  if (s) return { title: s.title, price: s.price ? `${s.price} ${s.priceUnit ?? ""}`.trim() : "Custom pricing" };
  return { title: botService.title, price: botService.price ? `${botService.price} ${botService.priceUnit ?? ""}`.trim() : "Quoted per bot" };
}

export default function HealthCheckApp() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("context");
  const [size, setSize] = useState<string>("");
  const [niche, setNiche] = useState<string>("");
  const [answers, setAnswers] = useState<(Answer | undefined)[]>(() => healthQuestions.map(() => undefined));
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);

  // Restore from a shared link first, otherwise from saved progress.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("r");
    if (r && r.length === healthQuestions.length) {
      const parsed = r.split("").map(fromCode);
      if (parsed.every((a) => a !== undefined)) {
        setAnswers(parsed);
        setSize(params.get("s") ?? "");
        setNiche(params.get("n") ?? "");
        setStep(healthQuestions.length);
        setPhase("results");
        setReady(true);
        return;
      }
    }
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && Array.isArray(saved.answers) && saved.answers.length === healthQuestions.length) {
        setAnswers(saved.answers);
        setStep(saved.step ?? 0);
        setSize(saved.size ?? "");
        setNiche(saved.niche ?? "");
        setPhase(saved.phase ?? "context");
      }
    } catch {
      /* storage can be blocked; start fresh */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step, size, niche, phase }));
    } catch {
      /* ignore */
    }
  }, [ready, answers, step, size, niche, phase]);

  const result = useMemo(() => {
    if (phase !== "results") return null;
    const vals = answers.map((a) => a ?? 0);
    const score = Math.round((vals.reduce<number>((t, v) => t + v, 0) / vals.length) * 100);
    const areas = healthAreas.map(({ area }) => {
      const idx = healthQuestions.flatMap((q, i) => (q.area === area ? [i] : []));
      const pct = Math.round((idx.reduce((t, i) => t + vals[i], 0) / idx.length) * 100);
      return { area, pct };
    });
    const weakest = [...areas].sort((a, b) => a.pct - b.pct)[0];
    const fixes = healthQuestions
      .map((q, i) => ({ ...q, value: vals[i] }))
      .filter((q) => q.value < 1)
      .sort((a, b) => a.value - b.value);
    return { score, areas, weakest, fixes };
  }, [phase, answers]);

  const answer = useCallback(
    (v: Answer) => {
      setAnswers((prev) => prev.map((a, i) => (i === step ? v : a)));
      if (step + 1 >= healthQuestions.length) {
        setStep(healthQuestions.length);
        setPhase("results");
      } else setStep((s) => s + 1);
    },
    [step],
  );

  // Keyboard: Y/P/N or 1/2/3 to answer, Left arrow or Backspace to go back.
  useEffect(() => {
    if (phase !== "quiz") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      const byKey = choices.find((c, i) => c.code === k || String(i + 1) === k);
      if (byKey) {
        e.preventDefault();
        answer(byKey.value);
      } else if (k === "arrowleft" || k === "backspace") {
        e.preventDefault();
        setStep((s) => Math.max(0, s - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, answer]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [phase]);

  function restart() {
    setAnswers(healthQuestions.map(() => undefined));
    setStep(0);
    setPhase("context");
    history.replaceState(null, "", window.location.pathname);
  }

  function shareUrl() {
    const r = answers.map((a) => toCode(a ?? 0)).join("");
    const p = new URLSearchParams({ r });
    if (size) p.set("s", size);
    if (niche) p.set("n", niche);
    return `${window.location.origin}${window.location.pathname}?${p}`;
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  function sendResults() {
    if (!result) return;
    const lines = [
      `Server Health Check score: ${result.score}/100 (${band(result.score).label}).`,
      `Server: ${[size && `${size} members`, niche].filter(Boolean).join(", ") || "not specified"}.`,
      `By area: ${result.areas.map((a) => `${a.area} ${a.pct}%`).join(", ")}.`,
    ];
    if (result.fixes.length) lines.push(`Top gaps: ${result.fixes.slice(0, 3).map((f) => f.q.replace(/\.$/, "")).join("; ")}.`);
    lines.push(`Results: ${shareUrl()}`, "", "About my server: ");
    const service = healthAreas.find((a) => a.area === result.weakest.area)!.service;
    const detail: ContactPrefill = { service, message: lines.join("\n"), source: "Health Check" };
    try {
      sessionStorage.setItem(PREFILL_STORAGE_KEY, JSON.stringify(detail));
    } catch {
      /* ignore */
    }
    router.push("/#contact");
  }

  const q = healthQuestions[Math.min(step, healthQuestions.length - 1)];
  const b = result ? band(result.score) : null;

  if (!ready) return <div className="min-h-[28rem]" aria-busy="true" />;

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* Phase indicator */}
      <ol className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted print:hidden" aria-label="Progress">
        {(["context", "quiz", "results"] as Phase[]).map((p, i) => (
          <li key={p} className="flex items-center gap-2">
            <span
              className={`grid h-6 w-6 place-items-center rounded-full border text-[10px] ${
                phase === p ? "border-accent bg-accent text-on-accent" : "border-line"
              }`}
            >
              {i + 1}
            </span>
            <span className={phase === p ? "text-fg" : ""}>{p === "context" ? "Your server" : p === "quiz" ? "Questions" : "Results"}</span>
            {i < 2 && <span className="mx-1 h-px w-6 bg-line" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      <div className="card relative overflow-hidden p-6 sm:p-10">
        {phase === "context" && (
          <div className="relative animate-msg-in">
            <h2 className="text-2xl font-bold sm:text-3xl">First, a bit about your server</h2>
            <p className="mt-2 text-sm text-muted">Optional, but it makes the tips fit your situation.</p>

            <fieldset className="mt-8">
              <legend className="text-sm font-semibold">How many members?</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={size === s}
                    onClick={() => setSize(size === s ? "" : s)}
                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                      size === s ? "border-accent bg-accent-soft/15" : "border-line bg-bg/40 hover:border-accent/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-sm font-semibold">What kind of community?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {niches.map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-pressed={niche === n}
                    onClick={() => setNiche(niche === n ? "" : n)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      niche === n ? "border-accent bg-accent-soft/15" : "border-line bg-bg/40 hover:border-accent/60"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </fieldset>

            <button type="button" onClick={() => setPhase("quiz")} className="btn-primary mt-10 w-full py-3.5 sm:w-auto">
              {answers.some((a) => a !== undefined) ? "Continue the questions" : "Start the questions"} <ArrowRight size={16} />
            </button>
          </div>
        )}

        {phase === "quiz" && (
          <div className="relative">
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="inline-flex items-center gap-2 font-mono uppercase tracking-widest text-accent">
                <Stethoscope size={14} /> {q.area}
              </span>
              <span className="font-mono">
                {step + 1} / {healthQuestions.length}
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-elevated" aria-hidden="true">
              <div
                className="h-full rounded-full bg-accent-soft transition-all duration-500"
                style={{ width: `${(step / healthQuestions.length) * 100}%` }}
              />
            </div>

            <p key={step} className="mt-10 min-h-[5rem] animate-msg-in font-display text-2xl font-semibold leading-snug sm:text-3xl" aria-live="polite">
              {q.q}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {choices.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => answer(c.value)}
                  className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-4 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-accent/70 hover:bg-elevated ${
                    answers[step] === c.value ? "border-accent bg-accent-soft/15" : "border-line bg-bg/40"
                  }`}
                >
                  {c.label}
                  <kbd className="hidden rounded border border-line px-1.5 font-mono text-[10px] font-normal text-muted sm:inline">{c.key}</kbd>
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => (step === 0 ? setPhase("context") : setStep((s) => s - 1))}
                className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-fg"
              >
                <ArrowLeft size={15} /> Back
              </button>
              <p className="hidden items-center gap-1.5 text-xs text-muted sm:inline-flex">
                <Keyboard size={14} /> Press Y, P or N to answer
              </p>
            </div>

            {/* Jump between questions */}
            <ol className="mt-8 flex flex-wrap gap-1.5" aria-label="Jump to question">
              {healthQuestions.map((hq, i) => (
                <li key={hq.q}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-label={`Question ${i + 1}${answers[i] !== undefined ? ", answered" : ""}`}
                    aria-current={i === step}
                    className={`h-2.5 w-6 rounded-full transition ${
                      i === step ? "bg-accent" : answers[i] !== undefined ? "bg-accent/40 hover:bg-accent/70" : "bg-line hover:bg-muted"
                    }`}
                  />
                </li>
              ))}
            </ol>
          </div>
        )}

        {phase === "results" && result && b && (
          <div className="relative animate-msg-in" aria-live="polite">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <ScoreRing score={result.score} />
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  Your score{size || niche ? ` · ${[size && `${size} members`, niche].filter(Boolean).join(", ")}` : ""}
                </p>
                <p className={`mt-1 font-display text-3xl font-bold ${b.tone}`}>{b.label}</p>
                <p className="mt-1 max-w-md text-sm text-muted">{b.note}</p>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {result.areas.map((a) => (
                <div key={a.area} className="rounded-xl border border-line bg-bg/40 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold">{a.area}</span>
                    <span className="font-mono text-sm text-muted">{a.pct}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-elevated">
                    <div
                      className={`h-full rounded-full ${a.pct >= 80 ? "bg-accent" : a.pct >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                      style={{ width: `${Math.max(a.pct, 4)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm leading-relaxed">
              <span className="font-semibold">Tip for your server: </span>
              {nicheTip(niche, result.weakest.area)}
            </p>

            {result.fixes.length > 0 ? (
              <div className="mt-10">
                <h3 className="text-lg font-semibold">Your fix list</h3>
                <ol className="mt-4 space-y-3">
                  {result.fixes.map((f) => {
                    const high = f.value === 0;
                    return (
                      <li key={f.q} className="rounded-xl border border-line bg-bg/40 p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                              high ? "bg-red-400/15 text-red-400" : "bg-amber-400/15 text-amber-400"
                            }`}
                          >
                            {high ? "High priority" : "Medium"}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{f.area}</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{f.fix}</p>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ) : (
              <p className="mt-10 flex items-center gap-2 text-sm text-accent">
                <Check size={16} /> Nothing to fix. Your server is in great shape.
              </p>
            )}

            {/* Matching service */}
            <div className="mt-10 rounded-2xl border border-line bg-elevated/60 p-5 sm:p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">Where I&apos;d start</p>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-xl font-bold">{serviceFor(result.weakest.area).title}</p>
                <p className="text-sm text-muted">{serviceFor(result.weakest.area).price}</p>
              </div>
              <p className="mt-1 text-sm text-muted">Your weakest area is {result.weakest.area.toLowerCase()}, so this is where you&apos;ll see the fastest change.</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap print:hidden">
              <button type="button" onClick={sendResults} className="btn-primary w-full py-3.5 sm:w-auto sm:py-3">
                Get a free fix plan <Send size={16} />
              </button>
              <button type="button" onClick={copyLink} className="btn-ghost w-full sm:w-auto">
                {copied ? <Check size={15} className="text-accent" /> : <Link2 size={15} />} {copied ? "Link copied" : "Copy share link"}
              </button>
              <button type="button" onClick={() => window.print()} className="btn-ghost w-full sm:w-auto">
                <Printer size={15} /> Save as PDF
              </button>
              <button type="button" onClick={restart} className="btn-ghost w-full sm:w-auto">
                <RotateCcw size={15} /> Start over
              </button>
            </div>
            <p className="mt-4 text-xs text-muted">This is a self-check. A real audit looks at your actual server.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-32 w-32 shrink-0">
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
        <span className="font-display text-4xl font-bold">
          {score}
          <span className="text-sm font-medium text-muted">/100</span>
        </span>
      </span>
    </div>
  );
}
