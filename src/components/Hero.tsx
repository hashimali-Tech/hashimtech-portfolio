import Image from "next/image";
import { profile } from "@/data/content";
import { Rocket, Play, Code2 } from "lucide-react";

// 3D Glass Tech Tile for desktop/tablet
function GlassTechTile({
  icon,
  label,
  className,
  glowColor = "rgba(76,141,255,0.35)",
  borderColor = "rgba(125,211,252,0.4)",
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
  glowColor?: string;
  borderColor?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`hidden sm:flex absolute select-none pointer-events-none z-20 items-center gap-2 px-3 py-2 rounded-2xl bg-surface/90 border backdrop-blur-xl shadow-lg transition-transform duration-300 ${className ?? ""}`}
      style={{
        borderColor,
        boxShadow: `0 8px 24px ${glowColor}, inset 0 0 10px ${glowColor}`,
      }}
    >
      <div className="flex items-center justify-center shrink-0">{icon}</div>
      <span className="text-xs font-bold text-text tracking-wide whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction & Overview"
      className="relative min-h-[calc(100svh-70px)] flex items-center py-10 sm:py-14 lg:py-16 overflow-hidden"
    >
      {/* Background Architectural Ambient Radial Spotlight */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[70vw] lg:w-[45vw] h-[70vw] lg:h-[45vw] pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at 60% 50%, rgba(76,141,255,0.14) 0%, rgba(125,211,252,0.06) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ── LEFT COLUMN: Text & Actions (order-1 on all devices) ── */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-1">
            {/* Small Badge: PERSONAL PORTFOLIO */}
            <div
              data-hero-badge
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2/90 border border-brand/40 hover:border-brand-2/80 hover:shadow-[0_0_16px_rgba(125,211,252,0.4)] text-xs font-bold text-brand-2 w-fit mb-5 sm:mb-6 shadow-sm backdrop-blur-md tracking-wider uppercase transition-all duration-300 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-2 shadow-[0_0_8px_rgba(125,211,252,0.8)] animate-pulse" />
              <span>Personal Portfolio</span>
            </div>

            {/* Large Animated Greeting */}
            <div data-hero-headline className="flex flex-col">
              <h1 className="font-heading font-extrabold tracking-tight leading-[1.08]">
                <span className="block text-4xl sm:text-5xl lg:text-[3.75rem] text-text">
                  {profile.heroGreeting}
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-[3.75rem] text-transparent bg-clip-text bg-gradient-to-r from-brand via-blue-400 to-brand-2 mt-1">
                  {profile.heroName}
                </span>
              </h1>

              {/* Professional Title */}
              <p className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-text/90 tracking-tight">
                {profile.heroSubtitle}
              </p>
            </div>

            {/* Short Introduction */}
            <p
              data-hero-intro
              className="mt-4 text-base sm:text-lg text-muted max-w-xl leading-relaxed"
            >
              It&apos;s great to have you here. Let&apos;s build something{" "}
              <span className="text-brand-2 font-semibold">amazing</span>{" "}
              together!
            </p>

            {/* Action Buttons */}
            <div
              data-hero-buttons
              className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-brand to-brand-2 text-bg font-bold text-sm shadow-[0_0_24px_rgba(76,141,255,0.4)] hover:shadow-[0_0_36px_rgba(125,211,252,0.65)] hover:scale-[1.02] active:scale-95 transition-all min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2"
              >
                <Rocket className="w-4 h-4" aria-hidden="true" />
                <span>Explore My Work →</span>
              </a>

              <a
                href="#about"
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-full bg-surface/80 border border-white/15 text-text font-semibold text-sm hover:border-brand-2/70 hover:shadow-[0_0_24px_rgba(125,211,252,0.4)] hover:bg-surface-hover active:scale-95 transition-all duration-300 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2 backdrop-blur-md shadow-sm"
              >
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-2 group-hover:bg-brand/10 group-hover:shadow-[0_0_10px_rgba(125,211,252,0.5)] transition-all duration-300">
                  <Play className="w-2.5 h-2.5 ml-0.5 text-brand-2" aria-hidden="true" />
                </span>
                <span>Watch Intro</span>
              </a>
            </div>

            {/* Highlights Stats Bar */}
            <div
              data-hero-stats
              className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/[0.08] flex items-center gap-5 sm:gap-8 text-xs text-muted"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xl sm:text-2xl font-heading font-extrabold text-text tracking-tight">2+</span>
                <span className="font-medium text-muted/80">Projects Built</span>
              </div>
              <div className="w-px h-8 bg-white/10" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xl sm:text-2xl font-heading font-extrabold text-text tracking-tight">6+</span>
                <span className="font-medium text-muted/80">Tech Stacks</span>
              </div>
              <div className="w-px h-8 bg-white/10" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xl sm:text-2xl font-heading font-extrabold text-brand-2 flex items-center gap-1.5 tracking-tight">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Open
                </span>
                <span className="font-medium text-muted/80">to Work</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Interactive 3D-Inspired Workspace Visual (order-2) ── */}
          <div
            data-hero-mockup
            id="hero-mockup"
            className="lg:col-span-5 flex items-center justify-center order-2 w-full pt-2 lg:pt-0"
          >
            {/* Visual Workspace Stage */}
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[440px] aspect-[4/5] flex items-center justify-center">
              {/* 3D Cyan Glowing Orbit Ellipse */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="hero-orbit"
                  style={{
                    width: "90%",
                    height: "44%",
                    borderRadius: "50%",
                    border: "2px solid rgba(125,211,252,0.45)",
                    boxShadow:
                      "0 0 35px rgba(76,141,255,0.35), inset 0 0 25px rgba(125,211,252,0.2)",
                  }}
                />
              </div>

              {/* Ambient Radial Backlight Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, rgba(76,141,255,0.25) 0%, rgba(125,211,252,0.12) 45%, transparent 75%)",
                }}
              />

              {/* Centerpiece Portrait Card */}
              <div className="relative z-10 w-[82%] sm:w-[78%] rounded-[2.2rem] overflow-hidden border border-white/15 hover:border-brand-2/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_36px_rgba(76,141,255,0.35)] bg-surface/80 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_0_1px_rgba(76,141,255,0.2)] backdrop-blur-xl group transition-all duration-500">
                <div className="relative aspect-[571/760] w-full rounded-[1.8rem] overflow-hidden bg-surface-2">
                  {/* Mobile Image (< 640px) */}
                  <div className="sm:hidden w-full h-full">
                    <Image
                      src="/profile/hashim-hero-400.webp"
                      alt="Hashim Ali — Full-Stack Developer and AI Enthusiast"
                      width={400}
                      height={717}
                      priority
                      unoptimized
                      className="w-full h-full object-cover object-top select-none"
                    />
                  </div>
                  {/* Desktop Image (≥ 640px) */}
                  <div className="hidden sm:block w-full h-full">
                    <Image
                      src="/profile/hashim-hero-800.webp"
                      alt="Hashim Ali — Full-Stack Developer and AI Enthusiast"
                      width={571}
                      height={800}
                      priority
                      unoptimized
                      className="w-full h-full object-cover object-top select-none group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    />
                  </div>

                  {/* Bottom Gradient Fade for Desk Blending */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070B18] via-[#070B18]/60 to-transparent pointer-events-none"
                  />

                  {/* Desk Laptop Glowing Indicator at bottom */}
                  <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-surface/90 border border-brand/35 hover:border-brand-2/70 hover:shadow-[0_0_18px_rgba(76,141,255,0.4)] backdrop-blur-md shadow-lg flex items-center justify-between transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-brand/20 border border-brand/40 flex items-center justify-center text-brand-2">
                        <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-bold text-text">Developer Desk</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </div>
                </div>

                {/* Mobile Tech Row (< 640px) inside card */}
                <div className="sm:hidden mt-2 pt-2 border-t border-white/[0.08] flex items-center justify-around text-[11px] text-muted font-medium">
                  <span className="flex items-center gap-1 text-brand-2">⚛️ React</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#F7DF1E]">🟨 JS</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-400">🐍 Python</span>
                </div>
              </div>

              {/* ── 3D Floating Glass Tech Tiles (Tablet & Desktop, perfectly contained) ── */}

              {/* 1. Top-Left: Glowing Cyan Code Tag */}
              <GlassTechTile
                label="Clean Code"
                icon={<Code2 className="w-4 h-4 text-brand-2" />}
                className="top-6 left-0 hero-float-1"
                borderColor="rgba(125,211,252,0.5)"
                glowColor="rgba(125,211,252,0.35)"
              />

              {/* 2. Top-Right: React Atom */}
              <GlassTechTile
                label="React / Next"
                icon={<span className="text-brand-2 text-base">⚛️</span>}
                className="top-8 right-0 hero-float-2"
                borderColor="rgba(76,141,255,0.5)"
                glowColor="rgba(76,141,255,0.35)"
              />

              {/* 3. Mid-Right: JavaScript */}
              <GlassTechTile
                label="JavaScript"
                icon={
                  <span className="px-1 py-0.2 bg-[#F7DF1E] text-black font-extrabold text-[10px] rounded">
                    JS
                  </span>
                }
                className="top-1/2 translate-y-4 right-0 hero-float-3"
                borderColor="rgba(247,223,30,0.4)"
                glowColor="rgba(247,223,30,0.25)"
              />

              {/* 4. Bottom-Right: Python */}
              <GlassTechTile
                label="Python / AI"
                icon={<span className="text-base">🐍</span>}
                className="bottom-6 right-2 hero-float-1"
                borderColor="rgba(76,141,255,0.4)"
                glowColor="rgba(76,141,255,0.25)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
