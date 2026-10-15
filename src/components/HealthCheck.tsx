import Link from "next/link";
import { ArrowRight, Clock, MailX, Stethoscope } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { healthAreas, type HealthArea } from "@/lib/site";

const areaBlurb: Record<HealthArea, string> = {
  Security: "verification, AutoMod and permissions",
  Structure: "onboarding and channel layout",
  Engagement: "events and how many members actually talk",
  Operations: "tickets, mod playbooks and automation",
};

/** Home page teaser for the full check at /health-check. */
export default function HealthCheck() {
  return (
    <section id="health-check" className="py-16 sm:py-20">
      <div data-reveal className="container-page">
        <div className="card relative overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Free Discord server audit"
                title={
                  <>
                    How healthy is <span className="text-gradient">your server?</span>
                  </>
                }
                description="Answer ten quick questions and get an instant score, a breakdown by area and a fix list in the order I'd tackle it."
              />
              <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm text-muted sm:grid-cols-2">
                {healthAreas.map((a) => (
                  <li key={a.area} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-pop" />
                    <span>
                      <span className="font-medium text-fg">{a.area}</span>, {areaBlurb[a.area]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-line bg-bg/50 p-6 text-center sm:p-8">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft/15 text-accent">
                <Stethoscope size={26} />
              </span>
              <p className="mt-4 font-display text-xl font-bold">Free server health check</p>
              <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted">
                <li className="inline-flex items-center gap-1.5">
                  <Clock size={13} /> About 2 minutes
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <MailX size={13} /> No email needed
                </li>
              </ul>
              <Link href="/health-check" className="btn-primary mt-6 w-full py-3.5">
                Start the free check <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
