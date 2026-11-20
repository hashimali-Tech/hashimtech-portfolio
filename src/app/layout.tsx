import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { profile } from "@/data/content";
import { getSiteUrl } from "@/lib/site";

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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — Full-Stack Developer & Software Engineer`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Portfolio of Hashim Ali, Full-Stack Developer & BSIT student in Pakistan specializing in React, Next.js, Node.js, Express, MongoDB, and AI API integrations.",
  keywords: [
    "Hashim Ali",
    "HashimTech",
    "Full-Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Portfolio",
    "Node.js",
    "Express.js",
    "MongoDB",
    "AI Integration",
    "Web Developer Pakistan",
    "MERN Stack",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${profile.name} — Full-Stack Developer & Software Engineer`,
    description:
      "Explore real-world software engineering projects, modern full-stack web applications, and AI integrations built by Hashim Ali.",
    url: siteUrl,
    siteName: `${profile.name} (${profile.brand}) Portfolio`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.name} — Full-Stack Developer & Software Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Full-Stack Developer & Software Engineer`,
    description:
      "Full-stack web applications, clean architectures, and AI integrations by Hashim Ali.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "pjIyEJMxbpZdLPMRtP0XfhDs9yiHS9394qwW6Rk33Xo",
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
    url: siteUrl,
    jobTitle: "Full-Stack Developer & Software Engineer",
    description: profile.intro,
    knowsAbout: [
      "Full-Stack Web Development",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Python",
      "FastAPI",
      "AI API Integrations",
      "REST Architecture",
    ],
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
        <meta
          name="google-site-verification"
          content="pjIyEJMxbpZdLPMRtP0XfhDs9yiHS9394qwW6Rk33Xo"
        />
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
