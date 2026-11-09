import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Products from "@/components/Products";
import Portfolio from "@/components/Portfolio";
import CaseStudy from "@/components/CaseStudy";
import StatsBand from "@/components/StatsBand";
import HealthCheck from "@/components/HealthCheck";
import Reviews from "@/components/Reviews";
import ClientMarquee from "@/components/ClientMarquee";
import Fit from "@/components/Fit";
import ScrollEffects from "@/components/ScrollEffects";
import CommandPalette from "@/components/CommandPalette";
import Process from "@/components/Process";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { botService, faqs, links, profile, seo, services, siteUrl } from "@/lib/site";

const sameAs = [links.upwork, links.linkedin, links.github, links.discord].filter(Boolean);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      jobTitle: "Discord Community Manager & Bot Developer",
      url: siteUrl,
      image: `${siteUrl}/avatar.jpg`,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
      sameAs,
      knowsAbout: [
        "Discord community management",
        "Discord server setup",
        "Discord moderation",
        "Discord bot development",
        "discord.py",
        "discord.js",
        "Community security",
        "Whop setup and access control",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: `${profile.name}, Discord Community Manager & Bot Developer`,
      description: seo.description,
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      email: profile.email,
      areaServed: "Worldwide",
      address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
      provider: { "@id": `${siteUrl}/#person` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Discord services",
        itemListElement: [
          ...services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.blurb },
            ...(s.price && {
              priceSpecification: {
                "@type": s.priceUnit === "/month" ? "UnitPriceSpecification" : "PriceSpecification",
                price: Number(s.price.replace(/[^0-9.]/g, "")),
                priceCurrency: "USD",
                ...(s.priceUnit === "/month" && { unitText: "MONTH" }),
              },
            }),
          })),
          { "@type": "Offer", itemOffered: { "@type": "Service", name: botService.title, description: botService.blurb } },
        ],
      },
      sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: profile.name,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
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
        <StatsBand />
        <ClientMarquee />
        <Services />
        <Products />
        <Projects />
        <Portfolio />
        <CaseStudy />
        <Reviews />
        <Fit />
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
