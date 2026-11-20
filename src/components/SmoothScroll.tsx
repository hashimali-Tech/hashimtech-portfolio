"use client";

import { useEffect, createContext, useContext, useRef, ReactNode } from "react";
import type Lenis from "lenis";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced-motion: no custom smooth scroll
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Only instantiate Lenis on desktop pointer devices
    // Native touch scrolling on iPhone/Android is smoother and uses zero JS overhead
    if (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    // Dynamic import to keep Lenis and GSAP out of the initial first-load bundle
    let isDestroyed = false;
    let updateTicker: ((time: number) => void) | null = null;
    let gsapInstance: typeof import("gsap").gsap | null = null;

    Promise.all([
      import("lenis"),
      import("@/lib/gsap"),
    ]).then(([LenisModule, { getGSAP }]) => {
      if (isDestroyed) return;

      const Lenis = LenisModule.default;
      const { gsap, ScrollTrigger } = getGSAP();
      gsapInstance = gsap;

      const lenis = new Lenis({
        lerp: 0.09,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.0,
        syncTouch: false, // Keep native touch momentum scrolling on mobile
      });

      lenisRef.current = lenis;

      // Connect Lenis to ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Single unified requestAnimationFrame loop via GSAP ticker
      updateTicker = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(updateTicker);
      gsap.ticker.lagSmoothing(0);

      // Font ready refresh
      if (document.fonts) {
        document.fonts.ready.then(() => {
          ScrollTrigger.refresh();
        });
      }

      // Orientation change refresh
      const handleOrientation = () => {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      };
      window.addEventListener("orientationchange", handleOrientation);
    });

    return () => {
      isDestroyed = true;
      if (updateTicker && gsapInstance) {
        gsapInstance.ticker.remove(updateTicker);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, offset = -80) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = typeof target === "string" ? document.querySelector(target) : target;
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
