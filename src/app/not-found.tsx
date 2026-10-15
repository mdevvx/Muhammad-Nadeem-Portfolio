import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Hash } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const shortcuts = [
  { label: "services", href: "/#services" },
  { label: "bots", href: "/#work" },
  { label: "reviews", href: "/#reviews" },
  { label: "free-health-check", href: "/health-check" },
  { label: "contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden py-16">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-page flex flex-col items-center text-center">
        <p className="text-gradient font-display text-[7rem] font-bold leading-none sm:text-[10rem]">404</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">This channel doesn&apos;t exist</h1>
        <p className="mt-4 max-w-md text-muted">
          The page you&apos;re looking for was moved, deleted or never existed. Try one of these instead.
        </p>

        {/* Discord-style channel list */}
        <div className="card mt-10 w-full max-w-sm overflow-hidden text-left">
          <p className="border-b border-line bg-elevated/60 px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-muted">
            Text channels
          </p>
          <ul className="p-2">
            {shortcuts.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted transition hover:bg-accent-soft/15 hover:text-fg"
                >
                  <Hash size={15} className="shrink-0" />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link href="/" className="btn-primary mt-8">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </div>
    </main>
  );
}
