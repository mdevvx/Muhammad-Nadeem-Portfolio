import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import HealthCheckApp from "@/components/HealthCheckApp";
import { healthAreas, profile, siteUrl } from "@/lib/site";

const title = "Free Discord Server Health Check";
const description =
  "Score your Discord server in two minutes. Ten questions on security, structure, engagement and operations, with a prioritized fix list. Free, no email needed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/health-check" },
  openGraph: { title: `${title} | ${profile.name}`, description, url: "/health-check" },
  twitter: { title: `${title} | ${profile.name}`, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: title,
  description,
  url: `${siteUrl}/health-check`,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  author: { "@type": "Person", name: profile.name, url: siteUrl },
};

export default function HealthCheckPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden pb-20 pt-40 sm:pt-48">
        <div className="grid-bg pointer-events-none absolute inset-0 -z-10 print:hidden" aria-hidden="true" />
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center print:text-left">
            <p className="eyebrow">Free Discord server audit</p>
            <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
              How healthy is <span className="text-gradient">your server?</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Ten quick questions, about two minutes. You&apos;ll get a score, a breakdown by area and a fix list in the order I&apos;d
              tackle it. No email needed.
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2 print:hidden">
              {healthAreas.map((a) => (
                <li key={a.area} className="chip">
                  {a.area}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <HealthCheckApp />
          </div>
        </div>
      </main>
      <Footer />
      <CommandPalette />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
