"use client";

import { useState } from "react";
import Image from "next/image";
import { Command, Menu, X } from "lucide-react";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";
import ThemeToggle from "./ThemeToggle";
import { links, nav, profile } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-4xl items-center justify-between rounded-full border border-line bg-surface/80 py-2 pl-5 pr-2 shadow-lg shadow-black/10 backdrop-blur-md"
      >
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight" onClick={() => setOpen(false)}>
          <Image
            src="/avatar.jpg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover ring-1 ring-line"
            priority
          />
          {profile.siteName}
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                data-nav-link
                className="rounded-full px-3.5 py-2 text-sm text-muted transition hover:bg-elevated hover:text-fg data-[active]:bg-elevated data-[active]:text-fg"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            aria-label="Open quick actions"
            className="hidden h-9 items-center gap-1.5 rounded-full border border-line px-3 font-mono text-[11px] text-muted transition hover:border-accent/60 hover:text-fg sm:inline-flex"
          >
            <Command size={12} /> K
          </button>
          <ThemeToggle />
          <a href="#contact" className="btn-primary hidden px-4 py-2 sm:inline-flex">
            Hire me
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-line lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-4xl animate-msg-in rounded-3xl border border-line bg-surface/95 p-3 shadow-xl backdrop-blur-md lg:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-fg hover:bg-elevated"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className={`mt-2 grid gap-2 ${links.booking ? "grid-cols-2" : "grid-cols-1"}`}>
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary">
                Hire me
              </a>
              {links.booking && (
                <a href={links.booking} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Book a call
                </a>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
