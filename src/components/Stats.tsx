import { stats } from "@/lib/site";

export default function Stats() {
  return (
    <section aria-label="At a glance" className="pb-8">
      <div data-reveal className="container-page">
        <dl className="card grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-6 ${i < 2 ? "border-b border-line lg:border-b-0" : ""} ${i % 2 === 0 ? "border-r border-line lg:border-r-0" : ""}`}
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="text-3xl font-bold tracking-tight text-gradient sm:text-4xl">{s.value}</span>
                <span className="mt-1.5 block text-sm leading-snug text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
