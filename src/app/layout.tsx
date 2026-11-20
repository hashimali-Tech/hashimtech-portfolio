import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070B18",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.headline}`,
  description: profile.intro,
  metadataBase: new URL("https://hashimtech.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${profile.name} (${profile.brand}) — Software Engineer`,
    description: profile.intro,
    url: "https://hashimtech.dev",
    siteName: profile.brand,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.headline}`,
    description: profile.intro,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.brand,
    description: profile.intro,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gujranwala",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Punjab University Lahore",
    },
    sameAs: [profile.linkedin, profile.github].filter(Boolean),
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/profile/hashim-hero-400.webp"
          type="image/webp"
          media="(max-width: 639px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/profile/hashim-hero-800.webp"
          type="image/webp"
          media="(min-width: 640px)"
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className="bg-bg text-text antialiased selection:bg-brand/30 selection:text-text"
        suppressHydrationWarning
      >
        {/* Static background layer with subtle radial glows and fade grid */}
        <div className="bg-ambient-layer" aria-hidden="true">
          <div className="bg-ambient-glow" id="ambient-glow" />
          <div className="bg-grid-layer" />
        </div>
        {children}
      </body>
    </html>
  );
}
