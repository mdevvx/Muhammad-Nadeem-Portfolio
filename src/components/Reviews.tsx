import { ArrowUpRight, BadgeCheck, Quote, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { links, reviews, shoutouts, type Review } from "@/lib/site";

const initials = (r: Review) => {
  const words = r.client.split(" ");
  return (words.length === 1 ? words[0].slice(0, 2) : words.map((w) => w[0]).join("").slice(0, 2)).toUpperCase();
};

const who = (r: Review) => (r.company ? `${r.client}, ${r.company}` : r.client);

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} className={i < Math.round(rating) ? "fill-pop text-pop" : "text-line"} aria-hidden="true" />
      ))}
    </span>
  );
}

function Author({ r }: { r: Review }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-soft to-pop font-display text-sm font-bold text-on-accent">
        {initials(r)}
      </span>
      <span className="min-w-0">
        <span className="block font-semibold">{who(r)}</span>
        <span className="text-xs text-muted">{r.dates}</span>
      </span>
    </div>
  );
}

function Endorsements({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Endorsed by client">
      {items.map((e) => (
        <li key={e} className="chip">
          {e}
        </li>
      ))}
    </ul>
  );
}

/** Client reviews, quoted verbatim from Upwork and linked back to the profile for verification. */
export default function Reviews() {
  if (reviews.length === 0) return null;
  const featured = reviews.find((r) => r.featured);
  const quoted = reviews.filter((r) => r !== featured && r.quote);
  const ratingOnly = reviews.filter((r) => !r.quote);
  const avg = reviews.reduce((t, r) => t + r.rating, 0) / reviews.length;

  return (
    <section id="reviews" className="py-16 sm:py-20">
      <div data-reveal className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Client reviews"
            title={
              <>
                Don&apos;t take my word, <span className="text-gradient">take theirs</span>
              </>
            }
          />
          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            <div className="flex items-center gap-3">
              <Stars rating={avg} size={18} />
              <span className="font-display text-lg font-bold">{avg.toFixed(1)}</span>
              <span className="text-sm text-muted">{reviews.length} Upwork reviews</span>
            </div>
            <a href={links.upwork} target="_blank" rel="noopener noreferrer" className="btn-ghost px-4 py-2">
              <BadgeCheck size={16} className="text-accent" /> Verify on Upwork <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {featured && (
          <figure className="card relative mt-10 overflow-hidden p-6 sm:p-10">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-pop/10 blur-3xl" aria-hidden="true" />
            <Quote size={64} className="absolute right-6 top-6 text-accent/15 sm:right-10 sm:top-8" aria-hidden="true" />
            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
              <div className="flex flex-col gap-5">
                <span className="chip self-start border-accent/40 text-accent">Featured review</span>
                <div>
                  <Stars rating={featured.rating} size={18} />
                  <p className="mt-3 font-display text-xl font-bold">{featured.project}</p>
                </div>
                <Author r={featured} />
                <Endorsements items={featured.endorsements} />
              </div>
              <blockquote className="space-y-4 text-base leading-relaxed text-fg/90 sm:text-lg">
                {featured.quote!.split("\n\n").map((para, i, all) => (
                  <p key={i}>
                    {i === 0 && "“"}
                    {para}
                    {i === all.length - 1 && "”"}
                  </p>
                ))}
              </blockquote>
            </div>
          </figure>
        )}

        {/* Masonry columns: handles odd counts and very different quote lengths */}
        <div className="mt-4 gap-4 md:columns-2">
          {quoted.map((r) => (
            <figure key={r.client + r.dates} className="card mb-4 flex break-inside-avoid flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Stars rating={r.rating} />
                <span className="text-xs text-muted">{r.project}</span>
              </div>
              <blockquote className="mt-5 flex-1 whitespace-pre-line font-display text-lg font-semibold leading-snug">&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 flex flex-col gap-4 border-t border-line pt-5">
                <Author r={r} />
                <Endorsements items={r.endorsements} />
              </figcaption>
            </figure>
          ))}
        </div>

        {shoutouts.map((s) => (
          <figure key={s.handle} className="card mb-4 overflow-hidden">
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-elevated/60 px-5 py-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />
                Live from Discord
              </span>
              <span className="font-mono text-[11px] text-muted">{s.server}</span>
            </figcaption>
            <div className="flex gap-3 p-5 sm:p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-pop to-accent-soft font-display text-sm font-bold text-on-accent">
                {s.author
                  .split(" ")
                  .map((p) => p[0])
                  .join("")}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-semibold text-pop">{s.handle}</span>
                  <span className="ml-2 text-xs text-muted">{s.author}</span>
                </p>
                <ul className="mt-1 space-y-3">
                  {s.messages.map((m) => (
                    <li key={m.text}>
                      <blockquote className="text-base leading-relaxed">
                        {m.text.split(/(@everyone)/).map((part, i) =>
                          part === "@everyone" ? (
                            <span key={i} className="rounded bg-accent/15 px-1 font-medium text-accent">
                              {part}
                            </span>
                          ) : (
                            part
                          ),
                        )}
                      </blockquote>
                      <div className="mt-1.5 flex flex-wrap gap-1.5" aria-label="Reactions">
                        {m.reactions.map((r) => (
                          <span
                            key={r.emoji}
                            className="inline-flex items-center gap-1 rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-xs font-semibold"
                          >
                            <span aria-hidden="true">{r.emoji}</span> {r.count}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </figure>
        ))}

        {ratingOnly.map((r) => (
          <figure
            key={r.client + r.dates}
            className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Author r={r} />
              <span className="hidden h-8 w-px bg-line sm:block" aria-hidden="true" />
              <div>
                <Stars rating={r.rating} />
                <p className="mt-1 text-sm text-muted">{r.project}</p>
              </div>
            </div>
            <Endorsements items={r.endorsements} />
          </figure>
        ))}
      </div>
    </section>
  );
}
