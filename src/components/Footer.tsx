import Link from "next/link";
import { Mail } from "lucide-react";
import CookiePrefsButton from "./CookiePrefsButton";
import { DiscordIcon, GitHubIcon, LinkedInIcon, UpworkIcon } from "./SocialIcons";
import { links, nav, profile, services, botService } from "@/lib/site";

const socials = [
  { label: "Upwork", href: links.upwork, Icon: UpworkIcon },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: links.github, Icon: GitHubIcon },
  { label: "Discord", href: links.discord, Icon: DiscordIcon },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="border-t border-line px-4 pb-8 pt-14 print:hidden">
      {/* Same outer width as the header pill (max-w-5xl, 16px gutters) so both edges line up. */}
      <div className="mx-auto max-w-5xl px-5">
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1.1fr]">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-xl font-bold">{profile.siteName}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            Discord community management, custom bots and server security for brands that take their community seriously.
          </p>
        </div>

        <FooterCol title="Services" items={[...services.map((s) => ({ label: s.title, href: "/#services" })), { label: botService.title, href: "/#services" }, { label: "Free health check", href: "/health-check" }]} />
        <FooterCol title="Site" items={nav.map((n) => ({ label: n.label, href: `/${n.href}` }))} />
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Legal</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
              { label: "Disclaimer", href: "/disclaimer" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-fg/80 transition hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <CookiePrefsButton className="text-left text-fg/80 transition hover:text-accent">Cookie Preferences</CookiePrefsButton>
            </li>
          </ul>
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Contact</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <ContactLink href={`mailto:${profile.email}`} label="Email me">
                <Mail size={16} aria-hidden="true" />
              </ContactLink>
            </li>
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <ContactLink href={href} label={label} external>
                  <Icon className="h-4 w-4" />
                </ContactLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-line/60 pt-6 text-center text-xs text-muted">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p className="mt-1">Not affiliated with Discord Inc. Discord is a trademark of its respective owner.</p>
      </div>
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

function ContactLink({ href, label, external, children }: { href: string; label: string; external?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-2.5 text-fg/80 transition hover:text-accent"
    >
      <span className="shrink-0">{children}</span>
      {label}
    </a>
  );
}
