import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, Noto_Sans_JP } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE } from "@/lib/site";
import "./globals.css";

// CJK fonts: next/font self-hosts them split by unicode-range, so only the
// glyph chunks a page actually uses are downloaded.
const sans = Noto_Sans_JP({
  variable: "--font-sans",
  weight: ["400", "500", "700", "900"],
  display: "swap",
  preload: false,
});

const display = Dela_Gothic_One({
  variable: "--font-display",
  weight: "400",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `写真・画像1枚からAI動画生成｜バズるテンプレート付き｜${SITE.name}`,
    template: `%s｜${SITE.name}`,
  },
  applicationName: SITE.name,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "ja_JP",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff6ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${sans.variable} ${display.variable}`}>
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="UNuex3oT/0+sXpBz+xMS7Q"
          async
        />
      </head>
      <body>
        <Providers>
          <SiteHeader />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
