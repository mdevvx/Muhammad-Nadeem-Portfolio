"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Command, Menu, X } from "lucide-react";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";
import ThemeToggle from "./ThemeToggle";
import { links, nav, profile } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // On other pages, section links need to go back to the home page first.
  const base = usePathname() === "/" ? "" : "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 print:hidden">
      <Link
        href="/health-check"
        data-track="cta_health_check"
        data-track-label="top_banner"
        className="group flex h-9 items-center justify-center gap-2.5 border-b border-accent/20 bg-accent-soft/15 px-4 text-xs font-medium text-fg backdrop-blur-md sm:text-[13px]"
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span>
          <span className="sm:hidden">Accepting clients</span>
          <span className="hidden sm:inline">Currently accepting clients</span>
        </span>
        <span className="text-muted/60" aria-hidden="true">
          ·
        </span>
        <span className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition group-hover:decoration-accent">
          <span className="sm:hidden">Free server check</span>
          <span className="hidden sm:inline">Get your free server health check</span>
        </span>
      </Link>
      <div className="px-4 pt-3">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line bg-surface/80 py-2 pl-5 pr-2 shadow-lg shadow-black/10 backdrop-blur-md"
      >
        <Link href={`${base}#top`} className="flex items-center gap-2 font-semibold tracking-tight" onClick={() => setOpen(false)}>
          <Image
            src="/avatar.jpg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover ring-1 ring-line"
            priority
          />
          {profile.siteName}
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={`${base}${item.href}`}
                data-nav-link
                className="rounded-full px-3.5 py-2 text-sm text-muted transition hover:bg-elevated hover:text-fg data-[active]:bg-elevated data-[active]:text-fg"
              >
                {item.label}
              </Link>
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
          <Link href={`${base}#contact`} data-track="cta_start_project" data-track-label="nav" className="btn-primary hidden px-4 py-2 sm:inline-flex">
            Hire me
          </Link>
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
          className="mx-auto mt-2 max-w-6xl animate-msg-in rounded-3xl border border-line bg-surface/95 p-3 shadow-xl backdrop-blur-md lg:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={`${base}${item.href}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-medium text-fg hover:bg-elevated"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className={`mt-2 grid gap-2 ${links.booking ? "grid-cols-2" : "grid-cols-1"}`}>
              <Link href={`${base}#contact`} data-track="cta_start_project" data-track-label="mobile_menu" onClick={() => setOpen(false)} className="btn-primary">
                Hire me
              </Link>
              {links.booking && (
                <a href={links.booking} data-track="cta_book_call" data-track-label="mobile_menu" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  Book a call
                </a>
              )}
            </li>
          </ul>
        </div>
      )}
      </div>
    </header>
  );
}
