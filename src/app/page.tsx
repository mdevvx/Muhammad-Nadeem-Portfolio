import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import HealthCheck from "@/components/HealthCheck";
import Reviews from "@/components/Reviews";
import ScrollEffects from "@/components/ScrollEffects";
import CommandPalette from "@/components/CommandPalette";
import Process from "@/components/Process";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { links, profile } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: profile.name,
  description: profile.description,
  areaServed: "Worldwide",
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  email: profile.email,
  sameAs: [links.github, links.upwork, links.linkedin].filter(Boolean),
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent-soft focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <Projects />
        <Reviews />
        <HealthCheck />
        <Process />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <ScrollEffects />
      <CommandPalette />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
