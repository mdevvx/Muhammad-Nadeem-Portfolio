"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Command, CornerDownLeft, Copy, Hash, Moon, Search, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { links, nav, profile } from "@/lib/site";

type Action = { id: string; label: string; hint: string; icon: LucideIcon; run: () => void };

export const OPEN_PALETTE_EVENT = "palette:open";

function go(hash: string, push: (href: string) => void) {
  if (window.location.pathname !== "/") {
    push(`/${hash}`);
    return;
  }
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  history.replaceState(null, "", hash);
}

/** Ctrl/⌘+K quick actions: jump to a section, copy the email, switch theme, open GitHub. */
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const actions = useMemo<Action[]>(
    () => [
      ...nav.map((n) => ({ id: n.href, label: n.label, hint: "Jump to section", icon: Hash, run: () => go(n.href, router.push) })),
      { id: "contact", label: "Start a project", hint: "Jump to contact form", icon: CornerDownLeft, run: () => go("#contact", router.push) },
      { id: "audit", label: "Run the Server Health Check", hint: "Free, 2 minutes", icon: Stethoscope, run: () => router.push("/health-check") },
      {
        id: "copy",
        label: "Copy email address",
        hint: profile.email,
        icon: Copy,
        run: () => void navigator.clipboard?.writeText(profile.email).catch(() => {}),
      },
      {
        id: "theme",
        label: "Toggle light / dark theme",
        hint: "Appearance",
        icon: Moon,
        run: () => document.querySelector<HTMLButtonElement>("[data-theme-toggle]")?.click(),
      },
      { id: "github", label: "Open GitHub", hint: "github.com/mdevvx", icon: ArrowUpRight, run: () => window.open(links.github, "_blank", "noopener") },
    ],
    [router],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? actions.filter((a) => `${a.label} ${a.hint}`.toLowerCase().includes(q)) : actions;
  }, [actions, query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      returnFocus.current?.focus?.();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  function run(a: Action) {
    setOpen(false);
    // Let the dialog close (and focus return) before scrolling.
    setTimeout(a.run, 10);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[14vh]" onKeyDown={onKeyDown}>
      <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Quick actions"
        className="relative w-full max-w-lg animate-msg-in overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={17} className="shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search…"
            aria-label="Search actions"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `palette-${results[active].id}` : undefined}
            className="h-14 w-full bg-transparent text-sm text-fg placeholder:text-muted/70 focus:outline-none"
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">Esc</kbd>
        </div>
        <ul id="palette-list" role="listbox" className="max-h-80 overflow-auto p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No matches</li>}
          {results.map((a, i) => (
            <li
              key={a.id}
              id={`palette-${a.id}`}
              role="option"
              aria-selected={i === active}
              onPointerEnter={() => setActive(i)}
              onClick={() => run(a)}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                i === active ? "bg-accent-soft/15 text-fg" : "text-muted"
              }`}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-elevated">
                <a.icon size={15} className={i === active ? "text-accent" : ""} />
              </span>
              <span className="flex-1 truncate font-medium">{a.label}</span>
              <span className="hidden truncate text-xs text-muted sm:block">{a.hint}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 font-mono text-[10px] text-muted">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span className="ml-auto inline-flex items-center gap-1">
            <Command size={11} /> K to toggle
          </span>
        </div>
      </div>
    </div>
  );
}
