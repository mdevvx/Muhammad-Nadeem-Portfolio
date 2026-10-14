import { NextResponse } from "next/server";
import { contactServices, profile } from "@/lib/site";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  handle?: unknown;
  message?: unknown;
  source?: unknown;
  company?: unknown; // honeypot, real users leave this empty
};

const SOURCES = ["Contact form", "Health Check"] as const;

const SERVICE_EMOJI: Record<string, string> = {
  "Community management": "👥",
  "Server buildout": "🏗️",
  "Moderation & security": "🛡️",
  "Strategy consulting": "🧭",
  "Custom bot": "🤖",
  "Something else": "✨",
};

/** Escape Discord markdown so a lead's own text can't restyle or break the message. */
const md = (s: string) => s.replace(/([\*_`~|>#\[\]()-])/g, "\$1");

// Discord Components V2: https://discord.com/developers/docs/components/reference
const IS_COMPONENTS_V2 = 1 << 15;
const C = { actionRow: 1, button: 2, textDisplay: 10, separator: 14, container: 17 } as const;
const LINK_BUTTON = 5;

type Lead = { name: string; email: string; handle: string; service: string; message: string; source: string };

/** wa.me link when the handle looks like a phone number, otherwise null (Discord usernames have no public link). */
function whatsappUrl(handle: string) {
  if (!/^\+?[\d\s().-]{7,}$/.test(handle)) return null;
  const digits = handle.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 ? `https://wa.me/${digits}` : null;
}

function leadMessage(lead: Lead) {
  const fromHealthCheck = lead.source === "Health Check";
  const quoted = lead.message
    .split("\n")
    .map((l) => `> ${md(l) || "\u200b"}`)
    .join("\n")
    .slice(0, 3000);
  const details = [
    `📧 **Email** · \`${lead.email}\``,
    lead.handle ? `💬 **Discord / WhatsApp** · \`${lead.handle.replace(/`/g, "")}\`` : null,
    `${SERVICE_EMOJI[lead.service] ?? "🧩"} **Service** · ${lead.service || "Not specified"}`,
    `${fromHealthCheck ? "🩺" : "📝"} **Source** · ${lead.source}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Webhooks may only use non-interactive components, so replies are link buttons.
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(lead.email)}&su=${encodeURIComponent(
    `Re: your ${lead.service ? lead.service.toLowerCase() : "Discord"} project`,
  )}`;
  const wa = lead.handle ? whatsappUrl(lead.handle) : null;
  const buttons = [
    { type: C.button, style: LINK_BUTTON, label: "Reply in Gmail", emoji: { name: "✉️" }, url: gmail },
    ...(wa ? [{ type: C.button, style: LINK_BUTTON, label: "Open WhatsApp", emoji: { name: "💬" }, url: wa }] : []),
  ];

  const now = Math.floor(Date.now() / 1000);
  return {
    username: "Portfolio Leads",
    flags: IS_COMPONENTS_V2,
    allowed_mentions: { parse: [] },
    components: [
      {
        type: C.container,
        accent_color: fromHealthCheck ? 0x2dd4bf : 0x5865f2,
        components: [
          {
            type: C.textDisplay,
            content: `## 🎯 New lead\n**${md(lead.name)}** is interested in **${lead.service || "a project"}**.`,
          },
          { type: C.separator, divider: true, spacing: 1 },
          { type: C.textDisplay, content: details },
          { type: C.separator, divider: true, spacing: 1 },
          { type: C.textDisplay, content: `**Message**\n${quoted}` },
          { type: C.actionRow, components: buttons },
          { type: C.separator, divider: false, spacing: 1 },
          { type: C.textDisplay, content: `-# Received <t:${now}:f> (<t:${now}:R>) · reply within 24h to keep the lead warm` },
        ],
      },
    ],
  };
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots fill hidden fields. Pretend success so they do not retry.
  if (str(body.company, 100)) return NextResponse.json({ ok: true });

  const name = str(body.name, 100);
  const email = str(body.email, 200);
  const service = str(body.service, 60);
  const handle = str(body.handle, 60);
  const message = str(body.message, 3000);
  const sourceRaw = str(body.source, 30);
  const source = (SOURCES as readonly string[]).includes(sourceRaw) ? sourceRaw : "Contact form";

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 422 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 422 });
  if (message.length < 10)
    return NextResponse.json({ ok: false, error: "Please add a few more details (10+ characters)." }, { status: 422 });
  if (service && !(contactServices as readonly string[]).includes(service))
    return NextResponse.json({ ok: false, error: "Unknown service." }, { status: 422 });

  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (webhook) {
    try {
      // with_components is required for webhooks to accept the components field.
      const url = new URL(webhook);
      url.searchParams.set("with_components", "true");
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadMessage({ name, email, handle, service, message, source })),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}: ${await res.text()}`);
    } catch (err) {
      console.error("[contact] webhook failed:", err);
      return NextResponse.json(
        { ok: false, error: "Could not send your message right now. Please email me directly." },
        { status: 502 },
      );
    }
  } else {
    // Without a webhook the message would only reach the server log, so tell the sender instead of losing it.
    console.error("[contact] DISCORD_WEBHOOK_URL is not set; lead not delivered:", { name, email, service });
    return NextResponse.json(
      { ok: false, error: `The form is not connected yet. Please email me at ${profile.email}.` },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
