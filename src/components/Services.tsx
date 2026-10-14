import { Bot, Check, Compass, LayoutDashboard, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { botService, services, stack, type IconKey } from "@/lib/site";

const icons: Record<IconKey, LucideIcon> = {
  users: Users,
  layout: LayoutDashboard,
  shield: ShieldCheck,
  compass: Compass,
  bot: Bot,
};

const snippet = `@bot.tree.command(name="ticket")
async def ticket(i: discord.Interaction, topic: str):
    category = await classify(topic)      # AI triage
    channel = await open_ticket(i.user, category)
    await i.response.send_message(
        f"Ticket opened in {channel.mention}",
        ephemeral=True,
    )`;

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-20">
      <div data-reveal className="container-page">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Everything your server needs, <span className="text-gradient">under one roof</span>
            </>
          }
          description="Pick one service or combine them. Most projects start with a buildout or a bot and grow into ongoing management."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <article key={s.id} className={`card group p-6 transition hover:-translate-y-0.5 hover:border-accent/50 ${s.span}`}>
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft/15 text-accent">
                    <Icon size={21} />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">{s.blurb}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check size={15} className="mt-0.5 shrink-0 text-mint" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}

          <article className="card relative overflow-hidden p-6 md:col-span-6 md:p-8">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent-soft/20 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              <div>
                <span className="chip border-accent/40 text-accent">Specialty</span>
                <h3 className="mt-4 flex items-center gap-3 text-2xl font-bold tracking-tight">
                  <Bot className="text-accent" size={26} /> {botService.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{botService.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {botService.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="btn-primary mt-7">
                  Discuss a bot
                </a>
              </div>

              <div className="space-y-5">
              <div aria-hidden="true" className="overflow-hidden rounded-xl border border-line bg-bg/70">
                <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="h-2 w-2 rounded-full bg-line" />
                  <span className="ml-2 font-mono text-[11px] text-muted">cogs/tickets.py</span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-fg/90">
                  <code>{snippet}</code>
                </pre>
              </div>

              <div>
                <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted">Stack I build with</p>
                <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {stack.map((g) => (
                    <div key={g.group}>
                      <dt className="text-xs font-semibold text-fg">{g.group}</dt>
                      <dd className="mt-1 text-xs leading-relaxed text-muted">{g.items.join(" · ")}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
