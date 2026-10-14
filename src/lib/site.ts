/**
 * All site content lives here. Edit this file to change copy, links and projects.
 */

// Profile links come from env vars (see .env.example). Each process.env access must stay
// written out in full so Next.js can inline it into client components at build time.
// An empty value hides that link's buttons instead of leaving a dead link.
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
    "Freelance Discord specialist: community management, custom bots, server architecture and security consulting for ecommerce, trading, gaming, AI and Web3 brands.",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Bots", href: "#work" },
  { label: "Health check", href: "#health-check" },
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
}[] = [
  {
    id: "management",
    icon: "users",
    title: "Community Management",
    blurb:
      "Daily presence, moderation, events and reporting, so your team can focus on the business while the server stays healthy.",
    points: [
      "Day to day moderation and member support",
      "Engagement calendar, events and announcements",
      "Mod team onboarding and escalation process",
      "Regular reporting on what is working",
    ],
    span: "md:col-span-3",
  },
  {
    id: "buildout",
    icon: "layout",
    title: "Server Buildout",
    blurb:
      "A server designed around your goals, built from scratch or rebuilt, ready to launch with a clear member journey.",
    points: [
      "Channel architecture and role hierarchy",
      "Permission matrix that stays maintainable",
      "Welcome flow, verification and onboarding",
      "Branded embeds, rules and server guide",
    ],
    span: "md:col-span-3",
  },
  {
    id: "security",
    icon: "shield",
    title: "Moderation & Security",
    blurb:
      "Scams, spam and raids stopped before they reach members, with playbooks your staff can follow under pressure.",
    points: [
      "AutoMod, anti-raid and verification setup",
      "Logging and alert channels",
      "Incident response playbooks",
      "Member security guidance for scam-heavy niches",
    ],
    span: "md:col-span-3",
  },
  {
    id: "strategy",
    icon: "compass",
    title: "Strategy Consulting",
    blurb:
      "You already have people running the server and need the plan, an honest review, or training for your team.",
    points: [
      "Server and permissions audit",
      "Staff training and SOP documents",
      "Engagement and content playbook",
      "Async support between sessions",
    ],
    span: "md:col-span-3",
  },
];

export const botService = {
  title: "Custom Discord Bots",
  blurb:
    "Off-the-shelf bots rarely match how your server actually works. I build bots to your spec in Python (discord.py) or JavaScript (discord.js v14), hand them off with documentation, and can host them for you.",
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
    body: "Send a message or book a call. Share the server, the goal and what is not working. No Discord knowledge needed.",
  },
  {
    step: "02",
    title: "Get a straight read",
    body: "I review the server or the idea and tell you what to fix first, what it takes and how long it will realistically run.",
  },
  {
    step: "03",
    title: "Scope, then build",
    body: "We agree on scope, timeline and price in writing. I build, you review in short rounds, and nothing ships blind.",
  },
  {
    step: "04",
    title: "Hand off and support",
    body: "You get documentation and a walkthrough. Stay on for ongoing management or support, or run it yourself.",
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
    kind: "Product, DuoPlus",
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
    title: "Shadowban Bot",
    categories: ["AI-powered", "Security & access"],
    kind: "AI moderation",
    blurb:
      "Silently intercepts suspicious messages, classifies them with Claude Haiku and routes them to a private mod queue where staff approve, reject or release with one click.",
    tags: ["discord.js v14", "Claude Haiku", "Supabase"],
    href: "https://github.com/mdevvx/Liberty-Conciergerie-Security-Bot",
  },
  {
    title: "MANAVA Multiverse Bot",
    categories: ["Engagement"],
    kind: "Client project, gaming",
    blurb:
      "Esports squads with their own roles and channels, a unified XP economy across Discord and in-game events, seasonal leaderboards and creator application reviews.",
    tags: ["discord.py", "Webhooks", "Seasons & XP"],
    href: "https://github.com/mdevvx/MANAVA-Setup-Bot",
  },
  {
    title: "Luckmaxxing Protocol Bot",
    categories: ["Engagement"],
    kind: "Client project, training",
    blurb:
      "An 8-day guided program delivered in private threads: enrollment codes, button-driven dialogue, scheduled daily lessons, tracked video days and completion roles.",
    tags: ["discord.py", "Supabase", "Scheduling"],
    href: "https://github.com/mdevvx/Luckmaxxing-Protocol-Bot",
  },
  {
    title: "Membership Verification Bot",
    categories: ["Security & access"],
    kind: "Client project, subscriptions",
    blurb:
      "Members verify by email against GoHighLevel tags and get the matching role. A background check every 6 hours removes roles when a subscription lapses.",
    tags: ["discord.py", "GoHighLevel API", "Roles"],
    href: "https://github.com/mdevvx/Winners-Circle-Official-Bot",
  },
  {
    title: "Auth Handler Bot",
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
    kind: "Product, DuoPlus",
    blurb:
      "Creates a personal welcome thread or channel for every new member, with fully customizable welcome messages built on Discord's Components V2.",
    tags: ["discord.py", "Components V2", "Supabase"],
    href: "https://github.com/mdevvx/Threadly-Bot",
  },
  {
    title: "PulseReact",
    categories: ["Engagement", "Automation"],
    kind: "Product, DuoPlus",
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
    dates: "Feb 27 – Apr 5, 2023",
    featured: true,
    quote:
      "I just wanted to take a moment to express my gratitude for all the hard work and dedication you have put into moderating our Discord community. Your efforts have not gone unnoticed and have made a significant impact on our community's overall experience.\n\nI have been consistently impressed with your ability to keep the chat organized and friendly, while still allowing for open and constructive discussions. Your patience, professionalism, and positive attitude have been instrumental in creating a welcoming environment for everyone.\n\nYour swift and fair handling of rule violations and conflicts has been especially admirable. Your ability to diffuse tense situations and calmly address issues has helped to maintain the overall harmony of the community.\n\nThank you for your outstanding contributions to our community. Your time and effort have made a real difference, and we are lucky to have you as a moderator.",
    endorsements: ["Professional", "Solution Oriented", "Committed to Quality"],
  },
  {
    client: "Davide Scaramella",
    project: "Discord setup and security hardening",
    rating: 5,
    dates: "May 29 – Jun 26, 2026",
    quote:
      "Great experience working with Muhammad. Our Discord server had been built up over time by a few different admins, and it had gradually turned into a mess — a blowout of superseded bots, roles, and channels that nobody had cleaned up. Security was my biggest concern going in, but Muhammad sorted out the whole thing: knowledgeable, effective, and quick to respond throughout. He delivered exactly what we needed and I'd happily work with him again.",
    endorsements: ["Committed to Quality", "Solution Oriented", "Detail Oriented"],
  },
  {
    client: "Adam Wilcox",
    project: "Discord Server Creation",
    rating: 5,
    dates: "May 2 – May 24, 2026",
    quote: "Great guy! Super easy to work with and has a great ability to follow instructions. Will use again 100%!!",
    endorsements: ["Committed to Quality", "Solution Oriented", "Detail Oriented"],
  },
  {
    client: "HR",
    company: "Imagine Innovation",
    project: "Pajama Billionaire Community automation and management",
    rating: 5,
    dates: "Dec 10, 2025 – May 18, 2026",
    quote: "Nadeem was easy to work with, Very Efficient and he gets the work done!",
    endorsements: ["Solution Oriented", "Clear Communicator"],
  },
  {
    client: "HR",
    company: "Imagine Innovation",
    project: "Pajama Billionaire Community automation and management",
    rating: 5,
    dates: "Nov 14 – Dec 9, 2025",
    quote:
      "Muhammad was a delight to work with. He did an excellent job with our automations and we will not hesitate to hire him for similar projects in the nearest future. Thank you Muhammad!",
    endorsements: ["Collaborative", "Committed to Quality", "Solution Oriented"],
  },
  {
    client: "Lovro Jambrecina",
    project: "Discord Moderator",
    rating: 5,
    dates: "Feb 12 – Mar 11, 2026",
    quote: "Delivered everything fast, was reliable and understood everything\nWill re-hire when I need some more work done\nGreat job!!!",
    endorsements: ["Reliable", "Clear Communicator"],
  },
  {
    client: "Shaun Eng",
    project: "Discord Revamp",
    rating: 5,
    dates: "Feb 26 – May 8, 2026",
    quote: "Great experience with Discord and helped us revamp our server.",
    endorsements: ["Committed to Quality", "Solution Oriented", "Accountable for Outcomes"],
  },
  {
    client: "Nick Irvine",
    project: "Build and deploy a discord bot",
    rating: 5,
    dates: "Feb 22 – May 22, 2026",
    endorsements: ["Committed to Quality", "Solution Oriented", "Clear Communicator"],
  },
];

/** Freelance track record (from the marketplace profile). Update these numbers as they grow. */
export const trackRecord = {
  rating: 4.9,
  reviewCount: 40,
  badges: ["Top Rated", "100% Job Success"],
  stats: [
    { value: "4.9★", label: "Average from 40 reviews" },
    { value: "$30K+", label: "Earned from client work" },
    { value: "65", label: "Jobs completed" },
    { value: "2,669", label: "Hours delivered" },
  ],
};

export const faqs = [
  {
    q: "What is included in community management?",
    a: "Someone owns the server day to day: moderation, member support, events, announcements, mod team coordination and reporting. The exact scope depends on how active your server is, so I scope it on a call and put it in writing.",
  },
  {
    q: "Can you help us grow our member count?",
    a: "I focus on keeping and activating the members you already attract, with structure, onboarding, events and moderation that make people stay. Paid ads and outbound growth are best handled by your marketing team.",
  },
  {
    q: "We already have someone running the server. Can you just consult?",
    a: "Yes. Strategy Consulting is for that: I review what is built, tell you honestly what to change, write the playbook and train your team.",
  },
  {
    q: "We do not have a server yet. Where do we start?",
    a: "Server Buildout. I design channels, roles, permissions, onboarding and security, then you can run it yourself or keep me on for management.",
  },
  {
    q: "What can a custom bot do that off-the-shelf bots cannot?",
    a: "Anything specific to your workflow: AI ticket triage, role assignment from your CRM or payment platform, restock and deal alerts, custom moderation rules, staff tooling. I scope it, quote it, build it and document it.",
  },
  {
    q: "Which languages and tools do you use for bots?",
    a: "Python with discord.py or JavaScript with discord.js v14, usually with Supabase for data and Railway for hosting. I can work with your stack if you already have one.",
  },
  {
    q: "How do we pay and how is the work protected?",
    a: "I take client work through Upwork or directly through the DuoPlus agency. Scope, milestones and deliverables are agreed up front either way.",
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
    fix: "Audit role permissions, remove Administrator from everyone who does not need it and require 2FA for moderation.",
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
