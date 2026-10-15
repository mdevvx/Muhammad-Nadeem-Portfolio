import type { Metadata, Viewport } from "next";
import { display, sans, mono } from "@/lib/fonts";
import { defaultTheme, paletteHex, paletteName, profile, seo, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s | ${profile.name}` },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    locale: "en_US",
    siteName: profile.name,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: paletteHex.bg,
  width: "device-width",
  initialScale: 1,
};

// Runs before paint so the saved theme is applied without a flash.
const themeScript = `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme={defaultTheme} data-palette={paletteName} className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Extensions like ColorZilla add attributes to <body> before hydration; ignore those. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
