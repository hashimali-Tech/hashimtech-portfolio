"use client";

import { useEffect, useRef, useState } from "react";
import { profile, navLinks } from "@/data/content";
import { useSmoothScroll } from "./SmoothScroll";
import { Send, Menu, X, Home } from "lucide-react";

function HALogo() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 38 38"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect width="38" height="38" rx="10" fill="url(#ha-grad)" />
      <text
        x="19"
        y="25"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="15"
        fill="#ffffff"
        letterSpacing="-0.5"
      >
        HA
      </text>
      <defs>
        <linearGradient id="ha-grad" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4C8DFF" />
          <stop offset="1" stopColor="#7DD3FC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const { scrollTo } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const navCenterRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      scrollTo(targetElement, -75);
      setActiveSection(targetId);
    }
    setMobileOpen(false);
  };

  // ScrollSpy
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "services", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sliding indicator for desktop
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const activeIndex = navLinks.findIndex(
      (link) => link.href === `#${activeSection}`
    );
    const activeLink = linksRef.current[activeIndex];
    const indicator = indicatorRef.current;
    const navCenter = navCenterRef.current;
    if (!activeLink || !indicator || !navCenter) return;

    import("@/lib/gsap").then(({ getGSAP }) => {
      const { gsap } = getGSAP();
      const linkRect = activeLink.getBoundingClientRect();
      const containerRect = navCenter.getBoundingClientRect();
      gsap.to(indicator, {
        x: linkRect.left - containerRect.left,
        width: linkRect.width,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
  }, [activeSection]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = mobileOpen ? "hidden" : "";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-surface focus:text-brand-2 focus:border focus:border-brand rounded-md shadow-lg"
      >
        Skip to content
      </a>

      {/* ── DESKTOP NAVBAR (≥ 1024px) ── */}
      <header
        className={`hidden lg:flex fixed top-0 inset-x-0 z-50 items-center justify-between px-6 xl:px-12 h-[70px] transition-all duration-300 glass-navbar ${
          scrolled
            ? "border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            : "border-b border-transparent"
        }`}
      >
        {/* Left: HA Logo + Name */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2 rounded-lg"
          aria-label="Hashim Ali — Home"
        >
          <HALogo />
          <span className="font-heading font-bold text-base text-text tracking-tight group-hover:text-white transition-colors">
            {profile.name}
          </span>
        </a>

        {/* Center: Nav Links */}
        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <div
            ref={navCenterRef}
            className="relative flex items-center gap-1 px-2 py-1.5 rounded-full bg-surface-2/40 border border-white/[0.08] hover:border-brand-2/50 hover:shadow-[0_0_20px_rgba(76,141,255,0.2)] transition-all duration-300"
          >
            {/* Sliding active indicator */}
            <div
              ref={indicatorRef}
              aria-hidden="true"
              className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-brand/20 to-brand-2/15 border border-brand/40 rounded-full opacity-0 pointer-events-none transition-opacity duration-200"
              style={{ left: 0, width: 60 }}
            />
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.replace("#", "");
              const isHome = link.href === "#hero";
              return (
                <a
                  key={link.href}
                  ref={(el) => {
                    linksRef.current[idx] = el;
                  }}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative z-10 flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2 ${
                    isActive
                      ? "text-brand-2 font-bold"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {isHome && (
                    <Home
                      className={`w-3.5 h-3.5 transition-colors ${
                        isActive ? "text-brand-2" : "text-muted"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* Right: Hire Me CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand/60 bg-brand/10 text-brand-2 text-xs font-bold hover:bg-brand hover:text-bg hover:border-brand active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2 shadow-[0_0_16px_rgba(76,141,255,0.25)] hover:shadow-[0_0_24px_rgba(76,141,255,0.5)]"
        >
          <span>Hire Me</span>
          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </a>
      </header>

      {/* ── MOBILE NAVBAR (< 1024px) ── */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-50 glass-navbar border-b border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between px-4 sm:px-6 h-[64px]">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2 rounded-lg"
            aria-label="Hashim Ali — Home"
          >
            <HALogo />
            <span className="font-heading font-bold text-sm text-text tracking-tight">
              {profile.name}
            </span>
          </a>

          {/* Right: Mobile Hire Me + Hamburger */}
          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-brand/50 bg-brand/10 text-brand-2 text-xs font-bold active:scale-95 transition-all shadow-[0_0_12px_rgba(76,141,255,0.2)]"
            >
              <span>Hire Me</span>
              <Send className="w-3 h-3" aria-hidden="true" />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              suppressHydrationWarning
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-2/80 border border-white/10 text-text hover:border-brand/40 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-2"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-brand-2" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="lg:hidden fixed inset-0 top-[64px] z-40 flex flex-col justify-between p-6 overflow-y-auto bg-[#070B18]/95 backdrop-blur-2xl border-t border-white/[0.08]"
        >
          <nav className="flex flex-col gap-2 pt-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              const isHome = link.href === "#hero";
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between px-5 py-3.5 text-base font-heading font-semibold rounded-2xl transition-all ${
                    isActive
                      ? "text-brand-2 bg-brand/15 border border-brand/35 shadow-[0_0_15px_rgba(76,141,255,0.2)]"
                      : "text-muted hover:text-white hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {isHome && <Home className="w-4 h-4 text-brand-2" aria-hidden="true" />}
                    <span>{link.label}</span>
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-brand-2 shadow-[0_0_8px_rgba(125,211,252,0.8)]" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="pt-6 pb-4 border-t border-white/[0.06] flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-brand to-brand-2 text-bg font-bold text-sm shadow-[0_0_20px_rgba(76,141,255,0.35)] active:scale-95 transition-all"
            >
              <span>Get In Touch</span>
              <Send className="w-4 h-4" aria-hidden="true" />
            </a>
            <p className="text-center text-xs text-muted/60 mt-1">
              Based in {profile.location}
            </p>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-[64px] lg:h-[70px]" aria-hidden="true" />
    </>
  );
}
