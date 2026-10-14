import type { Metadata, Viewport } from "next";
import { display, sans, mono } from "@/lib/fonts";
import { profile } from "@/lib/site";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.siteName}`,
  },
  description: profile.description,
  keywords: [
    "Discord community manager",
    "Discord bot developer",
    "Discord server setup",
    "Discord moderation",
    "discord.py",
    "discord.js",
    "Discord security consulting",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title: `${profile.name} | ${profile.role}`,
    description: profile.description,
    siteName: profile.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

// Runs before paint so the saved theme is applied without a flash.
const themeScript = `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Extensions like ColorZilla add attributes to <body> before hydration; ignore those. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
