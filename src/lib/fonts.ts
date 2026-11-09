/**
 * FONT SETUP (single place to change)
 *
 * Inter Tight is used for body text and headings. It is self-hosted
 * (latin subset, variable weight 100-900) so builds never depend on reaching
 * Google Fonts. To swap fonts, replace the exports below; they must expose the
 * CSS variables --font-sans, --font-display and --font-mono.
 */
import localFont from "next/font/local";

export const sans = localFont({
  src: "../fonts/InterTight-Latin.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});

export const display = localFont({
  src: "../fonts/InterTight-Latin.woff2",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
});

// Geist Mono, loaded via next/font/local rather than the `geist` package's GeistMono
// export, because that sets --font-geist-mono, which Tailwind never reads.
export const mono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-mono",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: false,
});
