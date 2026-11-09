import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp, Mail } from "lucide-react";
import CookiePrefsButton from "./CookiePrefsButton";
import { DiscordIcon, GitHubIcon, LinkedInIcon, UpworkIcon } from "./SocialIcons";
import { links, nav, profile, services, botService } from "@/lib/site";

const socials = [
  { label: "Upwork", href: links.upwork, Icon: UpworkIcon },
  { label: "LinkedIn", href: links.linkedin, Icon: LinkedInIcon },
  { label: "GitHub", href: links.github, Icon: GitHubIcon },
  { label: "Discord", href: links.discord, Icon: DiscordIcon },
].filter((s) => s.href);

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/50 print:hidden">
      {/* Same width as the header pill (max-w-5xl) so the edges line up. */}
      <div className="mx-auto max-w-5xl px-5 pb-8 pt-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/avatar.jpg" alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover ring-1 ring-line" />
              <div>
                <p className="font-display text-lg font-bold leading-tight">{profile.siteName}</p>
                <p className="text-xs text-muted">{profile.role}</p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Discord community management, custom bots and server security for brands that take their community seriously.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-bg/60 px-3 py-1.5 text-xs font-medium">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Currently accepting clients
            </p>
            <div className="mt-5">
              <Link href="/#contact" data-track="cta_start_project" data-track-label="footer" className="btn-primary px-5 py-2.5">
                Start a project <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            <Col
              title="Services"
              items={[
                ...services.map((s) => ({ label: s.title, href: "/#services" })),
                { label: botService.title, href: "/#services" },
                { label: "Free health check", href: "/health-check" },
              ]}
            />
            <Col title="Site" items={nav.map((n) => ({ label: n.label, href: `/${n.href}` }))} />

            <div className="min-w-0">
              <Heading>Legal</Heading>
              <ul className="mt-4 space-y-2.5 text-sm">
                {legal.map((l) => (
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
              <Heading>Contact</Heading>
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
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <p className="mt-1">Not affiliated with Discord Inc. Discord is a trademark of its respective owner.</p>
          </div>
          <Link
            href="/#top"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-4 py-2 font-medium text-fg/80 transition hover:border-accent/60 hover:text-accent"
          >
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{children}</p>;
}

function Col({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="min-w-0">
      <Heading>{title}</Heading>
      <ul className="mt-4 space-y-2.5 text-sm">
        {items.map((i) => (
          <li key={i.label}>
            <Link href={i.href} className="text-fg/80 transition hover:text-accent">
              {i.label}
            </Link>
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
