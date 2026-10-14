"use client";

import { useEffect, useState } from "react";
import { Bot, Hash, Lock, Radio, ShieldAlert, Ticket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Scenario = {
  channel: string;
  label: string;
  icon: LucideIcon;
  bot: string;
  user: { initials: string; name: string; text: string };
  reply: {
    color: string;
    title: string;
    body: string;
    fields?: { name: string; value: string }[];
    buttons: string[];
  };
};

// Each scene mirrors a real bot from the Work section. Names and data are made up.
const scenarios: Scenario[] = [
  {
    channel: "support-tickets",
    label: "AI ticket triage",
    icon: Ticket,
    bot: "SupportPilot",
    user: { initials: "AK", name: "Alex", text: "Paid for Pro an hour ago but I still don't have the role." },
    reply: {
      color: "border-accent-soft",
      title: "Ticket #214 opened",
      body: "Found a matching answer in the knowledge base. Roles sync within 5 minutes of payment, so I've escalated this to billing staff.",
      fields: [
        { name: "Category", value: "Billing" },
        { name: "Confidence", value: "82%" },
      ],
      buttons: ["Claim", "Close"],
    },
  },
  {
    channel: "general",
    label: "AI moderation",
    icon: ShieldAlert,
    bot: "Shadowban",
    user: { initials: "NX", name: "nitro_gift", text: "free nitro for everyone, claim here → disc0rd-gift.xyz" },
    reply: {
      color: "border-red-400",
      title: "Message held for review",
      body: "Hidden from members and sent to the mod queue. The sender only sees their own message.",
      fields: [
        { name: "Reason", value: "Scam link" },
        { name: "Confidence", value: "97%" },
      ],
      buttons: ["Approve", "Reject", "Release"],
    },
  },
  {
    channel: "verify",
    label: "Membership verification",
    icon: Lock,
    bot: "Membership Bot",
    user: { initials: "SR", name: "Sara", text: "Submitted my email: sara@…" },
    reply: {
      color: "border-mint",
      title: "Welcome in, Sara",
      body: "Your email matches an active subscription. Roles assigned and the members area is now unlocked.",
      fields: [
        { name: "Plan", value: "Pro, monthly" },
        { name: "Roles", value: "Verified, Pro" },
      ],
      buttons: ["Start here"],
    },
  },
  {
    channel: "live-alerts",
    label: "Creator alerts",
    icon: Radio,
    bot: "PulseNotify",
    user: { initials: "⏱", name: "Scheduler", text: "Checking 48 tracked creators…" },
    reply: {
      color: "border-[#53fc18]",
      title: "🔴 Rayne is live on Kick",
      body: "Late night ranked grind, come hang out. @Live Pings",
      fields: [
        { name: "Category", value: "Valorant" },
        { name: "Started", value: "just now" },
      ],
      buttons: ["Watch stream"],
    },
  },
];

const SCENE_MS = 7000;

/** Interactive Discord mock: click a channel to replay that bot. Auto-cycles until the visitor interacts. */
export default function ServerMock() {
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<0 | 1 | 2>(0); // 0 user msg, 1 bot typing, 2 bot reply
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAuto(false);
      setStage(2);
    }
  }, []);

  // Play the current scene: user message, typing indicator, then the bot reply.
  useEffect(() => {
    setStage(0);
    const t1 = setTimeout(() => setStage(1), 700);
    const t2 = setTimeout(() => setStage(2), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [index]);

  useEffect(() => {
    if (!auto || paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % scenarios.length), SCENE_MS);
    return () => clearTimeout(t);
  }, [index, auto, paused]);

  const s = scenarios[index];

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent-soft/35 via-transparent to-mint/25 blur-3xl" aria-hidden="true" />
      <div className="card overflow-hidden shadow-2xl shadow-black/40">
        <div className="flex items-center gap-1.5 border-b border-line bg-elevated/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
          <span className="ml-3 font-mono text-[11px] text-muted">your-server</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-mint">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" /> Live demo
          </span>
        </div>

        <div className="grid grid-cols-[8.5rem_1fr] sm:grid-cols-[11rem_1fr]">
          <div className="border-r border-line bg-bg/40 p-2.5 sm:p-3">
            <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-widest text-muted">Try a bot</p>
            <ul className="space-y-0.5" role="tablist" aria-label="Bot demos">
              {scenarios.map((sc, i) => {
                const selected = i === index;
                return (
                  <li key={sc.channel} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls="bot-demo-panel"
                      onClick={() => {
                        setAuto(false);
                        setIndex(i);
                        if (i === index) setStage(0);
                      }}
                      className={`group flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs transition ${
                        selected ? "bg-accent-soft/20 font-medium text-fg" : "text-muted hover:bg-elevated hover:text-fg"
                      }`}
                    >
                      <Hash size={13} className="shrink-0" />
                      <span className="truncate">{sc.channel}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* Progress through the auto-play cycle */}
            <div className="mt-4 hidden gap-1 px-2 sm:flex" aria-hidden="true">
              {scenarios.map((sc, i) => (
                <span key={sc.channel} className={`h-1 flex-1 rounded-full transition-colors ${i === index ? "bg-accent" : "bg-line"}`} />
              ))}
            </div>
          </div>

          <div id="bot-demo-panel" role="tabpanel" aria-live="polite" className="flex min-h-[19rem] flex-col p-3 sm:min-h-[20rem] sm:p-4">
            <p className="mb-3 inline-flex items-center gap-1.5 self-start rounded-full border border-line px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted">
              <s.icon size={12} className="text-accent" /> {s.label}
            </p>

            <div key={`u-${index}`} className="flex animate-msg-in gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-elevated text-[11px] font-semibold">{s.user.initials}</div>
              <div className="min-w-0">
                <p className="text-xs font-semibold">
                  {s.user.name} <span className="ml-1 font-normal text-muted">Today at 9:41</span>
                </p>
                <p className="mt-0.5 text-xs text-muted">{s.user.text}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              {stage >= 1 && (
                <div className="grid h-8 w-8 shrink-0 animate-msg-in place-items-center rounded-full bg-gradient-to-br from-accent-soft to-mint text-white">
                  <Bot size={15} />
                </div>
              )}
              {stage === 1 && (
                <p className="flex items-center gap-2 self-center text-[11px] text-muted">
                  <span className="flex gap-0.5" aria-hidden="true">
                    <span className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-muted" />
                    <span className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-muted [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-muted [animation-delay:300ms]" />
                  </span>
                  {s.bot} is typing
                </p>
              )}
              {stage === 2 && (
                <div key={`b-${index}`} className="min-w-0 flex-1 animate-msg-in">
                  <p className="text-xs font-semibold">
                    {s.bot} <span className="ml-1 rounded bg-accent-soft px-1 py-px text-[9px] font-bold uppercase text-white">App</span>
                  </p>
                  <div className={`mt-1.5 rounded-lg border-l-4 ${s.reply.color} bg-elevated/80 p-3`}>
                    <p className="text-xs font-semibold">{s.reply.title}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-muted">{s.reply.body}</p>
                    {s.reply.fields && (
                      <dl className="mt-2.5 grid grid-cols-2 gap-2">
                        {s.reply.fields.map((f) => (
                          <div key={f.name}>
                            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">{f.name}</dt>
                            <dd className="text-[11px] text-fg">{f.value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {s.reply.buttons.map((b, i) => (
                        <span
                          key={b}
                          className={`rounded px-2 py-1 text-[10px] font-semibold ${
                            i === 0 ? "bg-accent-soft text-white" : "bg-surface text-muted ring-1 ring-line"
                          }`}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-auto rounded-lg bg-elevated/70 px-3 py-2.5 text-xs text-muted">Message #{s.channel}</div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
        Click a channel to replay a bot · sample data
      </p>
    </div>
  );
}
