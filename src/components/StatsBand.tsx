import CountUp from "./CountUp";
import { trackRecord } from "@/lib/site";

/** Compact proof strip right under the hero, using the same numbers as the Reviews section. */
export default function StatsBand() {
  return (
    <section aria-label="Track record" className="container-page pb-4">
      <dl className="grid grid-cols-2 gap-y-6 rounded-2xl border border-line bg-surface/60 px-6 py-6 sm:grid-cols-4 sm:divide-x sm:divide-line">
        {trackRecord.stats.map((s) => (
          <div key={s.label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
            <dd className="font-display text-3xl font-bold text-accent sm:text-4xl">
              <CountUp value={s.value} />
            </dd>
            <dt className="mt-1 text-xs text-muted sm:text-sm">{s.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
