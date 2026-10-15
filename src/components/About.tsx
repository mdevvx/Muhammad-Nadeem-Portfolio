import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { links, profile } from "@/lib/site";

const social = [
  { label: "Upwork", href: links.upwork },
  { label: "LinkedIn", href: links.linkedin },
  { label: "GitHub", href: links.github },
  { label: "Discord", href: links.discord },
].filter((s) => s.href);

// Drop a photo named avatar.(jpg|jpeg|png|webp) into /public; until then the initials show.
const avatar = ["avatar.jpg", "avatar.jpeg", "avatar.png", "avatar.webp"].find((f) =>
  fs.existsSync(path.join(process.cwd(), "public", f)),
);

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <div data-reveal className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="mx-auto w-full max-w-sm">
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent-soft/40 to-pop/30 blur-xl" aria-hidden="true" />
            <div className="card relative grid aspect-square place-items-center overflow-hidden">
              {avatar ? (
                <Image
                  src={`/${avatar}`}
                  alt={profile.name}
                  fill
                  sizes="(min-width: 1024px) 24rem, 90vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <span className="text-gradient text-8xl font-bold tracking-tighter">{profile.initials}</span>
              )}
              <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-line bg-bg/70 px-4 py-2.5 text-xs backdrop-blur">
                <span className="font-medium">{profile.name}</span>
                <span className="font-mono text-muted">{profile.timezone}</span>
              </span>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="About"
            title={
              <>
                The person <span className="text-gradient">behind the bots</span>
              </>
            }
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            <p>
              I&apos;m {profile.name}, a software engineer and Discord specialist based in {profile.location}. I&apos;ve spent more
              than five years inside ecommerce, trading, gaming, AI and Web3 communities, running them day to day and building the tools that
              keep them organised and safe.
            </p>
            <p>
              Because I write the bots as well as manage the servers, I can fix problems at the root instead of working around
              them. That&apos;s why I build in both Python and JavaScript, back them with proper databases and write the
              documentation that lets your team own the result.
            </p>
            <p>
              I co-founded <strong className="font-semibold text-fg">DuoPlus</strong> with Muhammad Shaukat, where we build
              and run our own Discord products like PulseNotify and Threadly. Running them for real users is how I learned
              what it takes to keep a bot reliable. Today I work with ecommerce, trading, gaming, AI and Web3 communities.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-2">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
