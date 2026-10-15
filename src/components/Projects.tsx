"use client";

import { useState } from "react";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { links, projectCategories, projects, type ProjectCategory } from "@/lib/site";

type Filter = "All" | ProjectCategory;

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));
  const filters: Filter[] = ["All", ...projectCategories];

  return (
    <section id="work" className="py-16 sm:py-20">
      <div className="container-page">
        <div data-reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Custom Discord bots"
            title={
              <>
                Discord bots <span className="text-gradient">in production</span>
              </>
            }
            description="Custom bots I&apos;ve built for client servers, plus a few of my own products, in discord.py and discord.js."
          />
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0 self-start sm:self-auto">
            <FolderGit2 size={16} /> All bots on GitHub
          </a>
        </div>

        <div role="group" aria-label="Filter bots" className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-accent-soft bg-accent-soft text-on-accent shadow-lg shadow-accent-soft/25"
                    : "border-line bg-surface/60 text-muted hover:border-accent/60 hover:text-fg"
                }`}
              >
                {f}
                <span className={`font-mono text-xs ${active ? "text-on-accent/70" : "text-muted/70"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <article
              key={`${filter}-${p.title}`}
              className="card group relative flex animate-msg-in flex-col overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent-soft/10"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-soft/0 blur-3xl transition duration-500 group-hover:bg-accent-soft/20"
                aria-hidden="true"
              />
              <p className="font-mono text-[11px] uppercase tracking-widest text-pop">{p.kind}</p>
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
              >
                View on GitHub <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
