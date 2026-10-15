/**
 * All site content lives here. Edit this file to change copy, links and projects.
 */

// Profile links come from env vars (see .env.example). Each process.env access must stay
// written out in full so Next.js can inline it into client components at build time.
// An empty value hides that link's buttons instead of leaving a dead link.
/** Public site URL. Falls back to the live domain so canonical links and the sitemap never point at localhost. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://mnadeem.duoplus.org").replace(/\/$/, "");

/** Search snippet: aim for ~150-160 characters with the main search terms up front. */
export const seo = {
  title: "Discord Community Manager & Bot Developer | Muhammad Nadeem",
  description:
    "Top Rated Discord community manager and bot developer. Server setup, moderation, security and custom discord.py and discord.js bots for growing brands.",
  keywords: [
    "Discord community manager",
    "hire Discord community manager",
    "Discord bot developer",
    "custom Discord bot",
    "Discord server setup",
    "Discord server builder",
    "Discord moderation service",
    "Discord security",
    "discord.py developer",
    "discord.js developer",
    "Discord consultant",
  ],
};

/* ------------------------------------------------------------------ */
/* Numbers shown on the site, set from env vars (see .env.example).     */
/* Each process.env access is written out in full so Next.js can inline */
/* it into client components. Unset vars fall back to the defaults.     */
/* ------------------------------------------------------------------ */

const num = (raw: string | undefined, fallback: number) => {
  const n = Number(raw?.replace(/[^0-9.]/g, ""));
  return raw && raw.trim() !== "" && Number.isFinite(n) ? n : fallback;
};

/** Unset: default price. Set but empty: no price, the card shows "Custom pricing". */
const priceOf = (raw: string | undefined, fallback: number) => {
  if (raw === undefined) return fallback;
  return raw.trim() === "" ? undefined : num(raw, fallback);
};

export const stats = {
  botsBuilt: num(process.env.NEXT_PUBLIC_STAT_BOTS_BUILT, 30),
  yearsExperience: num(process.env.NEXT_PUBLIC_STAT_YEARS_EXPERIENCE, 5),
  jobsCompleted: num(process.env.NEXT_PUBLIC_STAT_JOBS_COMPLETED, 65),
  hoursDelivered: num(process.env.NEXT_PUBLIC_STAT_HOURS_DELIVERED, 2669),
  totalEarnings: num(process.env.NEXT_PUBLIC_STAT_TOTAL_EARNINGS, 30000),
  totalReviews: num(process.env.NEXT_PUBLIC_STAT_TOTAL_REVIEWS, 40),
  avgRating: num(process.env.NEXT_PUBLIC_STAT_AVG_RATING, 4.9),
};

const prices = {
  management: priceOf(process.env.NEXT_PUBLIC_PRICE_COMMUNITY_MANAGEMENT, 1500),
  buildout: priceOf(process.env.NEXT_PUBLIC_PRICE_SERVER_BUILDOUT, 350),
  security: priceOf(process.env.NEXT_PUBLIC_PRICE_MODERATION_SECURITY, 1000),
  strategy: priceOf(process.env.NEXT_PUBLIC_PRICE_STRATEGY_CONSULTING, 800),
};

/** $1,500 */
export const formatPrice = (n: number) => `$${n.toLocaleString("en-US")}`;
/** $30K+ for thousands, $1.2M+ for millions */
export const formatEarnings = (n: number) =>
  n >= 1_000_000 ? `$${+(n / 1_000_000).toFixed(1)}M+` : n >= 1_000 ? `$${Math.floor(n / 1_000)}K+` : `$${n}+`;
/** 2,669 */
export const formatCount = (n: number) => n.toLocaleString("en-US");
/** 4.9 */
export const formatRating = (n: number) => n.toFixed(1);

export const links = {
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/mdevvx",
  upwork: process.env.NEXT_PUBLIC_UPWORK_URL || "https://www.upwork.com/freelancers/mdevvx",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  discord: process.env.NEXT_PUBLIC_DISCORD_URL || "",
  booking: process.env.NEXT_PUBLIC_BOOKING_URL || "",
};

export const profile = {
  name: "Muhammad Nadeem",
  initials: "MN",
  role: "Discord Specialist & Bot Developer",
  location: "Lahore, Pakistan",
  timezone: "UTC+5",
  email: "muhammadnadeem.1596@gmail.com",
  siteName: "Muhammad Nadeem",
  description:
    "Discord community manager and bot developer. I run, build and secure Discord servers for ecommerce, trading, gaming, AI and Web3 brands, and write custom bots that fit how your community works.",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Bots", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
] as const;

export type IconKey = "users" | "layout" | "shield" | "compass" | "bot";

export const services: {
  id: string;
  icon: IconKey;
  title: string;
  blurb: string;
  points: string[];
  span: string;
  /** e.g. "$500". Leave unset to show "Custom pricing". */
  price?: string;
  /** e.g. "one-time", "/month" */
  priceUnit?: string;
  /** Small line under the price, e.g. "Most clients land around $X" */
  priceNote?: string;
}[] = [
  {
    id: "management",
    icon: "users",
    title: "Community Management",
    blurb:
      "I'm in your server every day handling moderation, events and member questions, so your team can get back to running the business.",
    points: [
      "Day to day moderation and member support",
      "Engagement calendar, events and announcements",
      "Mod team onboarding and escalation process",
      "Regular reports on what's working and what isn't",
    ],
    span: "md:col-span-3",
    price: prices.management !== undefined ? formatPrice(prices.management) : undefined,
    priceUnit: "/month",
    priceNote: "Billed monthly"
  },
  {
    id: "buildout",
    icon: "layout",
    title: "Server Buildout",
    blurb:
      "A server planned around your goals, built from scratch or rebuilt, so new members know exactly where to go.",
    points: [
      "Channel architecture and role hierarchy",
      "Permissions that stay easy to manage",
      "Welcome flow, verification and onboarding",
      "Branded embeds, rules and server guide",
    ],
    span: "md:col-span-3",
    price: prices.buildout !== undefined ? formatPrice(prices.buildout) : undefined,
    priceUnit: "one-time",
    priceNote: "One-time project"
  },
  {
    id: "security",
    icon: "shield",
    title: "Moderation & Security",
    blurb:
      "Scams, spam and raids get stopped before your members ever see them, and your mods get a clear plan for when things go wrong.",
    points: [
      "AutoMod, anti-raid and verification setup",
      "Logging and alert channels",
      "Incident response playbooks",
      "Member security guidance for scam-heavy niches",
    ],
    span: "md:col-span-3",
    price: prices.security !== undefined ? formatPrice(prices.security) : undefined,
    priceUnit: "/month",
    priceNote: "Billed monthly"
  },
  {
    id: "strategy",
    icon: "compass",
    title: "Strategy Consulting",
    blurb:
      "Your team already runs the server. You want a second pair of eyes, a clear plan, or training for your mods.",
    points: [
      "Server and permissions audit",
      "Staff training and SOP documents",
      "Engagement and content playbook",
      "Async support between sessions",
    ],
    span: "md:col-span-3",
    price: prices.strategy !== undefined ? formatPrice(prices.strategy) : undefined,
    priceUnit: "/month",
    priceNote: "Billed monthly"
  },
];

export const botService: {
  title: string;
  blurb: string;
  tags: string[];
  price?: string;
  priceUnit?: string;
  priceNote?: string;
} = {
  title: "Custom Discord Bots",
  blurb:
    "Off-the-shelf bots rarely fit how your server actually works. I build bots around your exact workflow in Python (discord.py) or JavaScript (discord.js v14), document everything, and can host them for you too.",
  tags: [
    "Role automation",
    "Ticket systems",
    "Welcome flows",
    "Moderation tools",
    "Alerts and monitors",
    "AI classification",
    "CRM and webhook integrations",
    "Slash commands",
  ],
};

export const processSteps = [
  {
    step: "01",
    title: "Tell me what you need",
    body: "Send a message or book a call. Tell me about the server, what you want from it and what isn't working. You don't need to know Discord.",
  },
  {
    step: "02",
    title: "Get an honest review",
    body: "I look at your server or idea and tell you what to fix first, what it'll take and how long it'll realistically run.",
  },
  {
    step: "03",
    title: "Scope, then build",
    body: "We agree on scope, timeline and price in writing. I build, you review as we go, and nothing goes live without your OK.",
  },
  {
    step: "04",
    title: "Hand off and support",
    body: "You get documentation and a walkthrough. Keep me on for management and support, or run it yourself.",
  },
] as const;

export const projectCategories = ["AI-powered", "Security & access", "Engagement", "Automation"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export const projects: {
  title: string;
  kind: string;
  blurb: string;
  tags: string[];
  categories: ProjectCategory[];
  href: string;
}[] = [
  {
    title: "PulseNotify",
    categories: ["Automation"],
    kind: "Own product",
    blurb:
      "Multi-server bot that posts an alert the moment a creator uploads, posts or goes live on YouTube, Kick or Instagram, with per-event toggles, custom messages and role mentions.",
    tags: ["discord.py", "Supabase", "Official APIs"],
    href: "https://github.com/mdevvx/PulseNotify-Bot",
  },
  {
    title: "SupportPilot",
    categories: ["AI-powered", "Automation"],
    kind: "AI ticket triage",
    blurb:
      "Ticket panel opens a private thread per request, then a Claude-backed triage layer searches the knowledge base and answers, asks a follow-up or escalates to staff with a confidence tag.",
    tags: ["discord.py", "Claude API", "pgvector"],
    href: "https://github.com/mdevvx/Support-Pilot",
  },
  {
    title: "Shadowban",
    categories: ["AI-powered", "Security & access"],
    kind: "AI moderation",
    blurb:
      "Silently intercepts suspicious messages, classifies them with Claude Haiku and routes them to a private mod queue where staff approve, reject or release with one click.",
    tags: ["discord.js v14", "Claude Haiku", "Supabase"],
    href: "https://github.com/mdevvx/Liberty-Conciergerie-Security-Bot",
  },
  {
    title: "MANAVA Multiverse",
    categories: ["Engagement"],
    kind: "Client project, gaming",
    blurb:
      "Esports squads with their own roles and channels, a unified XP economy across Discord and in-game events, seasonal leaderboards and creator application reviews.",
    tags: ["discord.py", "Webhooks", "Seasons & XP"],
    href: "https://github.com/mdevvx/MANAVA-Setup-Bot",
  },
  {
    title: "Luckmaxxing Protocol",
    categories: ["Engagement"],
    kind: "Client project, training",
    blurb:
      "An 8-day guided program delivered in private threads: enrollment codes, button-driven dialogue, scheduled daily lessons, tracked video days and completion roles.",
    tags: ["discord.py", "Supabase", "Scheduling"],
    href: "https://github.com/mdevvx/Luckmaxxing-Protocol-Bot",
  },
  {
    title: "Membership Verification",
    categories: ["Security & access"],
    kind: "Client project, subscriptions",
    blurb:
      "Members verify by email against GoHighLevel tags and get the matching role. A background check every 6 hours removes roles when a subscription lapses.",
    tags: ["discord.py", "GoHighLevel API", "Roles"],
    href: "https://github.com/mdevvx/Winners-Circle-Official-Bot",
  },
  {
    title: "Auth Handler",
    categories: ["Security & access"],
    kind: "Access control",
    blurb:
      "Login and logout portals with email and password, role assignment on login, in-Discord user management for admins and full audit logging.",
    tags: ["discord.py", "Supabase", "Auth"],
    href: "https://github.com/mdevvx/Auth-Handler-Discord-Bot",
  },
  {
    title: "Threadly",
    categories: ["Engagement", "Automation"],
    kind: "Own product",
    blurb:
      "Creates a personal welcome thread or channel for every new member, with fully customizable welcome messages built on Discord's Components V2.",
    tags: ["discord.py", "Components V2", "Supabase"],
    href: "https://github.com/mdevvx/Threadly-Bot",
  },
  {
    title: "PulseReact",
    categories: ["Engagement", "Automation"],
    kind: "Own product",
    blurb:
      "Per-server auto-react system: any number of channels and emojis, filtered by message type such as text, image, link, video or file.",
    tags: ["discord.py", "Supabase", "Automation"],
    href: "https://github.com/mdevvx/PulseReact-Bot",
  },
];

export const stack: { group: string; items: string[] }[] = [
  {
    group: "Discord",
    items: ["discord.py", "discord.js v14", "Components V2", "Slash commands", "Webhooks"],
  },
  {
    group: "Web",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node / Express"],
  },
  {
    group: "Data & hosting",
    items: ["Supabase", "PostgreSQL", "MongoDB", "MySQL", "Railway", "Docker"],
  },
  {
    group: "Automation & AI",
    items: ["Claude API", "Apify", "Google Apps Script", "GoHighLevel", "Cloudflare Workers"],
  },
];

export const niches = ["Ecommerce", "Trading", "Gaming", "AI", "Web3"];

/** Client reviews, quoted verbatim. Do not edit quotes. */
export type Review = {
  client: string;
  company?: string;
  project: string;
  rating: number;
  dates: string;
  quote?: string; // some reviews are a rating only; those are left out of the carousel
  endorsements: string[];
  featured?: boolean;
};

export const reviews: Review[] = [
  {
    client: "Daniel Jeong",
    company: "BlueWillow AI",
    project: "Discord Moderation Help",
    rating: 5,
    dates: "Feb 27 to Apr 5, 2023",
    featured: true,
    quote:
      "I just wanted to take a moment to express my gratitude for all the hard work and dedication you have put into moderating our Discord community. Your efforts have not gone unnoticed and have made a significant impact on our community's overall experience.\n\nI have been consistently impressed with your ability to keep the chat organized and friendly, while still allowing for open and constructive discussions. Your patience, professionalism, and positive attitude have been instrumental in creating a welcoming environment for everyone.\n\nYour swift and fair handling of rule violations and conflicts has been especially admirable. Your ability to diffuse tense situations and calmly address issues has helped to maintain the overall harmony of the community.\n\nThank you for your outstanding contributions to our community. Your time and effort have made a real difference, and we are lucky to have you as a moderator.",
    endorsements: ["Professional", "Solution Oriented", "Committed to Quality"],
  },
  {
    client: "Davide Scaramella",
    project: "Discord setup and security hardening",
    rating: 5,
    dates: "May 29 to Jun 26, 2026",
    quote:
      "Great experience working with Muhammad. Our Discord server had been built up over time by a few different admins, and it had gradually turned into a mess, a blowout of superseded bots, roles, and channels that nobody had cleaned up. Security was my biggest concern going in, but Muhammad sorted out the whole thing: knowledgeable, effective, and quick to respond throughout. He delivered exactly what we needed and I'd happily work with him again.",
    endorsements: ["Committed to Quality", "Solution Oriented", "Detail Oriented"],
  },
  {
    client: "Adam Wilcox",
    project: "Discord Server Creation",
    rating: 5,
    dates: "May 2 to May 24, 2026",
    quote: "Great guy! Super easy to work with and has a great ability to follow instructions. Will use again 100%!!",
    endorsements: ["Committed to Quality", "Solution Oriented", "Detail Oriented"],
  },
  {
    client: "HR",
    company: "Imagine Innovation",
    project: "Pajama Billionaire Community automation and management",
    rating: 5,
    dates: "Dec 10, 2025 to May 18, 2026",
    quote: "Nadeem was easy to work with, Very Efficient and he gets the work done!",
    endorsements: ["Solution Oriented", "Clear Communicator"],
  },
  {
    client: "HR",
    company: "Imagine Innovation",
    project: "Pajama Billionaire Community automation and management",
    rating: 5,
    dates: "Nov 14 to Dec 9, 2025",
    quote:
      "Muhammad was a delight to work with. He did an excellent job with our automations and we will not hesitate to hire him for similar projects in the nearest future. Thank you Muhammad!",
    endorsements: ["Collaborative", "Committed to Quality", "Solution Oriented"],
  },
  {
    client: "Lovro Jambrecina",
    project: "Discord Moderator",
    rating: 5,
    dates: "Feb 12 to Mar 11, 2026",
    quote: "Delivered everything fast, was reliable and understood everything\nWill re-hire when I need some more work done\nGreat job!!!",
    endorsements: ["Reliable", "Clear Communicator"],
  },
  {
    client: "Shaun Eng",
    project: "Discord Revamp",
    rating: 5,
    dates: "Feb 26 to May 8, 2026",
    quote: "Great experience with Discord and helped us revamp our server.",
    endorsements: ["Committed to Quality", "Solution Oriented", "Accountable for Outcomes"],
  },
  {
    client: "Nick Irvine",
    project: "Build and deploy a discord bot",
    rating: 5,
    dates: "Feb 22 to May 22, 2026",
    endorsements: ["Committed to Quality", "Solution Oriented", "Clear Communicator"],
  },
];

/** Freelance track record (from the marketplace profile). Update these numbers as they grow. */
export const trackRecord = {
  rating: stats.avgRating,
  reviewCount: stats.totalReviews,
  badges: ["Top Rated", "100% Job Success"],
  stats: [
    { value: `${formatRating(stats.avgRating)}★`, label: `Average from ${formatCount(stats.totalReviews)} reviews` },
    { value: formatEarnings(stats.totalEarnings), label: "Earned from client work" },
    { value: formatCount(stats.jobsCompleted), label: "Jobs completed" },
    { value: formatCount(stats.hoursDelivered), label: "Hours delivered" },
  ],
};

/** Brands I've worked with, shown in the scrolling strip under the hero. */
export const clients = [
  "BlueWillow AI",
  "Pajama Billionaire",
  "MANAVA Multiverse",
  "Vector Games",
  "Liberty Conciergerie",
  "RunItUp",
  "Luckmaxxing",
  "Winners Circle",
];

/** "Who this is for" section. */
export const fit = {
  good: [
    { title: "Discord is part of your brand", body: "Not a side project. It's where customers decide whether to stick around." },
    { title: "You want members who stay", body: "Retention and real activity, not a spike that fades in 30 days." },
    { title: "You want honest feedback", body: "If something was built wrong, you'd rather hear it and fix it." },
    { title: "You'd rather do it right once", body: "Proper systems and documentation, not patching the same problems every month." },
  ],
  notFit: [
    "You want fake members or growth-hack promises",
    "You're looking for the cheapest option out there",
    "You want someone who'll agree with everything",
  ],
};

export const faqs = [
  {
    q: "What is included in community management?",
    a: "I take care of the server day to day. That covers moderation, member support, events, announcements, keeping the mod team in sync and regular reports. How much work that is depends on how busy your server is, so we figure out the scope on a call and I put it in writing.",
  },
  {
    q: "Can you help us grow our member count?",
    a: "Not directly. My job is keeping the members you already bring in, with a clear structure, good onboarding, regular events and solid moderation. Paid ads and outreach are better handled by your marketing team.",
  },
  {
    q: "We already have someone running the server. Can you just consult?",
    a: "Yes, that's what Strategy Consulting is for. I go through what you've built, tell you honestly what I'd change, write it all down and train your team on it.",
  },
  {
    q: "We don't have a server yet. Where do we start?",
    a: "Start with a Server Buildout. I set up the channels, roles, permissions, onboarding and security. After that you can run it yourself or keep me on to manage it.",
  },
  {
    q: "What can a custom bot do that off-the-shelf bots can't?",
    a: "Pretty much anything specific to how you work. Think AI ticket triage, roles that sync with your CRM or payment platform, restock and deal alerts, custom moderation rules or tools for your staff. I scope it, quote it, build it and document it.",
  },
  {
    q: "Which languages and tools do you use for bots?",
    a: "Python with discord.py or JavaScript with discord.js v14, usually with Supabase for the database and Railway for hosting. If you already have a stack, I'm happy to work with it.",
  },
  {
    q: "How do we pay and how is the work protected?",
    a: "You work with me directly. Before I start, we agree in writing on the scope, milestones and exactly what you're getting, so there are no surprises on either side.",
  },
] as const;

export const contactServices = [
  "Community management",
  "Server buildout",
  "Moderation & security",
  "Strategy consulting",
  "Custom bot",
  "Something else",
] as const;

/**
 * Server Health Check: a self-assessment, not a real audit.
 * Each "no" or "partly" answer surfaces its fix; the weakest area picks the suggested service.
 */
export type HealthArea = "Security" | "Structure" | "Engagement" | "Operations";

export const healthAreas: { area: HealthArea; service: (typeof contactServices)[number] }[] = [
  { area: "Security", service: "Moderation & security" },
  { area: "Structure", service: "Server buildout" },
  { area: "Engagement", service: "Community management" },
  { area: "Operations", service: "Custom bot" },
];

export const healthQuestions: { area: HealthArea; q: string; fix: string }[] = [
  {
    area: "Security",
    q: "New members pass a verification step before they can see the server.",
    fix: "Add a verification gate (button, captcha or email check) so raid accounts and spam bots never reach your channels.",
  },
  {
    area: "Security",
    q: "AutoMod and anti-raid rules are active and catch scam links.",
    fix: "Turn on AutoMod keyword and link filters plus raid detection, and log every action to a private mod channel.",
  },
  {
    area: "Security",
    q: "Only people who need admin or ban permissions have them, and mods use 2FA.",
    fix: "Audit role permissions, remove Administrator from anyone who doesn't need it and require 2FA for moderation.",
  },
  {
    area: "Structure",
    q: "A new member knows where to start within 30 seconds of joining.",
    fix: "Build an onboarding flow: a single start-here channel, Discord onboarding questions and a short server guide.",
  },
  {
    area: "Structure",
    q: "Channels are grouped clearly and a new member sees fewer than 25 of them.",
    fix: "Consolidate channels into clear categories and hide niche channels behind opt-in roles.",
  },
  {
    area: "Engagement",
    q: "You run at least one event, prompt or announcement every week.",
    fix: "Set a weekly engagement calendar: one event, one discussion prompt and one update members can expect.",
  },
  {
    area: "Engagement",
    q: "More than 1 in 10 members post something in a typical week.",
    fix: "Give members low-effort ways to talk (wins, intros, polls) and reward activity with roles or XP.",
  },
  {
    area: "Operations",
    q: "Support requests go through tickets instead of staff DMs.",
    fix: "Move support into a ticket system so nothing gets lost and every request has an owner.",
  },
  {
    area: "Operations",
    q: "Your mods follow written rules for incidents, bans and appeals.",
    fix: "Write a short mod playbook covering warnings, bans, scams and appeals, and train the team on it.",
  },
  {
    area: "Operations",
    q: "Repetitive work like roles after payment or social alerts is automated.",
    fix: "Automate the repetitive work with a custom bot: payment-to-role sync, alerts, reminders and logging.",
  },
];
