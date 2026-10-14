/**
 * FONT SETUP (single place to change)
 *
 * The brief asked for the same font as pulsenotify.duoplus.org, but that site
 * could not be inspected while building this project. Geist (bundled locally,
 * no network needed at build time) is used as a stand-in.
 *
 * To switch to the real font, replace the two exports below. Example with a
 * Google font (needs internet at build time):
 *
 *   import { Inter, JetBrains_Mono } from "next/font/google";
 *   export const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
 *   export const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
 *
 * Both must expose the CSS variables --font-sans and --font-mono.
 */
import localFont from "next/font/local";

// Loaded via next/font/local rather than the `geist` package's GeistSans/GeistMono
// exports, because those set --font-geist-sans/--font-geist-mono, which Tailwind
// never reads.
export const sans = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

// Headings only: a characterful grotesque that pairs with Geist body text.
// Self-hosted (latin subset, weights 600-800) so builds never depend on reaching Google Fonts.
export const display = localFont({
  src: "../fonts/BricolageGrotesque-Latin.woff2",
  variable: "--font-display",
  weight: "600 800",
  display: "swap",
});

export const mono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: false,
});
