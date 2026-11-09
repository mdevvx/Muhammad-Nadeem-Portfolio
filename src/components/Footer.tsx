import Link from "next/link";
import CookiePrefsButton from "./CookiePrefsButton";
import { links, nav, profile, services, botService } from "@/lib/site";

const socials = [
  { label: "Upwork", href: links.upwork },
  { label: "LinkedIn", href: links.linkedin },
  { label: "GitHub", href: links.github },
  { label: "Discord", href: links.discord },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="border-t border-line pb-10 pt-14 print:hidden">
      <div className="container-page grid grid-cols-2 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-xl font-bold">{profile.siteName}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            Discord community management, custom bots and server security for brands that take their community seriously.
          </p>
        </div>

        <FooterCol title="Services" items={[...services.map((s) => ({ label: s.title, href: "/#services" })), { label: botService.title, href: "/#services" }, { label: "Free health check", href: "/health-check" }]} />
        <FooterCol title="Site" items={nav.map((n) => ({ label: n.label, href: `/${n.href}` }))} />
        <FooterCol
          title="Contact"
          items={[{ label: "Email me", href: `mailto:${profile.email}` }, ...socials.map((s) => ({ ...s, external: true }))]}
        />
      </div>

      <div className="container-page mt-12 border-t border-line/60 pt-6 text-center text-xs text-muted">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p className="mt-1">Not affiliated with Discord Inc. Discord is a trademark of its respective owner.</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            {i.external || i.href.startsWith("mailto:") ? (
              <a
                href={i.href}
                {...(i.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="text-fg/80 transition hover:text-accent"
              >
                {i.label}
              </a>
            ) : (
              <Link href={i.href} className="text-fg/80 transition hover:text-accent">
                {i.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
