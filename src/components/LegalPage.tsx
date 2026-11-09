import Navbar from "./Navbar";
import Footer from "./Footer";
import CommandPalette from "./CommandPalette";
import { legalUpdated, type LegalDoc } from "@/lib/legal";

/** Shared layout for the Privacy, Terms, Cookie and Disclaimer pages. */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Navbar />
      <main id="main" className="pb-20 pt-40 sm:pt-48">
        <article className="container-page max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{doc.title}</h1>
          <p className="mt-3 text-sm text-muted">Last updated {legalUpdated}</p>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">{doc.intro}</p>

          <div className="mt-10 space-y-9">
            {doc.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-semibold tracking-tight">{s.heading}</h2>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                    {p}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-accent sm:text-base">
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
      <CommandPalette />
    </>
  );
}
