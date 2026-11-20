"use client";

import { useEffect, useRef, ReactNode } from "react";

export default function AnimationProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let mmInstance: { revert: () => void } | null = null;

    const startAnimation = () => {
      import("@/lib/gsap").then(({ getGSAP }) => {
        if (!isMounted) return;

        const { gsap, ScrollTrigger } = getGSAP();
        const mm = gsap.matchMedia();
        mmInstance = mm;

        // 1. Reduced motion: immediate visibility & no transforms
        mm.add("(prefers-reduced-motion: reduce)", () => {
          gsap.set("[data-reveal]", { opacity: 1, y: 0, clearProps: "transform,opacity" });
          gsap.set(
            "[data-hero-headline], [data-hero-intro], [data-hero-buttons], [data-hero-mockup], [data-hero-badge], [data-hero-stats]",
            { opacity: 1, y: 0, clearProps: "all" }
          );
        });

        // 2. Normal motion (plays after refresh & on scroll into view)
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          // Ambient glow parallax
          const glow = document.getElementById("ambient-glow");
          if (glow) {
            gsap.to(glow, {
              y: 80,
              ease: "none",
              scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
              },
            });
          }

          // A. Hero Section entrance animation on refresh / page load
          const heroBadge = document.querySelector("[data-hero-badge]");
          const heroHeadline = document.querySelector("[data-hero-headline]");
          const heroIntro = document.querySelector("[data-hero-intro]");
          const heroButtons = document.querySelector("[data-hero-buttons]");
          const heroStats = document.querySelector("[data-hero-stats]");
          const heroMockup = document.querySelector("[data-hero-mockup]");
          const heroFloatingTiles = document.querySelectorAll(
            ".hero-float-1, .hero-float-2, .hero-float-3"
          );

          if (heroHeadline) {
            const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

            if (heroBadge) {
              heroTl.fromTo(
                heroBadge,
                { opacity: 0, y: -16 },
                { opacity: 1, y: 0, duration: 0.6 }
              );
            }

            heroTl.fromTo(
              heroHeadline,
              { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.75 },
              "-=0.4"
            );

            if (heroIntro) {
              heroTl.fromTo(
                heroIntro,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.5"
              );
            }

            if (heroButtons) {
              heroTl.fromTo(
                heroButtons,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.45"
              );
            }

            if (heroStats) {
              heroTl.fromTo(
                heroStats,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.6 },
                "-=0.4"
              );
            }

            if (heroMockup) {
              heroTl.fromTo(
                heroMockup,
                { opacity: 0, scale: 0.94, y: 24 },
                { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power2.out" },
                "-=0.8"
              );
            }

            if (heroFloatingTiles.length > 0) {
              heroTl.fromTo(
                heroFloatingTiles,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.4)" },
                "-=0.5"
              );
            }
          }

          // B. ScrollTrigger reveal: Animate into view when scrolled
          ScrollTrigger.batch("[data-reveal]", {
            start: "top 88%",
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.07,
                duration: 0.7,
                ease: "power2.out",
                overwrite: "auto",
              });
            },
            onEnterBack: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: "power2.out",
                overwrite: "auto",
              });
            },
          });
        });

        // Refresh triggers once fonts are fully ready
        document.fonts.ready.then(() => {
          if (isMounted) ScrollTrigger.refresh();
        });

        // Handle resize / orientation
        const handleOrientationChange = () => {
          setTimeout(() => {
            if (isMounted) ScrollTrigger.refresh();
          }, 300);
        };
        window.addEventListener("orientationchange", handleOrientationChange);

        ScrollTrigger.config({ ignoreMobileResize: true });

        return () => {
          window.removeEventListener("orientationchange", handleOrientationChange);
        };
      });
    };

    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        startAnimation();
      });
    }

    return () => {
      isMounted = false;
      if (mmInstance) {
        mmInstance.revert();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-10">
      {children}
    </div>
  );
}
