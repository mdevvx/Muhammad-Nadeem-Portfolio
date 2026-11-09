import { profile, siteUrl } from "./site";

export type LegalSection = { heading: string; paragraphs?: string[]; list?: string[] };
export type LegalDoc = { slug: string; title: string; description: string; intro: string; sections: LegalSection[] };

/** Update this whenever any policy text below changes. */
export const legalUpdated = "November 9, 2026";

const site = siteUrl.replace(/^https?:\/\//, "");

const contactSection: LegalSection = {
  heading: "Contact",
  paragraphs: [`Questions about this page? Email ${profile.email}.`],
};

export const legalDocs: Record<"privacy" | "terms" | "cookies" | "disclaimer", LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    description: `How ${profile.name} collects, uses and protects personal information on ${site}.`,
    intro: `This policy explains what information ${site} collects, why, and what your choices are. ${profile.name} ("I", "me") runs this site from ${profile.location}.`,
    sections: [
      {
        heading: "Information I collect",
        paragraphs: ["I only collect what you choose to send me or what is needed to run the site."],
        list: [
          "Contact form: your name, email address, Discord handle (optional), the service you are interested in and your message.",
          "Health check: your answers stay in your own browser. They are only sent to me if you choose to submit them through the contact form.",
          "Technical data: standard server logs such as IP address, browser type and pages requested, kept by the hosting provider for security and reliability.",
          "Analytics (only if you accept it in the cookie banner): anonymous usage data such as pages viewed and approximate location.",
        ],
      },
      {
        heading: "How I use it",
        list: [
          "To reply to your enquiry and scope work you ask about.",
          "To run, secure and improve the website.",
          "To understand which pages are useful, but only with your consent for analytics.",
        ],
        paragraphs: ["I do not sell your personal information and I do not use it for automated decision making."],
      },
      {
        heading: "Where your data goes",
        paragraphs: [
          "Contact form submissions are delivered to a private Discord channel that only I can access, and to my email where relevant. Service providers I rely on, such as the website host, Discord and (if enabled) Google Analytics, process data on my behalf under their own terms and privacy policies.",
        ],
      },
      {
        heading: "How long I keep it",
        paragraphs: [
          "Enquiries are kept for as long as needed to reply and for a reasonable period afterwards in case you come back. If we work together, project records are kept for the length of the engagement and any legal or accounting need. You can ask me to delete your data at any time.",
        ],
      },
      {
        heading: "Your rights",
        paragraphs: [
          `Depending on where you live (for example under the GDPR or UK GDPR), you may have the right to access, correct, delete or export your personal data, to object to or restrict processing, and to withdraw consent at any time. Email ${profile.email} and I will respond within 30 days. You can also complain to your local data protection authority.`,
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "I use HTTPS and limit access to the places where enquiries are stored. No system is perfectly secure, so please do not send passwords, tokens or other secrets through the contact form.",
        ],
      },
      {
        heading: "Children",
        paragraphs: ["This site is for businesses and adults. It is not directed at anyone under 16."],
      },
      {
        heading: "Changes",
        paragraphs: [`I may update this policy. The date at the top shows when it last changed.`],
      },
      contactSection,
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms of Service",
    description: `The terms for using ${site} and for services provided by ${profile.name}.`,
    intro: `By using ${site} you agree to these terms. Paid work is always agreed in writing before it starts, and that agreement takes priority over anything below if the two conflict.`,
    sections: [
      {
        heading: "Using this website",
        list: [
          "The site is provided for information about my services and products.",
          "Do not misuse it: no scraping at scale, attempts to break or probe it, or sending spam or abusive content through the contact form.",
          "Content on the site, including text, design and code samples, belongs to me or is used with permission. You may not copy it for commercial use without asking.",
        ],
      },
      {
        heading: "Services",
        paragraphs: [
          "Community management, server buildouts, moderation and security, consulting and custom bots are scoped on a call and confirmed in writing, including deliverables, timeline and price. Prices shown on the site are starting points or typical ranges, not a binding quote.",
          "Nothing goes live in your server without your approval. You are responsible for giving me the access and information I need and for keeping your own accounts secure.",
        ],
      },
      {
        heading: "Payment",
        paragraphs: [
          "Payment terms are set in each written agreement. Work may be paused if an invoice is overdue. Where we work through a marketplace such as Upwork, that platform's terms also apply.",
        ],
      },
      {
        heading: "Products (DiscoNotify, Discobi and others)",
        paragraphs: [
          "My own bots and dashboards are provided under the terms and pricing shown on their own websites. Free tiers may change, and paid plans renew or end as described at checkout.",
        ],
      },
      {
        heading: "Third party platforms",
        paragraphs: [
          "My work depends on platforms I do not control, including Discord, YouTube, Twitch, Kick and others. Changes to their rules, APIs or availability can affect a bot or integration, and I cannot guarantee uninterrupted service.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Unless the written agreement says otherwise, custom work built for you is yours once it is paid for, apart from my reusable tools, libraries and general know-how, which I keep the right to use again.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the extent allowed by law, I am not liable for indirect or consequential loss, including lost revenue, lost members or lost data. My total liability for any claim is limited to the amount you paid me for the work in question.",
        ],
      },
      {
        heading: "Changes and disputes",
        paragraphs: [
          "I may update these terms from time to time. For paid work, the written agreement states which law applies and how disputes are handled. Where it is silent, we will try to resolve any issue directly and in good faith first, and any consumer rights that cannot be waived under the law where you live still apply to you.",
        ],
      },
      contactSection,
    ],
  },

  cookies: {
    slug: "cookies",
    title: "Cookie Policy",
    description: `Which cookies and similar storage ${site} uses, and how to control them.`,
    intro: `This page explains what cookies and browser storage ${site} uses. You can change your choice at any time with "Cookie Preferences" in the footer.`,
    sections: [
      {
        heading: "What are cookies",
        paragraphs: [
          "Cookies are small files a website stores in your browser. Similar technologies, such as local storage, do the same job. Some are needed for the site to work and others measure how it is used.",
        ],
      },
      {
        heading: "Strictly necessary storage",
        paragraphs: ["These keep the site working and remember your choices. They do not need consent and cannot be switched off."],
        list: [
          "theme: remembers whether you picked light or dark mode (local storage).",
          "cookie-consent: remembers your cookie choice so the banner does not keep appearing (local storage).",
          "health-check-progress: keeps your answers if you leave the health check halfway (local storage, stays on your device).",
        ],
      },
      {
        heading: "Analytics cookies (optional)",
        paragraphs: [
          "If analytics is turned on for this site and you accept it, a privacy-respecting analytics tool such as Google Analytics may set cookies that count visits and show which pages are useful. Nothing is loaded or stored until you accept, and you can withdraw consent at any time.",
        ],
      },
      {
        heading: "Marketing cookies",
        paragraphs: ["This site does not use advertising or cross-site tracking cookies."],
      },
      {
        heading: "How to control cookies",
        list: [
          'Use "Cookie Preferences" in the footer to accept or reject optional cookies.',
          "Clear or block cookies in your browser settings. Blocking necessary storage may reset your theme and saved progress.",
        ],
      },
      contactSection,
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    description: `Important limits on the information and results described on ${site}.`,
    intro: `The information on ${site} is for general purposes. Please read the points below before relying on it.`,
    sections: [
      {
        heading: "No guarantee of results",
        paragraphs: [
          "Case studies, reviews, ratings and numbers on this site describe past work. Community growth, engagement and security depend on many factors outside my control, so results are not guaranteed and your outcome may differ.",
        ],
      },
      {
        heading: "Not affiliated with Discord",
        paragraphs: [
          "I am not affiliated with, endorsed by or sponsored by Discord Inc. or any other platform I mention. All trademarks and brand names belong to their owners. Client names are shown to describe work I have done and do not imply endorsement.",
        ],
      },
      {
        heading: "Not professional advice",
        paragraphs: [
          "Content here, including the free server health check, is general guidance. It is not legal, financial or security advice. For decisions with legal or financial impact, talk to a qualified professional.",
        ],
      },
      {
        heading: "Accuracy and links",
        paragraphs: [
          "I try to keep the site accurate and current, but prices, features and availability can change. External links go to sites I do not control and I am not responsible for their content.",
        ],
      },
      {
        heading: "Reviews",
        paragraphs: ["Reviews and ratings are taken from my Upwork profile and shown as the clients wrote them."],
      },
      contactSection,
    ],
  },
};
